import React from 'react';

let people = [
  'egan',
  'mark',
  'alash'
];

export default class FishView extends React.Component {
  render () {

    let searchResults = people.map((person) => {
      return (
        <div>
          <h4>{person}</h4>
        </div>
      )
    });

    return (
      <div>
        {searchResults}
      </div>
    );
  }
}
