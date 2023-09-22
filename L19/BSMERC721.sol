// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";

contract BSMNFT721 is ERC721, Ownable {
    uint256 public totalSupply;

    constructor() ERC721("BSMNFT", "BSMNFT") {}

    function _baseURI() override internal view virtual returns (string memory) {
        return "https://ipfs.io/ipfs/QmcwisEKqvxpcVWmweAYzbrEY5jBRq1zkPTt4Awd7QkSyy";
    }

    function mint() public {
        unchecked {
            ++totalSupply;
        }
        _mint(msg.sender, totalSupply);
    }
}
