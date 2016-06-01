import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUserDetails, resetErrorMessage, loadFollowers, loadRepos } from '../../actions'
import zip from 'lodash/zip'
import isEmpty from 'lodash/isEmpty'
import values from 'lodash/values'

function loadData(props) {
  const { params: { login } } = props
    props.loadUserDetails(login, [ 'name' ])
    props.loadFollowers(login, ['name'])
}

export default class UserDetails extends Component {

  static propTypes = {
    user: PropTypes.object,
    loadUserDetails: PropTypes.func,
    loadRepos: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.renderRepo = this.renderRepo.bind(this)
    this.renderFollower = this.renderFollower.bind(this)
    // this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const { params: { login } } = this.props
    if (nextProps.followers !== this.props.followers) {
    }
  }

  renderFollower(follower) {
    return <li>{follower.login}</li>
  }

  renderRepo(repo) {
    return <li>{repo.name}</li>
  }

  render() {
    const {params: { login } } = this.props;
    const { repos, followers } = this.props;
    const user = this.props.user[login];
    if (!user) {
      return <h1><i>Loading...</i></h1>
    }
    if (isEmpty(repos)) {
      console.log(console.log("get repos: "));
      this.props.loadRepos(login, ['name']);
    }
    if (isEmpty(followers)) {
      console.log(console.log("get repos: "));
      this.props.loadFollowers(login, ['name']);
    }
    const followersArray = values(followers)
    const reposArray = values(repos)
    return (
      <div className="container" style={{paddingTop: "5em"}}>
        <div className="col-sm-5">
          <h1>{user.name}</h1>
          <div>
            <img src={user.avatarUrl} />
          </div>
        </div>
        <div className="col-sm-3" >
          <h5 >Github Username </h5>
          {user.login}
        { user.company &&
          <div >
            <h5 >Company </h5>
            {user.company}
          </div>
        }
        { user.blog &&
          <div >
            <h5>Blog</h5>
            <a href={user.blog}>{user.blog}</a>
          </div>
        }
        { user.location &&
          <div >
            <h5>Location</h5>
            {user.location}
          </div>
        }
        { user.email &&
          <div >
            <h5>Email</h5>

            <a href={"mailto:"+user.email}>{user.email}</a>

          </div>
        }
        { user.bio &&
          <div >
            <h5>Bio</h5>
            {user.bio}
          </div>
        }
        { user.created_at &&
          <div >
            <h5 >Account Creation</h5>
            {user.created_at}
          </div>
        }
        </div>
        <div className="col-sm-4">
          { followersArray &&
            <div className="col-sm-6">
              <h2>Followers</h2>
              <ul style={{listStyleType: "none"}}>
                {followersArray.map(this.renderFollower)}
              </ul>
            </div>
          }
          { reposArray &&
            <div className="col-sm-6">
              <h2>Repos</h2>
              <ul style={{listStyleType: "none"}}>
                {reposArray.map(this.renderRepo)}
              </ul>
            </div>
          }
        </div>
      </div>

    )
  }
}

function mapStateToProps(state,) {
  const { entities: { user, followers, repos }, errorMessage } = state
  return {
    errorMessage,
    user,
    followers,
    repos
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage,
  loadUserDetails,
  loadFollowers,
  loadRepos
})(UserDetails)
