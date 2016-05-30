import React from 'react';
import { Link } from 'react-router';
import { getUsers, countInputChars, setDebounce } from 'actions/user';

export default React.createClass({

    search(e){
        let searchButton = e.target;
        searchButton.disabled = true;

        setTimeout(function(){
          searchButton.disabled = false;
        }, 2000);

        getUsers(this.refs.searchInput.value);
    },

    handleChange(){
        countInputChars(this.refs.searchInput.value.length);
    },

    render(){
        return (
        <div>
          <label>Search for a Github user:</label>
          <form className="form-inline">
            <div className="form-group">
              <div className="input-group">
                <input ref="searchInput" type="text" onChange={this.handleChange} className="form-control" />
              </div>
            </div>
            <button type="button" className="btn btn-primary" disabled={this.props.numChars < 3} onClick={this.search}>Search</button>
          </form>
          {this.props.users.length > 0 &&
          <table className="table--center">
            <tbody>
              <tr>
              <th>Gravatar Image</th>
              <th>Github Username</th>
              <th>User Details</th>
              </tr>
              {this.props.users.map(function(user) {
                let linkHref = `/user/${user.login}`;
                return (
                  <tr>
                      <td><Link to={linkHref}><img src={user.avatar_url} className="list__img" /></Link></td>
                      <td>{user.login}</td>
                      <td><Link to={linkHref}><img src="../app/images/details.png" /></Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
          {this.props.didSearch && this.props.users.length == 0 &&
            <p>
              Your search returned no results. Please search for another user.
            </p>
          }
      </div>
        )
    }
});