import React from 'react';
import Router, {Link, RouteHandler} from 'react-router';

class NavLink extends React.Component {
  render() {
    return <Link {...this.props} />
  }
}

export default NavLink;
