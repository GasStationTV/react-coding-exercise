import { CALL_API, Schemas } from '../utils';

/**
 * [SEARCH_REQUEST description]
 * @type {String}
 */
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

function searchUsers(query) {
  return {
    [CALL_API]: {
      types: [ SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE ],
      endpoint: `search/users?q=${query}`,
      schema: Schemas.RESULTS_LIST
    }
  }
}

export function loadSearchResults(query, requiredFields = []) {
  return (dispatch) => dispatch(searchUsers(query));
}

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

function getUserData(login) {
  return {
    [CALL_API]: {
      types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      endpoint: `users/${login}`,
      schema: Schemas.USER_DETAILS
    }
  }
}

export function loadUserDetails(login, requiredFields = []) {
  return (dispatch) => dispatch(getUserData(login));
}

export const FOLLOWERS_REQUEST = 'FOLLOWERS_REQUEST';
export const FOLLOWERS_SUCCESS = 'FOLLOWERS_SUCCESS';
export const FOLLOWERS_FAILURE = 'FOLLOWERS_FAILURE';

function getFollowers(login) {
  return {
    [CALL_API]: {
      types: [ FOLLOWERS_REQUEST, FOLLOWERS_SUCCESS, FOLLOWERS_FAILURE ],
      endpoint: `users/${login}/followers`,
      schema: Schemas.FOLLOWERS_LIST
    }
  }
}

export function loadFollowers(login, requiredFields = []) {
  return (dispatch) => dispatch(getFollowers(login));
}

export const REPOS_REQUEST = 'REPOS_REQUEST';
export const REPOS_SUCCESS = 'REPOS_SUCCESS';
export const REPOS_FAILURE = 'REPOS_FAILURE';

function getRepos(login) {
  return {
    [CALL_API]: {
      types: [ REPOS_REQUEST, REPOS_SUCCESS, REPOS_FAILURE ],
      endpoint: `users/${login}/repos`,
      schema: Schemas.REPOS_LIST
    }
  }
}

export function loadRepos(login, requiredFields = []) {
  return (dispatch) => dispatch(getRepos(login));
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}
