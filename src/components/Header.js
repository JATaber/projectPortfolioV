import React, { Component } from 'react';
import Nav from './Nav';

class Header extends Component {
    render(){
        return(
          <div className="headerBG">
              <header>

                  <Nav />
              </header>
          </div>
        );
    }
}

export default Header;