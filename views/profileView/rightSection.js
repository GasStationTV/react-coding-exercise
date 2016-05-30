import React from 'react';

export default class RightSection extends React.Component {

  render () {
    let repos;
    if (this.props.currentProfileRepos.length > 0) {
      repos = this.props.currentProfileRepos.map((repo) => {
        return (
          <li key={repo.id} className="list-group-item repo-entry">
            <div>
              <h6>{repo.name}</h6>
              <span className="label label-info">{repo.stargazers_count} stars</span>
            </div>
          </li>
        )
      })
    } else {
      repos = <h5>this user does not have any repos</h5>
    }

    return (
      <ul className="list-group repo-container">
        {repos}
      </ul>
    )
  }

};