import React from 'react';

const renderIf = predicate => element => predicate && element;

export default class SearchResultView extends React.Component {

  render () {
    const noSearchResults = renderIf(this.props.searchResults.length === 0);
    const searchResults = renderIf(this.props.searchResults.length !== 0);

    let githubSearchResults = this.props.searchResults.slice(0, 10).map((person) => {
      return (
        <div  key={person.id} className="person-entry-view-holder">
          <div className="person-entry-view" onClick={this.props.handleClick}>
            <img className="person-entry-view-image" src={person.avatar_url} />
            <h4>{person.login}</h4>
            <div className="person-entry-view-spacer"></div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {searchResults(githubSearchResults)}
        {noSearchResults(
          <span className="person-entry-view-no-results">No results. Please search for another user.</span>
        )}
      </div>
    );
  }
  
}