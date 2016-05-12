import React from 'react';
import Router, {Link, RouteHandler} from 'react-router';

require('./styles/styles.css');

class UserList extends React.Component {
  constructor() {
    super();
  }
  render() {
    const searchError = this.props.searchError;
    const userInfo = this.props.userInfo;
    if ( searchError === 0 ) {
      return (
        <div>
          <h3 className="text-danger text-center">Your search returned no results.<br /> Please search for another user.</h3>
        </div>
      )
    } else {
        return (
          <div className="userInfo">
            {
              userInfo.map((user) => {
                let details = `/details/${user.login}/`;
                return (
                    <div className="userInfo__content flex-container" key={user.id}>
                      <div className="userInfo__img">
                        <Link to={details}><img src={user.avatar_url} /></Link>
                      </div>
                      <div className="">
                        <p><strong>Github Username</strong>: <span>{user.login}</span></p>
                        <Link to={details}>Detail</Link>
                      </div>
                    </div>
                )
              })
            }

          </div>
        );
    } //- end of conditional
  }
}

export default UserList;
