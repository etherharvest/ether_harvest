const MyCoin = artifacts.require('MyCoin')

contract('MyCoin', accounts => {

  it('should mine 100 MyCoin', () => {
    let my
    let account = accounts[1]
    return MyCoin
      .deployed()
      .then(instance => {
        my = instance
        return instance.mine(account)
      })
      .then(() => {
        return my.getBalance.call(account)
      })
      .then(balance => {
        assert.equal(balance.valueOf(), 100, '100 wasn\'t mine')
      })
  })

  it('should get the id', () => {
    return MyCoin
      .deployed()
      .then(instance => {
        return instance.id()
      })
      .then(id => {
        assert.equal(id.valueOf(), 2, 'ids differ')
      })
  })
})
