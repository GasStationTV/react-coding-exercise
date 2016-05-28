import React from 'react';

export default class LeftSection extends React.Component {

  render () {
    return (
      <div className="profile-left-section">
        <img src={this.props.profileInfo.avatar_url} className="profile-left-section-picture"></img>
        <h3>{this.props.profileInfo.login}</h3>
        <h4>{this.props.profileInfo.name}</h4>
        <h4>{this.props.profileInfo.company}</h4>
        <h4>{this.props.profileInfo.blog}</h4>
        <h4>{this.props.profileInfo.location}</h4>
        <h4>{this.props.profileInfo.email}</h4>
        <h4>{this.props.profileInfo.bio}</h4>
        <h4>{this.props.profileInfo.created_at}</h4>
      </div>
    )
  }

}