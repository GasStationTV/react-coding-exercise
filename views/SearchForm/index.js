import React from 'react';

class SearchForm extends React.Component {
  constructor() {
    super();
  }
  formSubmit(e) {
    e.preventDefault(); //- stop the default function of form submitting
    this.props.findUser(this.refs.userSearchName.value);
    this.refs.userSearchName.value = '';
  }
  render() {
    return (
      <form onSubmit={this.formSubmit.bind(this)} className="searchForm">
        <input type="text" minLength="3" ref='userSearchName' className="searchForm__input" placeholder="Enter Name"/>
        <button className="btn btn-default searchForm__submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
