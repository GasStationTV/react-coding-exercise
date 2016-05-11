import React         from 'react';
import { Route, Router, hashHistory }     from 'react-router';

import HomeView  from './views/RootView';
import DetailView  from './views/DetailView';

const routes = (
  <Route path="/" component={HomeView} >
    <Route path='/details' component={DetailView} />
  </Route>
  // <Router history={hashHistory}>
  //   <Route path="/" component={HomeView}/>
  //   <Route path='/details/:id' component={DetailView} />
  // </Router>
);

export default routes;
