import React from 'react';
import {debounce, fetchData} from '../../utils/utils.js';
import SearchResultView from './SearchResultView.js';

let request_url_partial = 'https://api.github.com/search/users?q=';

let divStyle = {
  'display' : 'flex',
  'justify-content' : 'center',
  'flex-direction' : 'column',
  'background-color' : 'lightgrey',
  'width' : '400px'
};

let container = {
  'display' : 'flex',
  'justify-content' : 'center'
};

let inputStyle = {
  'width' : '250px'
};

let inputContainer = {
  'display' : 'flex',
  'justify-content' : 'center'
};

let titleStyle = {
  'display' : 'flex',
  'justify-content' : 'center'
};

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

  render () {
    return (
      <div style={container}>
        <div style={divStyle}>
          <div style = {titleStyle}>
            <h3>Welcome To The Exercise</h3>
          </div>
          <div style={inputContainer}>
            <input style={inputStyle} type="text" onChange={this.handleChange.bind(this)} />
          </div>
          <SearchResultView searchResults={this.state.searchResults} />
          {this.props.children}
        </div>
      </div>
    );
  }
}
