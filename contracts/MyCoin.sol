pragma solidity ^0.4.17;

contract MyCoin {
  address public minter;
  uint public id = 2;
  mapping (address => uint) balances;

  function MyCoin() public {
    minter = msg.sender;
  }

  function getBalance(address addr) public view returns(uint) {
    return balances[addr];
  }

  /**
    * If we remove this then instance.id() stops working D:
    */
  function getId() public constant returns(uint) {
    return id;
  }

  function mine(address addr) public {
    balances[addr] += 100;
  }
}
