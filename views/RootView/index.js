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
      currentFocusFollowers: []
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

  handleClick (event) {
    const person_clicked = event.currentTarget.firstChild.nextSibling.innerHTML;
    console.log('clicked on', person_clicked)
    fetchUserData(person_clicked, this);
    // this.setState({
    //   searchResults : []
    // });
  }

  render () {
    let profilePage;
    if (this.state.currentFocus) {
      profilePage = <ProfileView 
      currentProfile={this.state.currentFocus} 
      currentProfileFollowers={this.state.currentFocusFollowers}
      currentProfileRepos={this.state.currentFocusRepos}
      />;
    }

    return (
      <div className="container">
        <div className="results-display-container">
          <div className="title-container">
            <h3>Welcome To The Exercise</h3>
          </div>
          <div className="search-container">
            <input id="search-box" className="form-control search-box" type="text" placeholder="search GitHub" onChange={this.handleChange.bind(this)} />
          </div>
          <SearchResultView searchResults={this.state.searchResults} 
            dirtySearch={this.state.dirtySearch}
            handleClick={this.handleClick.bind(this)}/>
          {this.props.children}
        </div>
        {profilePage}
      </div>
    );
  }

}
