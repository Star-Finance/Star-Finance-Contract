// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.4;

import "./ERC20Faucet.sol";

contract WETH is ERC20Faucet {

    constructor (uint256 _premint, uint256 _amount) ERC20("WETH", "WETH") ERC20Faucet (_amount) {
        _mint(owner(), _premint);
    }

}
  
