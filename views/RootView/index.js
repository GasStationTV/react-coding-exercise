import React from 'react';
import {debounce, fetchData} from '../../utils/utils.js';
import SearchResultView from './SearchResultView.js';
import ProfileView from '../profileView/index.js';

let request_url_partial = 'https://api.github.com/search/users?q=';

export default class RootView extends React.Component {

  static propTypes = {
    children: React.PropTypes.any
  }

  constructor (props) {
    super (props);
    this.state = {
      searchResults : [],
      currentFocus : null
    };
  }

  componentDidMount () {
    this.debouncedGithubSearch = debounce ((query) => {
      if (query.length >= 3) {
        fetchData(query, request_url_partial, this);
      }
    }, 200);
  }

  handleChange (event) {
    this.debouncedGithubSearch(event.target.value);
  }

  handleClick (event) {
    // console.log(this.state)
    this.state.searchResults.forEach((person) => {
      if (event.currentTarget.firstChild.nextSibling.innerHTML === person.login) {
        console.log(person);
        this.setState({currentFocus : person})
      }
    })
  }

  render () {
    return (
      <div className="container">
        <div className="results-display-container">
          <div className="title-container">
            <h3>Welcome To The Exercise</h3>
          </div>
          <div className="search-container">
            <input className="search-box" type="text" onChange={this.handleChange.bind(this)} />
          </div>
          <SearchResultView searchResults={this.state.searchResults} handleClick={this.handleClick.bind(this)}/>
          {this.props.children}
        </div>
        <ProfileView currentProfile={this.state.currentFocus} />
      </div>
    );
  }
}
