var userInitialState = {
    users: [],
    user: {},
    followers: [],
    repos: [],
    numChars: 0,
    didSearch: false
};

export default function(state = userInitialState, action) {
    switch(action.type) {
        case 'GET_USERS':
            var newState = Object.assign({}, state)
            newState.users = action.users;
            newState.didSearch = action.didSearch;
            return newState;
    	case 'GET_USER':
			var newState = Object.assign({}, state)
            newState.user = action.user;
            newState.user.created_at = new Date(action.user.created_at).toString();
    		return newState;
		case 'GET_FOLLOWERS':
			var newState = Object.assign({}, state)
            newState.followers = action.followers;
    		return newState;
		case 'GET_REPOS':
			var newState = Object.assign({}, state)
            newState.repos = action.repos;
    		return newState;
        case 'NUM_CHARS':
            var newState = Object.assign({}, state)
            newState.numChars = action.numChars;
            return newState;
        default:
            return state;
    }
}