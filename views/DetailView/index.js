import React from 'react';
import UserList from '../UserList';
import $ from 'jquery';

require('./styles/styles.css');

class DetailView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      gravatar: '',
      company: '',
      blog: '',
      location: '',
      email: '',
      bio: '',
      created_at: '',
      followers_url: '',
      repos_url: '',
      repos: [],
      followers: [],
    }
  }
  componentWillMount() {
    const USER_ENDPOINT = `https://api.github.com/users/${this.props.params.user}`;
    $.get(USER_ENDPOINT, (response) => {
      this.setState({
        username: response.login,
        gravatar: response.avatar_url,
        company: response.company,
        blog: response.blog,
        location: response.location,
        email: response.email,
        bio: response.bio,
        created_at: new Date(response.created_at).toString(),
        followers_url: response.followers_url,
        repos_url: response.repos_url
      });
    }).done((response) => {
      $.get(response.repos_url, (response) => {
        this.setState({
          repos: response
        });
      });
      $.get(response.followers_url, (response) => {
        this.setState({
          followers: response
        });
      });
    });
  }
  render() {
    const email = `mailto:${this.state.email}`;
    const visibility = this.state.company || this.state.blog || this.state.location || this.state.email !== '' ? 'hidden' : 'visible';
    return (
      <div className="details-content">
        <h2 className="title">Detail View</h2>
        <div className="user-info-content">
          <div className="details-content__img">
            <img src={this.state.gravatar} />
          </div>
          <div className="details-content__info-list">
            <ul className="details-content__list">
              <li><strong>Name</strong>: {this.state.username}</li>
              <li className={visibility}><strong>Company</strong>: {this.state.company}</li>
              <li className={visibility}><strong>Blog</strong>: {this.state.blog}</li>
              <li className={visibility}><strong>Location</strong>: {this.state.location}</li>
              <li className={visibility}><strong>Email</strong>: <a href={email}>{this.state.email}</a></li>
              <li className={visibility}><strong>Bio</strong>: {this.state.bio}</li>
              <li><strong>Created</strong>: {this.state.created_at}</li>
              <li><strong>Followers</strong>:
                {
                  this.state.followers.map((follower) => {
                    return (
                      <a href={follower.html_url} target="_blank" className="follower-link" key={follower.id}><span>{follower.login}</span></a>
                    )
                  })
                }
              </li>
              <li><strong>Repos</strong>:
                {
                  this.state.repos.map((repo) => {
                    return (
                        <a href={repo.html_url} target="_blank" className="repo-link" key={repo.id}><span>{repo.name}</span></a>
                    )
                  })
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailView;
