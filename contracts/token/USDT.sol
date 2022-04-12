// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.4;

import "./ERC20Faucet.sol";

contract USDT is ERC20Faucet {

    constructor (uint256 _premint, uint256 _amount) ERC20("USDT", "USDT") ERC20Faucet (_amount) {
        _mint(owner(), _premint);
    }

}
  
