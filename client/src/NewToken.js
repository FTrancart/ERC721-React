import React , {Component} from 'react';
import './index.css';
import input from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import erc721 from './build/contracts/ERC721.json';
import contract from 'truffle-contract';
import $ from 'jquery';
import FileUpload from './components/FileUpload';

class NewToken extends Component {

	constructor(props) {
		super(props);
		this.getAddress();
	}

	async getAddress() {
		var web3 = new Web3(window.ethereum);
		var _contract = contract(erc721);
		_contract.setProvider(web3.currentProvider); 
		var instance = await _contract.deployed();
		const ad = await web3.currentProvider.selectedAddress;
		$("#current-ad")[0].innerText = "Buy one ERC721 token\n\nThe function will transfer 0.1 ETH from the current account (" + ad + ")\nPlease upload a token image before confirming";
	}

	render() {
		return (
			<newtoken>

			<div className='container mt-4'>
			<div className='w50' id="current-ad"></div><br/>
			<FileUpload />
			</div>

			</newtoken>
			)
	}
} 
export default NewToken;
