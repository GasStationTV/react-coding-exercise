import React from 'react';
import {stringifyDate} from '../../utils/utils.js';

export default class LeftSection extends React.Component {

  render () {
    let company, blog, location, email, bio;
    if (this.props.profileInfo.company){
      company = <h6>{this.props.profileInfo.company}</h6>;
    };
    if (this.props.profileInfo.blog){
      blog = <h6>{this.props.profileInfo.blog}</h6>;
    };
    if (this.props.profileInfo.location){
      location = <h6>{this.props.profileInfo.location}</h6>;
    };
    if (this.props.profileInfo.email){
      email = <h6>{this.props.profileInfo.email}</h6>;
    };
    if (this.props.profileInfo.bio){
      bio = <h6>{this.props.profileInfo.bio}</h6>;
    };

    return (
      <div className="profile-left-container">
        <img src={this.props.profileInfo.avatar_url} className="profile-left-section-picture"></img>
        <h3>{this.props.profileInfo.login}</h3>
        <h6>{this.props.profileInfo.name}</h6>
        {company}
        {blog}
        {location}
        {email}
        {bio}
        <h6>profile created at: {stringifyDate(this.props.profileInfo.created_at)}</h6>
      </div>
    )
  }

}