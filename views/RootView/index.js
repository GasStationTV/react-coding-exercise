import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store';

const store = configureStore();

export default class RootView extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render () {
    return (
      <div className="container">
        <Provider store={store}>
          {this.props.children}
        </Provider>
      </div>
    );
  }
}
