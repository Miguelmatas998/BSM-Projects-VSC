// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BSMWINE is ERC1155, ERC1155URIStorage, Ownable {
    using Strings for uint256;

    string public name = "BSM-WINE";

    string public symbol = "BSM";

    uint256 public mintPrice = 35000000000000000; // 0.035 ETH

    bool public mintIsActive = false;

    mapping(uint256 => address) public wineries;

    mapping(uint256 => uint256) public _totalSupply;

    event Minted(address indexed minter, uint256 indexed tokenId);

    constructor (string memory _baseURI) ERC1155(_baseURI) {
        _setBaseURI(_baseURI);
    }

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return wineries[tokenId] != address(0);
    }

    function _requireMinted(uint256 tokenId) internal view virtual {
        require(_exists(tokenId), "Invalid token ID");
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _setBaseURI(baseURI);
    }

    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    function flipMintState() public onlyOwner {
        mintIsActive = ! mintIsActive;
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;

        payable(msg.sender).transfer(balance);
    }

    function mint(uint256 tokenId) public payable {
        require(mintIsActive, "Mint must be active to mint");
        require(mintPrice <= msg.value, "Value sent is not correct");
        require(!_exists(tokenId), "Wine already minted");

        wineries[tokenId] = msg.sender;

        _mint(msg.sender, tokenId, 1, "");
        _setURI(tokenId, string(abi.encodePacked(tokenId.toString(), ".json")));

        _totalSupply[tokenId] = 1;

        emit Minted(msg.sender, tokenId);
    }

    function uri(uint256 tokenId) public view virtual override(ERC1155, ERC1155URIStorage) returns (string memory) {
        _requireMinted(tokenId);

        return super.uri(tokenId);
    }

    function totalSupply(uint256 tokenId) public view returns (uint256) {
        return _totalSupply[tokenId];
    }
}
