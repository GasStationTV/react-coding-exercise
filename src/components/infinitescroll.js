import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { store } from '../../views/rootview'
import { nextPage } from '../actions'

class InfiniteScrollClass extends Component {

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(e) {
    let scrollY = window.scrollY;
    let documentHeight = document.body.clientHeight;
    let loadingOffset = 1000;

    if (documentHeight - scrollY <= loadingOffset && store.getState().canInfiniteScroll) {      
      this.props.loadMore();
    }
  }

  render () {
    return false;
  }
}

InfiniteScrollClass.propTypes = {
  loading: PropTypes.bool
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadMore: () => store.dispatch(nextPage())
  }
}

let InfiniteScroll = connect(mapStateToProps, mapDispatchToProps)(InfiniteScrollClass)

export default InfiniteScroll
