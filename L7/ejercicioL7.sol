//SPDX-License-Identifier:UNLICENSED

pragma solidity ^0.8.19;

contract Owned {

    address payable public owner;
   
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    constructor ()  {
        owner = payable(msg.sender);
    }

}

contract Messagebox is Owned {

    string[] public messages;
    mapping(address => bool) public registrado;
    uint public  last_message_time;
    string textoOfensivo;

    event mensajeCreado(string mensaje, address mensajero);
    event mensajeEliminado(string mensaje, address mensajero);
    
    constructor ()  {
        messages.push("1");
        messages.push("2");
        messages.push("3");
        messages.push("4");
        textoOfensivo = "tonto quien lo lea";
    }

    function deleteSmartContract() onlyOwner public {
        selfdestruct(owner);
    }
    
    function addMessage(string memory _new_message) payable public {   

        require(noOfensivo(_new_message), "Ese mensaje es ofensivo, no puede ser registrado.");

        if(registrado[msg.sender]) {

            require(msg.value > 0.001 ether, "No has introducido suficiente ether.");

            registrarMensaje(_new_message);

            if(msg.value > 0.001 ether) {
                uint cambio = msg.value - 0.001 ether;
                payable(msg.sender).transfer(cambio);
            }

        } else {
            registrarMensaje(_new_message);
            registrado[msg.sender] = true;
        }

    }

    function registrarMensaje(string memory _new_message) internal {
        messages.push(_new_message);
        last_message_time = block.timestamp;
        emit mensajeCreado(_new_message, msg.sender);
    }
    
    function getIndexMessage(uint x) public view returns (string memory) {
        return messages[x];
    }

    function getAllMessages() public view returns (string[] memory) {
        return messages;
    }

    function deleteIndexMessage(uint x) onlyOwner public {

        require(x < messages.length, "Hola");

        string memory mensajeBorrado = messages[x];

        for(uint i = x; i < messages.length - 1; i++) {
            messages[i] = messages[i+1];
        }
        messages.pop();
        emit mensajeEliminado(mensajeBorrado, owner);
        delete mensajeBorrado;
    }

    function noOfensivo(string memory mensaje) public view returns (bool) {

        if(keccak256(abi.encodePacked(textoOfensivo)) == keccak256(abi.encodePacked(mensaje)))
            return false;
        else 
            return true;

    }

}