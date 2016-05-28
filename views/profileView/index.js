import React from 'react';
import LeftSection from './leftSection.js';
import CenterSection from './centerSection.js';
import RightSection from './rightSection.js';

export default class ProfileView extends React.Component {

  render () {
    return (
      <main className="profile-container">
        <section className="col-md-4 profile-left-section">
          <LeftSection profileInfo={this.props.currentProfile} />
        </section>
        <section className="col-md-4 profile-center-section">
          <h5>Followers</h5>
          <CenterSection 
            handleClick = {this.props.handleClick}
            currentProfileFollowers={this.props.currentProfileFollowers} />
        </section>
        <section className="col-md-4 profile-right-section">
          <h5>Repos</h5>
          <RightSection currentProfileRepos={this.props.currentProfileRepos}/>
        </section>
      </main>
    );
  }

};