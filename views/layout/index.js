import React, { Component, PropTypes } from 'react'
import AutoComplete from '../../src/components/autocomplete'
import LoadingBar from '../../src/components/loadingbar'


export default class LayoutView extends Component {
  render () {
    const { main } = this.props
    return (
      <div className="layout">
        <LoadingBar />
        <nav className="navbar">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <span className="navbar-brand">Github User Search</span>
              </div>
              <div className="col-md-6">
                <AutoComplete />
              </div>
            </div>
          </div>
        </nav>
        {main}
      </div>
    );
  }
}
