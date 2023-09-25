// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";

contract BSMNFT721 is ERC721, Ownable {
    uint256 public totalSupply;

    uint256 public constant mintPrice = 10000000000000000; //0.01 ETH

    uint256 public constant maxNfts = 5;

    constructor() ERC721("BSMNFT", "BSMNFT") {}

    function _baseURI() override internal view virtual returns (string memory) {
        return "https://ipfs.io/ipfs/QmatNMp7NTbPFJ2EQXNnkTDfxUUytCUaPGMtPhxSmm5rNR/";
    }

    function mint() public payable {
        require(totalSupply <= maxNfts, "Purchase would exceed max supply of BSMNFTs");
        require(mintPrice <= msg.value, "Ether value sent is not correct");

        unchecked {
            ++totalSupply;
        }

        _mint(msg.sender, totalSupply);
    }
}
