pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MyCoin.sol";

contract TestMyCoin {
  function testSetMinter() public {
    MyCoin my = MyCoin(DeployedAddresses.MyCoin());
    Assert.equal(msg.sender, my.minter(), 'minter mismatch');
  }

  function testMine() public {
    MyCoin my = MyCoin(DeployedAddresses.MyCoin());
    my.mine(msg.sender);
    Assert.equal(
      my.getBalance(msg.sender),
      100,
      "Owner should have mine 100 ReapCoin"
    );
  }
}
