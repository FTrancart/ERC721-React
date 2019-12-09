import React , {Component} from 'react';
import './index.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
import Homepage from './homepage';
import ReactDOM from 'react-dom';

class Specifics extends Component {

	render() {
		
		return (
			<div className="center w50"> Enter the id of the token whose details you want to see </div>
			<br/>
			<InputGroup className="mb-3 w50">
			<InputGroup.Prepend>
			<Button variant="outline-secondary">Search</Button>
			</InputGroup.Prepend>
			<FormControl aria-describedby="basic-addon1" />
			</InputGroup>

			<div className="w50" id="details-result">
			</div>
			)
		}
	} 
	export default Specifics;

	const myElement = (
  <div></div>
)