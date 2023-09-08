// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;


contract GeneradorDeLoterias {

    Lottery [] public loterias;

    function crearLoteria() public {
        Lottery loteria = new Lottery();
        loterias.push(loteria);
    }

}

contract Lottery {

    enum Estado { Activo, Finalizado }
    uint limitTime;
    address payable[] private participantes;
    Estado public estado; 
    address payable private ganador;


    constructor()  {
        estado = Estado.Activo;
        limitTime = block.timestamp + 5 minutes;
    }


    //Ahora la function participar coge todo el dinero que le introduce el participante y hace todas las participaciones que se pueda con ese dinero, posteriormente devuelve el cambio.
    function participar() public payable {
        if(limitTime > block.timestamp) {
            require(msg.value >= 0.01 ether, "Cantidad participacion incorrecta debe ser de al menos 0.01 ether"); //la participacion debe enviar exactamente 0.01 ethers
            require(estado == Estado.Activo, "loteria ya finalizada"); //debe estar activa
            
            uint participaciones = msg.value/0.01 ether;

            for(uint i = 0; i < participaciones; i++) {

                participantes.push(payable(msg.sender));

            }

            uint coste = participaciones * 0.01 ether;

            uint cambio = msg.value - coste;

            payable(msg.sender).transfer(cambio);
        } else {
            payable(msg.sender).transfer(msg.value);
            finalizarLoteria();
        }
    }
    
    receive() external payable {  //call with empty call data (transfer without data)
        participar();
    }
    fallback() external payable {   
        participar();
    }

    function getCantidadParticipaciones() public view returns(uint) {
        return participantes.length;
    }

    function finalizarLoteria() private {
        
        require(estado == Estado.Activo, "ya finalizado"); //debe estar activa
        
        estado = Estado.Finalizado;
        
        uint idGanador = random() % participantes.length;
        ganador = participantes[idGanador];
        
        enviarPremio();  //error potencial
    }
    
    //function random() public view returns (uint) {
    function random() public view returns (uint) {
       //uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty,participantes.length, gasleft(), block.coinbase)));
        return block.prevrandao;  //valor pseudo-aleatorio
    }

    function get_bote_acumulado() public view returns(uint){
        return address(this).balance; //devuelve balance del contrato
    }
    function enviarPremio() internal {
        require(ganador != address(0));
        
        ganador.transfer(address(this).balance);
    }
    
    function getGanador() public view returns (address payable) {
         require(estado == Estado.Finalizado, "loteria no finalizada"); //debe estar Finalizado
         return ganador;
    }
}