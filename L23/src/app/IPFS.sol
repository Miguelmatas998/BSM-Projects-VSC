// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract IPFS {
    string hash;
    address public owner;

    constructor() {
        // Set the transaction sender as the owner of the contract.
        owner = msg.sender;
    }

    // Modifier to check that the caller is the owner of
    // the contract.
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        // Underscore is a special character only used inside
        // a function modifier and it tells Solidity to
        // execute the rest of the code.
        _;
    }

    function setHash(string memory x) public onlyOwner {
        hash = x;
    }

    function getHash() public view returns (string memory x) {
        return hash;
    }
}
