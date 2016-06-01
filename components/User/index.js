import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class User extends Component {


  render() {
    const { user: { login, avatarUrl } } = this.props
    return (
      <div className="User" >
        <Link to={`/${login}`}>
          <img src={avatarUrl} width="72" height="72" style={{display: "inline"}} />
          <h3>
            {login}
          </h3>
        </Link>
      </div>
    )
  }
}
