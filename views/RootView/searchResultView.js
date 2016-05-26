import React from 'react';

let personStyle1 = {
  'display' : 'flex',
  'justifyContent' : 'space-between'
}

let personImgStyle = {
  'height' : '50px',
  'width' : '50px'
}

let noResultsStyle = {
  'display' : 'flex',
  'justifyContent' : 'center'
}

const renderIf = predicate => element => predicate && element;

export default class SearchResultView extends React.Component {

  render () {
    const noSearchResults = renderIf(this.props.searchResults.length === 0);
    const searchResults = renderIf(this.props.searchResults.length !== 0);

    let githubSearchResults = this.props.searchResults.slice(0, 10).map((person) => {
      return (
        <div key={person.id} style={personStyle1} onClick={this.props.handleClick}>
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