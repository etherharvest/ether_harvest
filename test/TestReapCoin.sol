pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ReapCoin.sol";

contract TestReapCoin {
  function testInitialBalanceUsingDeployedContract() public {
    ReapCoin reap = ReapCoin(DeployedAddresses.ReapCoin());
    uint expected = 10000;
    Assert.equal(
      reap.getBalance(tx.origin),
      expected,
      "Owner should have 10000 ReapCoin on deploy"
    );
  }
}
