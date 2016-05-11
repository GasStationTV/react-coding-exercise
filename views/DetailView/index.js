import React from 'react';
import UserList from '../UserList';
import Router, {Link, RouteHandler} from 'react-router';

class DetailView extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log(this.props);
  }
  render () {
    let userInfo = this.props.userInfo;
    console.log(userInfo);
    return (
      <div>
        <h4>No Fishes Here</h4>
      </div>
    );
  }
}

export default DetailView;
