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
          "name": "products",
          "outputs": [
            {
              "name": "manufacturer",
              "type": "address"
            },
            {
              "name": "serial_number",
              "type": "string"
            },
            {
              "name": "product_type",
              "type": "string"
            },
            {
              "name": "creation_date",
              "type": "string"
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
          "name": "parts",
          "outputs": [
            {
              "name": "manufacturer",
              "type": "address"
            },
            {
              "name": "serial_number",
              "type": "string"
            },
            {
              "name": "part_type",
              "type": "string"
            },
            {
              "name": "creation_date",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "part_hash",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "PartCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "product_hash",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "name": "account",
              "type": "address"
            }
          ],
          "name": "ProductCreated",
          "type": "event"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "serial_number",
              "type": "string"
            },
            {
              "name": "part_type",
              "type": "string"
            },
            {
              "name": "creation_date",
              "type": "string"
            }
          ],
          "name": "buildPart",
          "outputs": [
            {
              "name": "",
              "type": "bytes32"
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
              "name": "serial_number",
              "type": "string"
            },
            {
              "name": "product_type",
              "type": "string"
            },
            {
              "name": "creation_date",
              "type": "string"
            },
            {
              "name": "part_array",
              "type": "bytes32[6]"
            }
          ],
          "name": "buildProduct",
          "outputs": [
            {
              "name": "",
              "type": "bytes32"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "product_hash",
              "type": "bytes32"
            }
          ],
          "name": "getParts",
          "outputs": [
            {
              "name": "",
              "type": "bytes32[6]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
    ]
}