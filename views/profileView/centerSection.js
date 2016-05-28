import React from 'react';

export default class CenterSection extends React.Component {

  render () {
    let followers;
    if (this.props.currentProfileFollowers.length > 0) {
      followers = this.props.currentProfileFollowers.map((follower) => {
        return (
          <li key={follower.id} className="list-group-item">
            <div className="followers-list-entry">
              <img src={follower.avatar_url} className="followers-list-image" />
              <h6>{follower.login}</h6>
              <div className="followers-list-spacer"></div>
            </div>
          </li>
        )
      })
    } else {
      followers = <h5>this user got no followers</h5>
    }

    return (
      <ul className="list-group followers-list-container">
        {followers}
      </ul>
    )
  }

};