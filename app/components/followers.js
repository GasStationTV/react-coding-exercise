import React from 'react';

export default React.createClass({      
    render(){
        return (
        <div>
            <h5>Follower List</h5>
            <table className="table--center">
                <tbody>
                    <tr>
                        <th>Gravatar Image</th>
                        <th>Github Username</th>
                    </tr>
                    {this.props.followers.map(function(follower) {
                      return (
                        <tr>
                              <td><img src={follower.avatar_url} className="list__img" /></td>
                              <td>{follower.login}</td>
                        </tr>
                      );
                    })}
                </tbody>
            </table>
        </div>
        )
    }
});