import axios from 'axios';
import store from 'store';

export function getUsers(query) {

    return axios.get(`https://api.github.com/search/users?q=${query}`).then(function(response) {

        store.dispatch({
            type: 'GET_USERS',
            users: response.data.items,
            didSearch: true
        })

        return response;

    }).catch(function(err) {
        console.error(err);
    });
}

export function getUser(userName) {

    return axios.get(`https://api.github.com/users/${userName}`).then(function(response) {

        store.dispatch({
            type: 'GET_USER',
            user: response.data
        })

        return response;

    }).catch(function(err) {
        console.error(err);
    });
}

export function getFollowers(userName) {

    return axios.get(`https://api.github.com/users/${userName}/followers`).then(function(response) {

        store.dispatch({
            type: 'GET_FOLLOWERS',
            followers: response.data
        })

        return response;

    }).catch(function(err) {
        console.error(err);
    });
}

export function getRepos(userName) {

    return axios.get(`https://api.github.com/users/${userName}/repos`).then(function(response) {

        store.dispatch({
            type: 'GET_REPOS',
            repos: response.data
        })

        return response;

    }).catch(function(err) {
        console.error(err);
    });
}

export function countInputChars(numChars) {

   return  store.dispatch({
            type: 'NUM_CHARS',
            numChars
        })
}
