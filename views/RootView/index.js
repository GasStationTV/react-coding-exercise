import React from 'react';
import {debounce} from '../../utils/utils.js';

export default class RootView extends React.Component {

  static propTypes = {
    children: React.PropTypes.any
  } 

  componentDidMount () {
     this.debouncedGithubSearch = debounce ((query) => {
      console.log(query);
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
