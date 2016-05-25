import React from 'react';
import {debounce, fetchData} from '../../utils/utils.js';

let request_url_partial = 'https://api.github.com/search/users?q=';

export default class RootView extends React.Component {

  static propTypes = {
    children: React.PropTypes.any
  }

  constructor (props) {
    super (props);
    this.state = {
      searchResults : []
    }
  }

  componentDidMount () {
    console.log('tha state', this.state)
    this.debouncedGithubSearch = debounce ((query) => {
      if (query.length > 3) {
        fetchData(query, request_url_partial, this);
      }
    }, 200);
  }

  handleChange (event) {
    this.debouncedGithubSearch(event.target.value);
  }

  render () {
    return (
      <div>
        <h3>Welcome To The Exercise</h3>
        <input type="text" onChange={this.handleChange.bind(this)} />
        {this.props.children}
      </div>
    );
  }
}
