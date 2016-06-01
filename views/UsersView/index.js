import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import List from '../../components/List'
import { loadSearchResults } from '../../actions'
import zip from 'lodash/zip'

function loadData(props) {
  const { query } = props
  props.loadSearchResults(query, [ 'name' ])
}

class UsersList extends Component {

  static propTypes = {
    query: PropTypes.string,
    users: PropTypes.array,
    loadSearchResults: PropTypes.func
  }

  constructor(props) {
    super(props)

  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      loadData(nextProps)
    }
  }


  render() {
    const { users } = this.props
    if (!users) {
      return <h1>Your search returned no results. Please search for another user.</h1>
    }

    return (
      <div>
        <List
          items={users}
          />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {

  const query = ownProps.params.query.toLowerCase()
  const { entities: { users } } = state

  return {
    query,
    users
  }
}

export default connect(mapStateToProps, {
  loadSearchResults
})(UsersList)
