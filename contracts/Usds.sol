// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UsdsToken is ERC20 {
  constructor () ERC20("UsdssToken", "USDS"){
    _mint(msg.sender, 10000000000 * (10 ** uint256(decimals())));
  }
}
  