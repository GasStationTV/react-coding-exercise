import React from 'react';

export default class SearchResultView extends React.Component {

  render () {

    let githubSearchResults;
    if (this.props.searchResults.length > 0) {
      githubSearchResults = this.props.searchResults.slice(0, 10).map((person) => {
        return (
          <li key={person.id} className="person-entry-view-holder">
            <div className="person-entry-view" onClick={this.props.handleClick}>
              <img className="person-entry-view-image" src={person.avatar_url} />
              <h5>{person.login}</h5>
              <div className="person-entry-view-spacer"></div>
            </div>
          </li>
        );
      });
    } else if (this.props.dirtySearch){
      githubSearchResults = <span className="person-entry-view-no-results">No results. Please search for another user.</span>
    }

    return (
      <ul className="search-results-container" >
        {githubSearchResults}
      </ul>
    );
  }
  
}