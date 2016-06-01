import 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { Schema, arrayOf, normalize } from 'normalizr';

/**
 * [getNextPageUrl description]
 * @param  {[obj]} res [response header from apiCall()]
 * @return {[strin]}     [url for next set of data]
 */
function getNextPageUrl(res) {
  const link = res.headers.get('link');
  if (!link) {
    return null;
  }
  const nextLink = link.split(',').find(string => string.indexOf('rel="next"') > -1);

  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);

}

/**
 * [getLastPageUrl description]
 * @param  {[Object]} res [response header from apiCall()]
 * @return {[string]}     [url for last set of data]
 */
function getLastPageUrl(res) {
  const link = res.headers.get('link');

  if (!link) {
    return null;
  }
  const lastLink = link.split(',').find(string => string.indexOf('rel="last"') > -1);

  if (!lastLink) {
    return null;
  }

  return lastLink.split(';')[0].slice(1, -1);
}

/**
 * [BASE_URL description]
 * @type {String}
 */
const BASE_URL = 'https://api.github.com/';

/**
 * [callApi description]
 * @param  {[string]} endpoint [concat to BASE_URL to complete the url]
 * @param  {[type]} schema   [flattens the json for the store]
 * @return {[Object]}          [finalized data to be reduced]
 */
function callApi(endpoint, schema) {
  const URL = (endpoint.indexOf(BASE_URL) === -1 ? BASE_URL +  endpoint : endpoint);

  return fetch(URL)
    .then(res =>
      res.json().then(json => ({ json, res }))
    ).then(({ json, res }) => {
      if (!res.ok) {
        return Promise.reject(json);
      }

      const results = json.items ? json.items : json;
      const camelizedJson = camelizeKeys(results);
      const nextPageUrl = getNextPageUrl(res);
      const lastPageUrl = getLastPageUrl(res);

      return Object.assign({},
        normalize(camelizedJson, schema),
        { nextPageUrl },
        { lastPageUrl }
      );
    });
}

/**
 * [Schema configs for normalizing res.josn]
 */
const searchSchema = new Schema('users', { idAttribute: user => user.login });
const userSchema = new Schema('user', { idAttribute: user => user.login });
const followerSchema = new Schema('followers', {idAttribute: follower => follower.login});
const repoSchema = new Schema('repos', {idAttribute: repo => repo.name});
/**
 * [Schemas list of schemas]
 * @type {Object}
 */
export const Schemas = {
  RESULTS_LIST: arrayOf(searchSchema),
  USER_DETAILS: userSchema,
  FOLLOWERS_LIST: arrayOf(followerSchema),
  REPOS_LIST: arrayOf(repoSchema)
};

/**
 * [Symbol ActionType for middleware function]
 * @param {[type]} 'Call API' [description]
 */
export const CALL_API = Symbol('Call API');

/**
 * [store middleware for dispatching actions asynchronously]
 * @type {[type]}
 */
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Expected endpoint to be a string');
  }

  if (!schema) {
    throw new Error('Needs one of the the available Schemas.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Needs an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Action types need to be strings.');
  }

  function actionCreator(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionCreator({ type: requestType }));

  return callApi(endpoint, schema).then(
    response => next(actionCreator({
      response,
      type: successType
    })),
    error => next(actionCreator({
      type: failureType,
      error: error.message || 'Failure in callAPI.'
    }))
  )
}
