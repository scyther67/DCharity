import Navbar from "./Navbar.js";
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharityHandler from '../abis/CharityHandler.json';
import Charity from '../abis/Charity.json';
import Web3 from 'web3';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      charityHandler: {},
      etherBalance : ''
    }
  }
  componentWillMount = async () => {
    await this.loadWeb3()
    await this.loadBlockchainData()
    // console.log(this.state.account)
  }
  loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    const balance = await web3.eth.getBalance(accounts[0])
    this.setState({ account: accounts[0], balance })
    // console.log(balance)
    const networkId = await web3.eth.net.getId()
    const charityHandlerData = CharityHandler.networks[networkId]
    if (charityHandlerData) {
      const charityHandler = new web3.eth.Contract(CharityHandler.abi, charityHandlerData.address)
      // console.log(charityHandler)
      this.setState({charityHandler})
    }
    else {
      window.alert('Charity Handler not deployed to current network')
    }
  }
  loadWeb3 = async() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Consider trying Metamask')
      window.location.href('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')
    }
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          
        </Router>
      </div>
    );
  }
}

export default App;
