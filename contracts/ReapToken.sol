pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract ReapToken is StandardToken {
  string public name = 'ReapCoin';
  string public symbol = 'RC';
  uint8 public decimals = 2;
  uint public INITIAL_SUPPLY = 12000;

  function ReapToken() public {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }
}
