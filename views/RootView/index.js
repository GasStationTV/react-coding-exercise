import React from 'react';
import {debounce, fetchData, fetchUserData} from '../../utils/utils.js';
import SearchResultView from './SearchResultView.js';
import ProfileView from '../profileView/index.js';

export default class RootView extends React.Component {

  static propTypes = {
    children: React.PropTypes.any
  }

  constructor (props) {
    super (props);
    this.state = {
      searchResults : [],
      currentFocus : null,
      currentFocusRepos: [],
      currentFocusFollowers: [],
      dirtySearch: false
    };
  }

  componentDidMount () {
    this.debouncedGithubSearch = debounce ((query) => {
      query = query.trim();
      if (query.length >= 3) {
        fetchData(query, this);
      }
      if (query.length === 0) {
        this.setState({
          searchResults: [],
          dirtySearch  : false
        });
      }
    }, 400);
  }

  handleChange (event) {
    this.debouncedGithubSearch(event.target.value);
  }

  handleSearchClick (event) {
    const person_clicked = event.currentTarget.firstChild.nextSibling.innerHTML;
    fetchUserData(person_clicked, this);
    this.setState({
      searchResults : [],
      dirtySearch: false
    });
  }

  handleFollowersClick (event) {
    const person_clicked = event.currentTarget.firstChild.firstChild.nextSibling.innerHTML;
    fetchUserData(person_clicked, this);
  }

  render () {
    let profilePage;
    if (this.state.currentFocus) {
      profilePage = 
      <ProfileView 
        currentProfile={this.state.currentFocus} 
        currentProfileFollowers={this.state.currentFocusFollowers}
        currentProfileRepos={this.state.currentFocusRepos}
        handleClick={this.handleFollowersClick.bind(this)}
      />;
    }

    return (
      <div className="container">
        <div className="results-display-container">
          <div className="title-container">
            <h3>Search GitHub Users</h3>
          </div>
          <div className="search-container">
            <input id="search-box" className="form-control search-box" type="text" placeholder="search GitHub" onChange={this.handleChange.bind(this)} />
            <SearchResultView 
              searchResults={this.state.searchResults} 
              dirtySearch={this.state.dirtySearch}
              handleClick={this.handleSearchClick.bind(this)}
            />
          </div>
          {this.props.children}
        </div>
        {profilePage}
      </div>
    );
  }

}
