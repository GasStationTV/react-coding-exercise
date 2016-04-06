import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router'

import { store } from '../../views/rootview'

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const NEXT_PAGE = 'NEXT_PAGE';
export const DISABLE_INFINITE_SCROLL = 'DISABLE_INFINITE_SCROLL';

export function search(query) {
  let searchHeaders;

  if (query.length >= 3) {
    return dispatch => {
      store.dispatch(requestSearch(query));
      return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(response => {
          searchHeaders = response.headers;
          return response.json()
        })
        .then(response => {
          store.dispatch(
            receiveSearch({
              users: response.items,
              searchHeaders: searchHeaders
            })
          );
          checkToDisableInfiniteScroll(response);
        })
        .then(() => {
          browserHistory.push('/');
        });
    };
  } else {
    return dispatch => {
      store.dispatch(updateQuery(query));
    };
  }
}

export function nextPage() {
  console.log('next page');
  let state = store.getState();
  let nextData = state.searchHeaders.get('link')
  let next = /<(.*?)>/.exec(nextData)[1];
  let searchHeaders;

  return dispatch => {
    store.dispatch(requestSearch(state.query));
    return fetch(next)
      .then(response => {
        searchHeaders = response.headers;
        return response.json();
      })
      .then(response => {
        store.dispatch(
          receiveSearch({
            users: state.users.concat(response.items),
            searchHeaders: searchHeaders
          })
        );
        checkToDisableInfiniteScroll(response);
      })
  }
}

export const updateQuery = function updateQuery(query) {
  return {
    type: UPDATE_QUERY,
    query: query
  };
};

function checkToDisableInfiniteScroll(response) {
  let state = store.getState();

  if (state.users.length === response.total_count) {
    store.dispatch(disableInfiniteScroll())
  }
}

function disableInfiniteScroll() {
  return {
    type: DISABLE_INFINITE_SCROLL
  };
}

function requestSearch(query) {
  return {
    type: REQUEST_SEARCH,
    query: query
  };
}

function receiveSearch(data) {
  return {
    type: RECEIVE_SEARCH,
    data: data
  };
}
