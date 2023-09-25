// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";

contract BSMNFT721 is ERC721, Ownable {
    uint256 public totalSupply;

    uint256 public constant mintPrice = 10000000000000000; //0.01 ETH

    uint256 public constant maxNfts = 3;

    mapping(uint256 => uint256) private _prices;

    constructor() ERC721("BSMNFT", "BSMNFT") {}

    function _baseURI() override internal view virtual returns (string memory) {
        return "https://ipfs.io/ipfs/QmQQYNXEaTPB3jUJhdnkoyP94cAkojyCJYSMLBwZq95sxZ/";
    }

    function mint() public payable {
        require(totalSupply <= maxNfts, "Purchase would exceed max supply of BSMNFTs");
        require(mintPrice <= msg.value, "Ether value sent is not correct");

        unchecked {
            ++totalSupply;
        }

        _prices[totalSupply] = msg.value;

        _mint(msg.sender, totalSupply);
    }

    function priceOf(uint256 tokenId) public view virtual returns (uint256) {
        return _prices[tokenId];
    }

    function buy(uint256 tokenId) public payable {
        require(_prices[tokenId] > 0, "Token does not exists");
        require(msg.value > _prices[tokenId], "Price must be higher tan current price");

        payable(ownerOf(tokenId)).transfer(msg.value);

        safeTransferFrom(this.ownerOf(tokenId), msg.sender, tokenId);
    }
}
