const ReapCoin = artifacts.require('ReapCoin')

contract('ReapCoin', accounts => {
  it('should put 10000 ReapCoin in the first account', () => {
    return ReapCoin
      .deployed()
      .then(instance => {
        return instance.getBalance.call(accounts[0])
      })
      .then(balance => {
        assert.equal(balance.valueOf(), 10000, '10000 wasn\'t in the first account')
      })
  })
})
