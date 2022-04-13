// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IOracle.sol";

contract Oracle is Ownable, IOracle {

    mapping(address => AggregatorV3Interface) internal priceFeedMap;

    address public star;
    address public quote;
    address public router;

    constructor (address _star, address _quote, address _router) {
        star = _star;
        quote = _quote;
        router = _router;
    }

    function setPriceFeed(address token, address priceFeed) external onlyOwner {
        priceFeedMap[token] = AggregatorV3Interface(priceFeed);
    }

    function tokenPrice(address token) public view override returns (uint256) {
        (,int256 price,,,) = priceFeedMap[token].latestRoundData();
        return uint256(price);
    }

    function starPrice() public view override returns (uint256){
        address[] memory path = new address[](2);
        path[0] = star;
        path[1] = quote;
        uint256[] memory uOneStar = IUniswapV2Router02(router).getAmountsOut(1e18, path);
        return uOneStar[1] * tokenPrice(quote) / 1e18;
    }
}
