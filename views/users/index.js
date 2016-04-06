import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchUsers, increment } from '../../src/actions'
import configureStore from '../../configurestore'
import { UserList, AutoComplete } from '../../src/components'

var classNames = require('classnames');

class UserViewClass extends Component {
  render() {
    return (
      <div>
        {this.props.users.length > 0 &&
          <UserList users={this.props.users}/>
        }
        {this.props.users.length === 0 && this.props.query.length === 0 &&
          <p>Please search to find users</p>
        }
        {this.props.users.length === 0 && this.props.query.length > 0 && this.props.query.length < 3 &&
          <p>Keep searching to narrow it down</p>
        }
        {this.props.users.length === 0 && this.props.query.length > 3 &&
          <p>Your search returned no results. Please search for another user.</p>
        }
      </div>
    )
  }
}

UserViewClass.propTypes = {
  loading: PropTypes.bool
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count,
    loading: state.loading,
    users: state.users,
    query: state.query
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increment()),
    fetchUsers: () => dispatch(fetchUsers())
  }
}

// Connected Component
let UserView = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserViewClass)

export default UserView
