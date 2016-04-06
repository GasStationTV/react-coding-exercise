import {
  REQUEST_PROFILE,
  RECEIVE_PROFILE,
  REQUEST_SEARCH,
  RECEIVE_SEARCH,
  UPDATE_QUERY,
  DISABLE_INFINITE_SCROLL
 } from '../actions'

let counter = function counter(state = { count: 0, users: [], query: '' }, action) {
  let count = state.count
  let users = state.users
  let searchHeaders = state.searchHeaders
  let query = state.query
  let profile = state.profile
  let canInfiniteScroll = state.canInfiniteScroll;

  switch (action.type) {
    case REQUEST_PROFILE:
      return {
        loading: true,
        users: users,
        query: query,
        searchHeaders: searchHeaders,
        canInfiniteScroll: canInfiniteScroll
      };
    case RECEIVE_PROFILE:
      return {
        loading: false,
        profile: action.profile,
        users: users,
        searchHeaders: searchHeaders,
        query: query,
        canInfiniteScroll: canInfiniteScroll
      };
    case REQUEST_SEARCH:
      return {
        loading: true,
        users: users,
        searchHeaders: searchHeaders,
        query: action.query,
        profile: profile,        
        canInfiniteScroll: canInfiniteScroll
      };
    case RECEIVE_SEARCH:
      return {
        loading: false,
        users: action.data.users,
        searchHeaders: action.data.searchHeaders,
        query: query,
        profile: profile,
        canInfiniteScroll: true
      };
    case UPDATE_QUERY:
      return {
        loading: false,
        users: action.query.length < 3 ? [] : users,
        searchHeaders: searchHeaders,
        query: action.query,
        canInfiniteScroll: canInfiniteScroll
      };
    case DISABLE_INFINITE_SCROLL:
      return {
        loading: false,
        users: users,
        searchHeaders: searchHeaders,
        query: query,
        canInfiniteScroll: false
      };
    default:
      return state;
  }
};

export default counter
