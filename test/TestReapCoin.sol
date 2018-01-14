pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ReapCoin.sol";

contract TestReapCoin {
  function testSetMinter() public {
    ReapCoin reap = ReapCoin(DeployedAddresses.ReapCoin());
    Assert.equal(msg.sender, reap.minter(), 'minter mismatch');
  }

  function testMine() public {
    ReapCoin reap = ReapCoin(DeployedAddresses.ReapCoin());
    reap.mine(msg.sender);
    Assert.equal(
      reap.getBalance(msg.sender),
      100,
      "Owner should have mine 100 ReapCoin"
    );
  }
}
