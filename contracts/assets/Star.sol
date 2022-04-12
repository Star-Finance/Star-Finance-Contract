// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Star is ERC20 {
    
    constructor (uint256 _premint) ERC20("Star", "Star"){
        _mint(msg.sender, _premint);
    }
}
  
