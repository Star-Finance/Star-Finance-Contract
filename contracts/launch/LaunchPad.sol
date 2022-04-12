// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LaunchPad is Ownable {

    IERC20 public token;

    constructor (address _token) {
        token = IERC20(_token);
    }

    receive() external payable {
        buyTokens();
    }

    event BoughtTokens(address indexed to, uint256 value);

    uint256 public constant rate = 100000;
    uint256 public constant cap = 500;

    uint256 public constant start = 1649753073;
    uint256 public constant sellDays = 365;

    uint256 public raisedAmount = 0;
    mapping(address => uint256) public balance;
    uint256 public constant amountPerAddress = 10;

    modifier whenActive() {
        assert(isActive());
        _;
    }
    
    function isActive() public view returns (bool) {
        return (
        block.timestamp >= start &&
        block.timestamp <= start + sellDays * 1 days &&
        goalReached() == false
        );
    }

    function goalReached() public view returns (bool) {
        return (raisedAmount >= cap * 1 ether);
    }

    function buyTokens() public payable whenActive {
        require(balance[msg.sender] + msg.value <= amountPerAddress * 1 ether, "Exceed amountPerAddress");
        uint256 weiAmount = msg.value;
        uint256 tokens = weiAmount * rate;

        emit BoughtTokens(msg.sender, tokens);
        raisedAmount = raisedAmount + msg.value;
        token.transfer(msg.sender, tokens);

        payable(owner()).transfer(msg.value);
        balance[msg.sender] = balance[msg.sender] + msg.value;
    }

    function end() public onlyOwner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }
}
