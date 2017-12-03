import React, { Component } from 'react';
import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <Router>
          <div>
              <Header />
              <Main />
              <Footer />
          </div>
      </Router>
    );
  }
}

export default App;
