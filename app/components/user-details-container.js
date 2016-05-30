import React from 'react';
import UserDetails from './user-details';
import { connect } from 'react-redux';

const UserDetailsContainer = React.createClass({
    render: function() {
        return (
            <UserDetails {...this.props} />
        )
    }
});

const stateToProps = function(state) {
    return {
        user: state.userReducer.user,
        followers: state.userReducer.followers,
        repos: state.userReducer.repos
    }
}

export default connect(stateToProps)(UserDetailsContainer)