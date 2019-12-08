import React , {Component} from 'react';
import $ from 'jquery';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Homepage from './homepage';
import Specifics from './Specifics';
import NewToken from './NewToken';
import NbTokens from './NbTokens';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

class Header extends Component {

	render() {
		return (
			<header>
			<Router>
			<Navbar bg="primary" variant="dark">
			<Navbar.Brand href="/home">ERC721 Explorer</Navbar.Brand>
			<Nav className="mr-auto">
			<Nav.Link href="/newtoken">Buy a token</Nav.Link>
			<Nav.Link href="/specifics">Show specific token</Nav.Link>
			<Nav.Link href="/nbtokens">Get number of tokens</Nav.Link>
			</Nav>
			</Navbar>

			<Switch>

			<Route path="/home">
			<Homepage />
			</Route>

			<Route path="/specifics">
			<Specifics />
			</Route>

			<Route path="/newtoken">
			<NewToken />
			</Route>

			<Route path="/nbtokens">
			<NbTokens />
			</Route>

			</Switch>

			</Router>
			</header>
			)
	}
} 
export default Header;