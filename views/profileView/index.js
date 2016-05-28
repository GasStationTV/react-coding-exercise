import React from 'react';
import LeftSection from './leftSection.js';
import CenterSection from './centerSection.js';
import RightSection from './rightSection.js';

export default class ProfileView extends React.Component {

  render () {
    return (
      <main className="profile-container">
        <section className="col-md-4 profile-left-section">
          <LeftSection profileInfo={this.props.currentProfile}/>
        </section>
        <section className="col-md-4 profile-center-section">
          followers
          <CenterSection />
        </section>
        <section className="col-md-4 profile-right-section">
          repos
          <RightSection />
        </section>
      </main>
    );
  }

};