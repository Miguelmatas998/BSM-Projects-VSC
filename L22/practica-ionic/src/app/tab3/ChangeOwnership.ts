export let ABI = {
    default: [
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "bytes32"
            }
          ],
          "name": "currentPartOwner",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "bytes32"
            }
          ],
          "name": "currentProductOwner",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "name": "prod_contract_addr",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "p",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "TransferPartOwnership",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "p",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "TransferProductOwnership",
          "type": "event"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "op_type",
              "type": "uint256"
            },
            {
              "name": "p_hash",
              "type": "bytes32"
            }
          ],
          "name": "addOwnership",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "op_type",
              "type": "uint256"
            },
            {
              "name": "p_hash",
              "type": "bytes32"
            },
            {
              "name": "to",
              "type": "address"
            }
          ],
          "name": "changeOwnership",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        }
    ]
}