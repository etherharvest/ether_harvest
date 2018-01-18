import React, { Component } from 'react'
import Web3 from 'web3'
import logo from './logo.svg'
import './App.css'
import contract from 'truffle-contract'
const ReapTokenJSON = require('./ReapToken.json')

class App extends Component {
  constructor () {
    super()
    this.loadContract = this.loadContract.bind(this)
    this.getAccountCallback = this.getAccountCallback.bind(this)
    this.refreshAccount = this.refreshAccount.bind(this)
    this.onChangeTransferAmmount = this.onChangeTransferAmmount.bind(this)
    this.onChangeTransferRecepient = this.onChangeTransferRecepient.bind(this)
    this.onTransfer = this.onTransfer.bind(this)
    this.state = {}
  }

  loadContract (web3Provider) {
    const ReapToken = contract(ReapTokenJSON)
    ReapToken.setProvider(web3Provider)
    return ReapToken
  }

  refreshAccount () {
    this.state.web3.eth.getAccounts(this.getAccountCallback)
  }

  getAccountCallback (error, accounts) {
    if (error) {
      console.log(error)
    }
    const account = accounts[0]
    this.setState({ account })
    this.state.contract.deployed().then(reapTokenInstance => {
      return reapTokenInstance.balanceOf(account)
    }).then(result => {
      const balance = result.c[0]
      this.setState({ balance })
    }).catch(err => {
      console.log(err.message)
    })
  }

  onChangeTransferAmmount (event) {
    this.setState({ transferAmmount: event.target.value })
  }

  onChangeTransferRecepient (event) {
    this.setState({ transferRecepient: event.target.value })
  }

  onTransfer () {
    this.state.contract.deployed().then(reapTokenInstance => {
      return reapTokenInstance.transfer(
        this.state.transferRecepient,
        this.state.transferAmmount,
        { from: this.state.account }
      )
    }).then(result => {
      this.refreshAccount()
    }).catch(err => {
      console.log(err.message)
    })
  }


  componentDidMount () {
    let web3Provider
    if (typeof window.web3 !== 'undefined') {
      web3Provider = window.web3.currentProvider
    } else {
      web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
    }
    const web3 = new Web3(web3Provider)
    this.setState({
      web3Provider,
      web3,
      contract: this.loadContract(web3Provider)
    })
    web3.eth.getAccounts(this.getAccountCallback)
  }

  render () {
    const account = this.state.account || 'Loading'
    const balance = this.state.balance !== undefined
      ? this.state.balance
      : 'Loading'
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to Ether Harvest</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.refreshAccount}> Refresh Account </button>
        <h2> Balance for account {account}</h2>
        {balance}
        <h3> Transfer </h3>
        Ammount
        <input
          type='number'
          value={this.state.tranfer}
          onChange={this.onChangeTransferAmmount}
        />
        To
        <input
          type='text'
          value={this.state.recepient}
          onChange={this.onChangeTransferRecepient}
        />
        <button onClick={this.onTransfer}> Send Token </button>
      </div>
    )
  }
}

export default App
