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

class Specifics extends Component {

	constructor(props) {
		super(props);
		this.web3 = new Web3(window.ethereum);
		this.loadContract(this.web3).then(() => {
		});

		this.state = {id: '', path : ''};
		this.handleChange = this.handleChange.bind(this);
	}

	async loadContract(web3) {
		var _contract = contract(erc721);
		_contract.setProvider(web3.currentProvider); 
		this.instance = await _contract.deployed();
	}  

	async getDetails() {
		var owner = await this.instance.ownerOf.call(this.state.id);
		$("#details-result")[0].innerText = "The owner of the token " + this.state.id + " is " + owner; 
	}

	handleChange(event) {
		this.setState({id: event.target.value});
		this.setState({path : "require('./uploads/token" + event.target.value + ".png')"});
	}

	render() {
		
		return (
			<specifics>

			<div className="center w50"> Enter the id of the token whose details you want to see </div>
			<br/>
			<InputGroup className="mb-3 w50">
			<InputGroup.Prepend>
			<Button variant="outline-secondary" onClick = {() => this.getDetails()}>Search</Button>
			</InputGroup.Prepend>
			<FormControl aria-describedby="basic-addon1"   value={this.state.value} onChange={this.handleChange} />
			</InputGroup>

			<div className="w50" id="details-result">
			</div>
			<img src={this.state.path} id="logo" alt=""></img>

			</specifics>
			)
		}
	} 
	export default Specifics;