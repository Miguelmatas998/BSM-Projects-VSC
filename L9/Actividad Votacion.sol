// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract votacionFactory {
    address[] public Votaciones;

    function newVotacionCreada() public    {
      address newVotacion = address(new Votacion());            
      Votaciones.push(newVotacion);   
   }
   function getDeployedChildContracts() public view returns (address[] memory) {
      return Votaciones;
   }

}


contract Administrado { 

    struct admin {
        address myAdress;
        bool registrado;
    }

     mapping(address => admin) public administradores;
    
     modifier onlyAdmin() {
        require(msg.sender == administradores[msg.sender].myAdress, "solo administrador");
        _;
    }
    
    constructor()  {
       administradores[msg.sender].myAdress = msg.sender;
       administradores[msg.sender].registrado = true;
    }

    function hacerAdministrador(address newAdminAddress) public onlyAdmin {
        require(administradores[newAdminAddress].registrado == false, "Admin ya registrado");
        administradores[newAdminAddress].myAdress = newAdminAddress;
        administradores[newAdminAddress].registrado = true;
    }
 
}							  
										

contract Votacion is Administrado {
    
    struct Propuesta {
        string nombre;
        string detallePropuesta;
        uint idPropuesta;
        uint votos;
    }
    
    struct Votante {
        bool votado;
        uint8 pesoVoto;
        address delegarVotoTo;
        uint8 propuestaVotada;
    }
    
    enum EstadoVotacion {Preparacion, Abierta, Finalizada}
    

    EstadoVotacion public estado;
    uint public totalVotantes;
    uint public votosEfectuados;
    uint public votosEnBlancoEfectuados;
    uint public propuestaGanadora;
    Propuesta[] internal propuestas;
    mapping(address => Votante) public votantes;
    uint limitTime;
    
   
   
    modifier onlyEnPreparacion() {
       require(estado == EstadoVotacion.Preparacion,"votacion ya iniciada");
        _;
    }
    modifier onlyEnAbierta() {
         require(estado == EstadoVotacion.Abierta,"votacion finalizada");
        _;
    }
    
    constructor()  {
        estado = EstadoVotacion.Preparacion;
        limitTime = block.timestamp + 1440 minutes;
    }
    
    function addPropuesta(string memory nombreProp, string memory descPropuesta) public onlyAdmin onlyEnPreparacion {
     
        propuestas.push(Propuesta({nombre:nombreProp , detallePropuesta:descPropuesta,idPropuesta:propuestas.length+1 ,votos: 0 }));
    }
    
    function darDerechoDeVoto(address voterAddress) public onlyAdmin onlyEnPreparacion {
		require(votantes[voterAddress].pesoVoto == 0, "Votante ya registrado");
        votantes[voterAddress] = Votante({  votado: false, pesoVoto: 1,  delegarVotoTo : address(0), propuestaVotada : 0 });
        totalVotantes++;
     
    }
    
    function iniciarVotacion() public  onlyAdmin onlyEnPreparacion {
          estado = EstadoVotacion.Abierta;								  		   
    }
    
    //Funciones de los votantes
    function votar(uint8 propuestaId) public onlyEnAbierta {
        Votante storage votanteEmisor = votantes[msg.sender];
        require(votanteEmisor.votado == false, "ya ha votado");
        require(votanteEmisor.delegarVotoTo == address(0), "has  delegado");
        require(votanteEmisor.pesoVoto > 0, "no tienes derecho a voto");
        require(propuestaId > 0 && propuestaId <= propuestas.length, "propuesta erronea");
        
        votanteEmisor.votado = true;
        votanteEmisor.propuestaVotada = propuestaId;
								  
        propuestas[propuestaId-1].votos += votanteEmisor.pesoVoto ;
        
        votosEfectuados += votanteEmisor.pesoVoto;
    }

    function votarEnBlanco() public onlyEnAbierta {
        Votante storage votanteEmisor = votantes[msg.sender];
        require(votanteEmisor.votado == false, "ya ha votado");
        require(votanteEmisor.delegarVotoTo == address(0), "has  delegado");
        require(votanteEmisor.pesoVoto > 0, "no tienes derecho a voto");
        
        votanteEmisor.votado = true;
        
        votosEnBlancoEfectuados += votanteEmisor.pesoVoto;
    }

    function delegarVoto(address to) public  {
        require( estado != EstadoVotacion.Finalizada, "ya finalizada");
        require(to != msg.sender , "no puede delegar en el mismo");
        require(votantes[to].pesoVoto > 0, "usuario no censado");
        
        Votante storage votanteEmisor = votantes[msg.sender];
        require(!votanteEmisor.votado, "ya ha votado");
        require(votanteEmisor.delegarVotoTo == address(0), "ya ha delegado voto");
        
        while(votantes[to].delegarVotoTo != address(0))  {
           to =  votantes[to].delegarVotoTo;
           require(to != msg.sender,"bucle de delegacion");
        }
        
        votanteEmisor.delegarVotoTo = to;
        votantes[to].pesoVoto += votanteEmisor.pesoVoto;
        
        if(votantes[to].votado) {
            propuestas[votantes[to].propuestaVotada-1].votos += votanteEmisor.pesoVoto;
        }
															
    }

    function finalizarVotacion() public  onlyAdmin onlyEnAbierta {

        require( limitTime <= block.timestamp, "No ha transcurrido el tiempo necesario para finalizar la votacion");																			   
        estado = EstadoVotacion.Finalizada;

       uint idPropuestaMasVotada = 0;
       uint votosPropuestaMasVotada = 0;
       
       for(uint i = 0; i < propuestas.length; i++) {
           if(propuestas[i].votos > votosPropuestaMasVotada) {
               idPropuestaMasVotada = i+1;
               votosPropuestaMasVotada = propuestas[i].votos ;
           }
       }
       
       propuestaGanadora = idPropuestaMasVotada;
    }
    
    
    function getPropuestabyId(uint8 propuestaId) public view returns(string memory nombreProp, string memory detallePropuesta) {
        nombreProp = propuestas[propuestaId-1].nombre;
        detallePropuesta  = propuestas[propuestaId-1].detallePropuesta;
    }
    
    function getPropuestaGanadora() public view returns(string memory nombreProp, string memory detallePropuesta) {
        require(estado == EstadoVotacion.Finalizada,"votacion no finalizada");
        nombreProp = propuestas[propuestaGanadora-1].nombre;
        detallePropuesta  = propuestas[propuestaGanadora-1].detallePropuesta;
    }
    
    
    																					 
	 
}