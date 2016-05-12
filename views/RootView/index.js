//- classes
import React from 'react';
import $ from 'jquery'; //- sorry :(
import SearchForm from '../SearchForm';
import UserList from '../UserList';
import DetailView from '../DetailView';
//- styles
import styles from './styles/app.css';
import bootstrap from './styles/bootstrap.min.css'

class SearchApp extends React.Component {
  constructor() {
    super();
    // initial states
    this.state = {
      data: [],
      error: ''
    }
  }
  findUser(user) {
    const USERS_ENDPOINT = `https://api.github.com/search/users?q=${user}`;
    $.get(USERS_ENDPOINT, (response) => {
      this.setState({
        data: response.items,
        error: response.total_count
      });
    });
  }
  render() {
    return (
        <div className="app-content">
          <h2 className="title">Github Search</h2>
          <SearchForm findUser={this.findUser.bind(this)} />
          <UserList userInfo={this.state.data} searchError={this.state.error} />
          {this.props.children}
        </div>
    );
  }
}

export default SearchApp;
console.clear(); //- im sick of those sourcemap warnings
