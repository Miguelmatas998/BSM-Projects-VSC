// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.6.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.6.0/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract BSMNFT721 is ERC721, Ownable {
    uint256 public totalSupply;

    uint256 public constant mintPrice = 10000000000000000; //0.01 ETH

    uint256 public constant maxNfts = 3;

    mapping(uint256 => int) private _prices;

    AggregatorV3Interface internal priceFeed;

    constructor() ERC721("BSMNFT", "BSMNFT") {
        priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e); /* Goerli */
    }

    function _baseURI() override internal view virtual returns (string memory) {
        return "https://ipfs.io/ipfs/QmQQYNXEaTPB3jUJhdnkoyP94cAkojyCJYSMLBwZq95sxZ/";
    }

    function mint() public payable {
        require(totalSupply <= maxNfts, "Purchase would exceed max supply of BSMNFTs");
        require(mintPrice <= msg.value, "Ether value sent is not correct");

        unchecked {
            ++totalSupply;
        }

        _prices[totalSupply] = int(msg.value);

        _mint(msg.sender, totalSupply);
    }

    function priceOf(uint256 tokenId) public view virtual returns (int) {
        return _prices[tokenId];
    }

    function usdPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();

        return price;
    }

    function usdPriceOf(uint256 tokenId) public view virtual returns (int) {
        return usdPrice() * priceOf(tokenId);
    }

    function buy(uint256 tokenId) public payable {
        require(_prices[tokenId] > 0, "Token does not exists");
        require(int(msg.value) > _prices[tokenId], "Price must be higher tan current price");

        payable(ownerOf(tokenId)).transfer(msg.value);

        safeTransferFrom(this.ownerOf(tokenId), msg.sender, tokenId);
    }
}