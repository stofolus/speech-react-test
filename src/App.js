import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './nlp/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>NLP Demo</h2>
        </div>
        <Search></Search>
      </div>
    );
  }
}

export default App;
