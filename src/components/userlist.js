import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { loadProfile } from '../actions'
import { InfiniteScroll } from './'

class UserListClass extends Component {
  render () {
    const users = this.props.users ? this.props.users : [];

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user, i) =>
            <tr key={i}>
              <td>
                <img className="img-circle" src={user.avatar_url} />
              </td>
              <td>
                {user.login}
              </td>
              <td>
                <button onClick={loadProfile(user.login)} className="primary">Details</button>
              </td>
            </tr>
          )}
          </tbody>
        </table>
        <InfiniteScroll />
      </div>
    );
  }
}

UserListClass.propTypes = {
  users: PropTypes.array
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    loadProfile: (username) => dispatch(loadProfile(username))
  }
}

let UserList = connect(mapDispatchToProps)(UserListClass)

export default UserList
