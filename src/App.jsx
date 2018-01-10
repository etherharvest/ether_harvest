import React, { Component } from 'react'
import Web3 from 'web3'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    console.log('what is web3 right now: ' + window.web3)
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
      </div>
    )
  }
}

export default App
