import React         from 'react';
import { Route }     from 'react-router';
import HomeView  from './views/RootView';

var styles = require('./styles.css');
var bootstrap = require('./node_modules/bootstrap/dist/css/bootstrap.css');

const routes = (
  <Route path="/" component={HomeView}>
  </Route>
);

export default routes;
