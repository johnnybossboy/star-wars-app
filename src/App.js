import React, { Component } from 'react';
import './App.css';

import Navbar from './Components/Navbar';
import Information from './Components/Information';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <Navbar />
        <Information />
      </div>
    );
  }
}

export default App;
