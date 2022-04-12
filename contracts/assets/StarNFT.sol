// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StarNFT is ERC721Enumerable, Ownable {

    using Strings for uint256;

    string public baseURI;
    string public baseExtension = ".json";
    uint256 public cost;

    constructor(string memory _newBaseURI, uint256 _cost) ERC721('Star-NFT', 'SN') {

        baseURI = _newBaseURI;
        cost = _cost;
    }

    function mint(address to) public payable {

        uint256 supply = totalSupply();

        if (owner() == msg.sender) {
            _safeMint(to, supply + 1);
            return;
        } else {
            require(msg.value >= cost, 'Sending ether is not enough to mint!');
            _safeMint(to, supply + 1);
            return;
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), baseExtension)) : "";
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function setCost(uint256 _cost) external onlyOwner {
        cost = _cost;
    }

    function setBaseExtension(string memory _newBaseExtension) external onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function withdraw(uint256 amount, address to) external onlyOwner {
        (bool sent,) = to.call{value : amount}("");
        require(sent, "Withdraw fail");
    }

}
