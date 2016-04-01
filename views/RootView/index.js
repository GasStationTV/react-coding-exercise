import React from 'react';

export default class RootView extends React.Component {
  static propTypes = {
    children: React.PropTypes.any
  }

  /**
   * Navigates to the Fish Route
   */
  goToFish () {
    this.context.router.push('/fish');
  }

  render () {
    return (
      <div>
        <h3>Welcome To The Exercise</h3>
        {this.props.children}
      </div>
    );
  }
}
