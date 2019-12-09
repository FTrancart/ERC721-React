import React , {Component} from 'react';
import './index.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import erc721 from './build/contracts/ERC721.json';
import contract from 'truffle-contract';
import $ from 'jquery';

class NbTokens extends Component {

	constructor(props) {
		super(props);
		this.web3 = new Web3(window.ethereum);
		this.loadContract(this.web3).then(() => {
		});

		this.state = {ad: ''};
		this.handleChange = this.handleChange.bind(this);
		}

	async loadContract(web3) {
		var _contract = contract(erc721);
		_contract.setProvider(web3.currentProvider); 
		this.instance = await _contract.deployed();
	}  

	async getNb() {
		var nb = await this.instance.tokensByAddress.call(this.state.ad);
		$("#nbtokens-result")[0].innerText = "The address " + this.state.ad + " owns " + nb + " token(s)" ; 
	}

	handleChange(event) {
		this.setState({ad: event.target.value});
	}

	render() {
		
		return (
			<div>
			<div className="center w50"> Enter the address you want to see the number of tokens owned </div>
			<br/>
			<InputGroup className="mb-3 w50">
			<InputGroup.Prepend>
			<Button variant="outline-secondary" onClick = {() => this.getNb()}>Search</Button>
			</InputGroup.Prepend>
			<FormControl aria-describedby="basic-addon1"   value={this.state.value} onChange={this.handleChange} />
			</InputGroup>

			<div className="w50" id="nbtokens-result">
			</div>
			</div>
			)
		}
	} 
	export default NbTokens;