import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'store';

import App from 'layouts/app';

import SearchContainer from 'components/search-container';
import UserDetailsContainer from 'components/user-details-container';

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={SearchContainer} />
                <Route path="/user/:userName" component={UserDetailsContainer} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));