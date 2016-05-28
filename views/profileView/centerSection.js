import React from 'react';

export default class CenterSection extends React.Component {

  render () {
    let followers;
    if (this.props.currentProfileFollowers.length > 0) {
      followers = this.props.currentProfileFollowers.map((follower) => {
        console.log(follower)
        return (
          <li key={follower.id} className="list-group-item">
            {follower.login}
          </li>
        )
      })
    }

    return (
      <ul className="list-group">
        {followers}
      </ul>
    )
  }

};