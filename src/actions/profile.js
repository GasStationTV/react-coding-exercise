import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router'
let q = require('q');

import { store } from '../../views/rootview'

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const INCREMENT = 'INCREMENT';
export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';

export function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers());
    return fetch(`https://api.github.com/users`)
      .then(response => response.json())
      .then(users => dispatch(receiveUsers(users)));
  };
}

export function increment() {
  return {
    type: 'increase'
  };
}

export function loadProfile(userName) {
  return dispatch => {
    let profile;
    store.dispatch(requestProfile());
    fetch(`https://api.github.com/users/${userName}`)
      .then(response => response.json())
      .then(response => {
        profile = response;
        return fetch(profile.repos_url)
      })
      .then(response => response.json())
      .then(repos => {
        profile.repos_fetched = repos;
      })
      .then(response => {
        return fetch(profile.followers_url)
      })
      .then(response => response.json())
      .then(followers => {
        profile.followers_fetched = followers;
        store.dispatch(receiveProfile(profile))
      })
      .then(() => browserHistory.push(`/detail/${userName}`));
  };
}

function requestProfile() {
  return {
    type: REQUEST_PROFILE
  };
}

function receiveProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    profile: profile
  };
}

function requestUsers() {
  return {
    type: REQUEST_PROFILE
  };
}

function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users: users
  };
}
