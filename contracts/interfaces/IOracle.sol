// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IOracle {

    function tokenPrice(address token) external view returns (uint256);

    function starPrice() external view returns (uint256);
}
