import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import User from '../User'
import values from 'lodash/values'
import isEmpty from 'lodash/isEmpty'

export default class List extends Component {
  constructor(props) {
    super(props)
    this.renderUser = this.renderUser.bind(this)
    // this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  renderUser(user) {
console.log('user: ', user);
    return (
      <div key={user.id}>
        <User user={user}
          />
      </div>
    )
  }
  // renderLoadMore() {
  //   const { isFetching, onLoadMoreClick } = this.props
  //   return (
  //     <button style={{ fontSize: '150%' }}
  //             onClick={onLoadMoreClick}
  //             disabled={isFetching}>
  //       {isFetching ? 'Loading...' : 'Load More'}
  //     </button>
  //   )
  // }

  render() {
    const { items } = this.props
    const usersArray = values(items)

    return (
      <div>
        {usersArray.map(this.renderUser)}
      </div>
    )
  }
}
