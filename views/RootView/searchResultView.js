import React from 'react';

let personStyle1 = {
  'display' : 'flex',
  'justify-content' : 'space-between'
}

let personImgStyle = {
  'height' : '50px',
  'width' : '50px'
}

let noResultsStyle = {
  'display' : 'flex',
  'justify-content' : 'center'
}

const renderIf = predicate => element => predicate && element;

export default class SearchResultView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  handleClick (event) {
    console.log(this, '  ', event.currentTarget)
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  render () {
    const noSearchResults = renderIf(this.props.searchResults.length === 0);
    const searchResults = renderIf(this.props.searchResults.length !== 0);

    let githubSearchResults = this.props.searchResults.slice(0, 10).map((person) => {
      console.log(person)
      return (
        <div style={personStyle1} onClick={this.handleClick.bind(this)}>
          <img style={personImgStyle} src={person.avatar_url} />
          <h4>{person.login}</h4>
          <div style={personImgStyle}></div>
        </div>
      );
    });

    return (
      <div>
        {searchResults(githubSearchResults)}
        {noSearchResults(
          <span style={noResultsStyle}>No results. Please search for another user.</span>
        )}
      </div>
    );
  }

}