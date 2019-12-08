import Header from './header';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Web3 from 'web3';
import './App.css';
import erc721 from './build/contracts/ERC721.json';
import contract from 'truffle-contract';
import $ from 'jquery';
import './index.css';
import logo from './logo.png'

class HomePage extends Component {

	constructor(props) {
		super(props);
		window.ethereum.enable().then( () => {
			this.web3 = new Web3(window.ethereum);
			this.loadContract(this.web3).then( () => {
			this.init();
		})
		});
	}
			
	async loadContract(web3) {
		var _contract = contract(erc721);
		_contract.setProvider(web3.currentProvider); 
		this.instance = await _contract.deployed();
	}  

	async init() {
		var id = parseInt(this.web3.currentProvider.chainId, 16);
		var totalTokens = await this.instance.getTotalToken();
		var bal = await this.web3.eth.getBalance(this.instance.address);
		const _res = "Address of ERC721 contract deployed : " + this.instance.address + "\n" + "Id of current network : " + id + "\n" + "Number of tokens minted on contract : " + totalTokens + "\nCurrent contract balance : " + bal/1e18 + " ETH";
		this.res = _res;
		$("#hometext")[0].innerText = _res;
	}

	render() {

		return (
			<homepage>
			<div className="centerlogo">
			<img src={logo} alt="description"></img><br/></div><br/><br/>
			<div id="hometext" className="center">  </div>
			</homepage>
			)
	}
}
export default HomePage;