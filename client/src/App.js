import Header from './header';
import HomePage from './homepage';
import React, { Component } from 'react';

class App extends Component {

  render() {
    if(window.location.href == "http://localhost:3000/") {
      return (
        <div>
        <Header />
        <HomePage />
        </div>
        )
      }
      else{
        return (
        <div>
        <Header />
        </div>
        )
      }
    }
  }

  export default App;