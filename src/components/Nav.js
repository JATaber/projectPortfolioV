import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
    render(){
        return(
            <nav className='navBar'>
                <ul>
                    <NavLink to='/' ><li>Home</li></NavLink>
                    <NavLink to='/Search' ><li>Search</li></NavLink>
                </ul>
            </nav>
        )
    }
}

export default Nav;