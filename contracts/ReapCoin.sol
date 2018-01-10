pragma solidity ^0.4.17;

contract ReapCoin {
  mapping (address => uint) balances;

  function ReapCoin() public {
    balances[tx.origin] = 10000;
  }

  function getBalance(address addr) public view returns(uint) {
    return balances[addr];
  }
}
