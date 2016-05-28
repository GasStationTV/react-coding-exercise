import React from 'react';
import {stringifyDate} from '../../utils/utils.js';

export default class LeftSection extends React.Component {

  render () {
    let company, blog, location, email, bio;
    if (this.props.profileInfo.company){
      company = <h5>{this.props.profileInfo.company}</h5>;
    };
    if (this.props.profileInfo.blog){
      blog = <h5>{this.props.profileInfo.blog}</h5>;
    };
    if (this.props.profileInfo.location){
      location = <h5>{this.props.profileInfo.location}</h5>;
    };
    if (this.props.profileInfo.email){
      email = <h5>{this.props.profileInfo.email}</h5>;
    };
    if (this.props.profileInfo.bio){
      bio = <h5>{this.props.profileInfo.bio}</h5>;
    };

    return (
      <div className="profile-left-container">
        <img src={this.props.profileInfo.avatar_url} className="profile-left-section-picture"></img>
        <h3>{this.props.profileInfo.login}</h3>
        <h5>{this.props.profileInfo.name}</h5>
        {company}
        {blog}
        {location}
        {email}
        {bio}
        <h5>profile created at: {stringifyDate(this.props.profileInfo.created_at)}</h5>
      </div>
    )
  }

}