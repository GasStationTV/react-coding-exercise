import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

var classNames = require('classnames');

class LoadingBarClass extends Component {
  render () {
    const { loading } = this.props
    var btnClass = classNames('loading', { 'isLoading': this.props.loading })

    return (
      <div className={btnClass}></div>
    );
  }
}

LoadingBarClass.propTypes = {
  loading: PropTypes.bool
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    loading: state.loading
  }
}

let LoadingBar = connect(mapStateToProps)(LoadingBarClass)

export default LoadingBar
