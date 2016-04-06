import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { store } from '../rootview'
import { loadProfile } from '../../src/actions'


export default class DetailViewClass extends Component {
  componentWillMount() {
    store.dispatch(loadProfile(this.props.params.username))
  }

  render () {
    const { profile, backToListView } = this.props;

    return (
      <div>
        <button onClick={backToListView} className="primary">Back to List View</button>
        <h2>Detail View</h2>
        {profile &&
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img src={profile.avatar_url} className="img-circle" />
              </div>
              <div className="col-md-6">
                <ul>
                  {profile.login &&
                    <li>Username: {profile.login}</li>
                  }
                  {profile.name &&
                    <li>Name: {profile.name}</li>
                  }
                  {profile.company &&
                    <li>Company: {profile.company}</li>
                  }
                  {profile.blog &&
                    <li>Blog: {profile.blog}</li>
                  }
                  {profile.location &&
                    <li>Location: {profile.location}</li>
                  }
                  {profile.email &&
                    <li>
                      Email:&nbsp;
                      <a href={`mailto:${profile.email}`}>{profile.email}</a>
                    </li>
                  }
                  {profile.bio &&
                    <li>Bio: {profile.bio}</li>
                  }
                  <li>Date Joined: {new Date(profile.created_at).toDateString()}</li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <h3>{profile.login}&rsquo;s Repositories</h3>
                <ul>
                  {profile.repos_fetched.map((repo, i) =>
                    <li key={i}>
                      <a href={repo.html_url}>{repo.name}</a>
                    </li>
                  )}
                </ul>
              </div>
              <div className="col-md-6">
                <h3>{profile.login}&rsquo;s Followers</h3>
                <ul>
                  {profile.followers_fetched.map((follower, i) =>
                    <li key={i}>
                      <a href={follower.html_url}>{follower.login}</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    profile: state.profile,
    loading: state.loading
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    backToListView: () => browserHistory.push('/')
  }
}

let DetailView = connect(mapStateToProps, mapDispatchToProps)(DetailViewClass)

export default DetailView
