import React         from 'react';
import { Route }     from 'react-router';

import HomeView  from './views/RootView';
import FishView  from './views/FishView';

const routes = (
  <Route path="/" component={HomeView} >
    <Route path='fish' component={FishView} />
  </Route>
);

export default routes;
