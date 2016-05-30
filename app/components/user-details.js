import React from 'react';
import { Link } from 'react-router';
import { getUser, getFollowers, getRepos } from 'actions/user';
import Followers from './followers.js';
import Repos from './repos.js';

export default React.createClass({

  componentWillMount(){
     getUser(this.props.params.userName);
  },

    componentDidUpdate(prevProps, prevState){
        if(prevProps.user.login != this.props.user.login)
        {
            getFollowers(this.props.user.login);
            getRepos(this.props.user.login);
        }
  },

  render() {
    return (
      <div>
        <Link to='/'>Go Back</Link>
        <div>
          <img src={this.props.user.avatar_url} />
        </div>
          <h5>Github Username</h5>
          <p>{this.props.user.login}</p>
          <h5>Name</h5>
          <p>{this.props.user.name}</p>
        { this.props.user.company && 
          <div>
            <h5>Company</h5>
            <p>{this.props.user.company}</p>
          </div>
        }
        { this.props.user.blog && 
          <div>
            <h5>Blog</h5>
            <p>{this.props.user.blog}</p>
          </div>
        }
        { this.props.user.location && 
          <div>
            <h5>Location</h5>
            <p>{this.props.user.location}</p>
          </div>
        }
        { this.props.user.email && 
          <div>
            <h5>Email</h5>
            <p>
            <a href={"mailto:" + this.props.user.email}>{this.props.user.email}</a>
            </p>
          </div>
        }
        { this.props.user.bio && 
          <div>
            <h5>Bio</h5>
            <p>{this.props.user.bio}</p>
          </div>
        }
        { this.props.user.created_at && 
          <div>
            <h5>Account Creation</h5>
            <p>{this.props.user.created_at}</p>
          </div>
        }
        <Followers followers={this.props.followers}/>
        <Repos repos={this.props.repos}/>
      </div>
 )
    }
});