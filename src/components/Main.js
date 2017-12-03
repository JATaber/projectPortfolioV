import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Item from '../pages/Item';
import Landing from '../pages/Landing';
import Search from '../pages/Search';

class Main extends Component {
    render(){
        return(
            <section>
                <Route exact path = '/' component={Landing} />
                <Route exact path = '/Search' component={Search} />
                <Route exact path = '/Item' component={Item} />
            </section>
        )
    }
}

export default Main;