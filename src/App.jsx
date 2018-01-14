import React, { Component } from 'react'
import Web3 from 'web3'
import logo from './logo.svg'
import './App.css'
import contract from 'truffle-contract'
const ReapCoinJSON = require('./ReapCoin.json')

class App extends Component {
  constructor () {
    super()
    this.mine = this.mine.bind(this)
    this.state = {}
  }

  mine () {
    const ReapCoin = contract(ReapCoinJSON)
    ReapCoin.setProvider(window.web3.currentProvider)
    const account = this.state.web3.eth.accounts[0]
    ReapCoin.deployed().then(instance => instance.mine(account, {from: account}))
  }

  componentDidMount () {
    let web3Provider
    if (typeof window.web3 !== 'undefined') {
      web3Provider = window.web3.currentProvider
    } else {
      web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
    }
    let web3 = new Web3(web3Provider)
    this.setState({ web3 })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.mine}>
          Mine Reap
        </button>
      </div>
    )
  }
}

export default App
