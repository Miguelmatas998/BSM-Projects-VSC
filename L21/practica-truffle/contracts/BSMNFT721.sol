// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract BSMNFT721 is ERC721, Ownable {
    uint256 public totalSupply;

    uint256 public constant maxNfts = 5;

    uint256 public constant mintPrice = 10000000000000000; // 0.01 ETH

    mapping(uint256 => int) private _prices;

    AggregatorV3Interface internal priceFeed;

    constructor() ERC721("BSMNFT", "BSMNFT") {
        priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    }

    function _baseURI() override internal view virtual returns (string memory) {
        return "https://ipfs.io/ipfs/QmatNMp7NTbPFJ2EQXNnkTDfxUUytCUaPGMtPhxSmm5rNR/";
    }

    function mint() public payable {
        require(totalSupply <= maxNfts, "Purchase would exceed max supply of BSMNFTs");
        // require(mintPrice <= msg.value, "Ether value sent is not correct");

        unchecked {
            ++totalSupply;
        }

        _prices[totalSupply] = int(msg.value);

        _mint(msg.sender, totalSupply);
    }

    function priceOf(uint256 tokenId) public view virtual returns (int) {
        return _prices[tokenId];
    }

    function buy(uint256 tokenId) public payable {
        require(_prices[tokenId] > 0, "Token no existe");
        require(int(msg.value) > _prices[tokenId], "Precio debe ser superior al precio actual");

        payable(ownerOf(tokenId)).transfer(msg.value);

        safeTransferFrom(ownerOf(tokenId), msg.sender, tokenId);

        _prices[tokenId] = int(msg.value);
    }

    function usdPrice() public view returns (int) {
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();

        return price;
    }

    function usdPriceOf(uint256 tokenId) public view virtual returns (int) {
        return priceOf(tokenId) * usdPrice();
    }

}