import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import HomeView from './views/RootView';
import App from './views/App';
import UsersView from './views/UsersView';
import UserDetails from './views/UserDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = (
    <Route component={HomeView} >
      <Route path="/" component={App} >
        <Route path="/search/:query" component={UsersView} />
      </Route>
      <Route path="/:login" component={UserDetails} />
    </Route>
);

export default routes;
