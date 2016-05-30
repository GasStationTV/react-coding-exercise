import React from 'react';
import Search from './search';
import { connect } from 'react-redux';

const SearchContainer = React.createClass({
    render: function() {
        return (
            <Search {...this.props} />
        )
    }
});

const stateToProps = function(state) {
    return {
        users: state.userReducer.users,
        numChars: state.userReducer.numChars,
        didSearch: state.userReducer.didSearch
    }
}

export default connect(stateToProps)(SearchContainer)
