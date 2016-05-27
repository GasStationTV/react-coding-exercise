import React from 'react';
import LeftSection from './leftSection.js';

export default class ProfileView extends React.Component {

  render () {
    return (
      <main className="profile-container">
        <section className="col-md-4">
          <LeftSection />
        </section>
        <section className="col-md-4 profile-center-section">
          center section
        </section>
        <section className="col-md-4 profile-right-section">
          right section
        </section>
      </main>
    );
  }

}