//SPDX-License-Identifier:UNLICENSED

pragma solidity ^0.8.19;

contract Messagebox {

    string[] public messages;
    mapping(address => bool) public registrado;
    address public admin;
    uint public  last_message_time;
    
    constructor ()  {
        messages.push("1");
        messages.push("2");
        messages.push("3");
        messages.push("4");
        admin = msg.sender;
    }
    
    function addMessage(string memory _new_message) payable public {   
        if(registrado[msg.sender]) {
            if(msg.value > 0.001 ether) {
                registrarMensaje(_new_message);
                if(msg.value > 0.001 ether) {
                    uint cambio = msg.value - 0.001 ether;
                    payable(msg.sender).transfer(cambio);
                }
            }
        } else {
            registrarMensaje(_new_message);
            registrado[msg.sender] = true;
        }
    }

    function registrarMensaje(string memory _new_message) internal {
        messages.push(_new_message);
        last_message_time = block.timestamp;
    }
    
    function getIndexMessage(uint x) public view returns (string memory) {
        return messages[x];
    }

    function getAllMessages() public view returns (string[] memory) {
        return messages;
    }

    function deleteIndexMessage(uint x) public {
        if(msg.sender == admin) {
            if(x < messages.length)
            {
                for(uint i = x; i < messages.length - 1; i++) {
                    messages[i] = messages[i+1];
                }
            messages.pop();
            }
        }
    }
    
}