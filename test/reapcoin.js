const ReapCoin = artifacts.require('ReapCoin')

contract('ReapCoin', accounts => {

  it('should mine 100 ReapCoin', () => {
    let reap
    let account = accounts[1]
    return ReapCoin
      .deployed()
      .then(instance => {
        reap = instance
        return instance.mine(account)
      })
      .then(() => {
        return reap.getBalance.call(account)
      })
      .then(balance => {
        assert.equal(balance.valueOf(), 100, '100 wasn\'t mine')
      })
  })

  it('should get the id', () => {
    return ReapCoin
      .deployed()
      .then(instance => {
        return instance.id()
      })
      .then(id => {
        assert.equal(id.valueOf(), 2, 'ids differ')
      })
  })
})
