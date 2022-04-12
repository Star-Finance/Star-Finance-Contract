// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract ERC20Faucet is ERC20, Ownable {

    uint256 public interval = 60;
    uint256 public total = 1000000e18;
    uint256 public amount;
    uint256 public minted;

    mapping(address => uint256) lastFaucetTime;

    constructor (uint256 _amount){
        amount = _amount;
    }

    function faucet() external {
        require(total >= minted + amount, "Faucet is running out now.");
        require(block.timestamp - lastFaucetTime[msg.sender] > interval, "Interval is not expired.");

        minted += amount;
        lastFaucetTime[msg.sender] = block.timestamp;
        _mint(msg.sender, amount);
    }

    function setFaucetAmount(uint256 _faucetAmount) external onlyOwner {
        amount = _faucetAmount;
    }

    function setInterval(uint256 _inverval) external onlyOwner {
        interval = _inverval;
    }

    function setFaucetTotal(uint256 _faucetTotal) external {
        total = _faucetTotal;
    }
}
