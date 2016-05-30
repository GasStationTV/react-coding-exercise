import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';

var reducers = combineReducers({
    userReducer: userReducer
});

var store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;