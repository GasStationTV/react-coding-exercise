import React from 'react';

class UserList extends React.Component {
  constructor() {
    super();
  }
  showDetail() {
    console.log(this.props.userInfo[0]);
  }
  render() {
    let userInfo = this.props.userInfo;
      if ( userInfo.length ) {
        console.log('empty');
      }
      return (
        <div className="userInfo">
          {
            userInfo.map((user) => {
              return (
                  <div className="userInfo__content flex-container">
                    <div className="userInfo__img">
                      <a href="#"><img src={user.avatar_url} /></a>
                    </div>
                    <div className="">
                      <p><strong>Github Username</strong>: <span key={user.id}>{user.login}</span></p>
                      <a href="#" onClick={this.showDetail.bind(this)}><img className="userInfo__more-info" src="https://d30y9cdsu7xlg0.cloudfront.net/noun-svg/176430.svg?Expires=1462831062&Signature=lvDysYCZphZmD2tXWtUmFXgh3u1vNjRjSQP~9nRjtJpvUKjPDph1JDbD2WGVZnjqh~Wtt8UyjZl~uqY3cx3FZllTkD~X~1Y1-971p48jGhAqeeMFEpMM5LRVnIL4hft9vRXLEeXGNBQzb3Rxz4M4z98nppNBd88Rgs2sRJg7Rpo_&Key-Pair-Id=APKAI5ZVHAXN65CHVU2Q" /></a>
                    </div>
                  </div>
              )
            })
          }
        </div>
      );
  }
}

export default UserList;
