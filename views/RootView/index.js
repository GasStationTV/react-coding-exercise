import React from 'react';
import SearchForm from '../SearchForm';
import UserList from '../UserList';

require('./styles/bootstrap.min.css');
require('./styles/app.css');

class SearchApp extends React.Component {
  constructor() {
    super();
    // initial states
    this.state = {
      data: []
    }
  }
  findUser(user) {
    const USER_ENDPOINT = `https://api.github.com/search/users?q=${user}`;

    fetch(USER_ENDPOINT)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response.items });
        console.log(response.items);
      });

  }
  render() {
    return (
        <div className="app__content">
          <h2 className="text-center app__title">Github Search</h2>
          <SearchForm findUser={this.findUser.bind(this)} />
          <UserList userInfo={this.state.data} />
        </div>
    );
  }
}

export default SearchApp;
