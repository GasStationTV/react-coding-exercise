import React from 'react';

export default React.createClass({      
    render(){
        return (
        <div>
          <h5>Repo List</h5>
          <ul className="ul--center">
          {this.props.repos.map(function(repo) {
            return (
                    <li><a href={repo.svn_url}>{repo.svn_url}</a></li>     
            );
          })}
          </ul>
        </div>
        )
    }
});