import React from 'react';
import {stringifyDate} from '../../utils/utils.js';

export default class LeftSection extends React.Component {

  render () {

    return (
      <div className="profile-left-section">
        <img src={this.props.profileInfo.avatar_url} className="profile-left-section-picture"></img>
        <h3>{this.props.profileInfo.login}</h3>
        <h5>{this.props.profileInfo.name}</h5>
        <h5>{this.props.profileInfo.company}</h5>
        <h5>{this.props.profileInfo.blog}</h5>
        <h5>{this.props.profileInfo.location}</h5>
        <h5>{this.props.profileInfo.email}</h5>
        <h5>{this.props.profileInfo.bio}</h5>
        <h5>profile created at: {stringifyDate(this.props.profileInfo.created_at)}</h5>
      </div>
    )
  }

}