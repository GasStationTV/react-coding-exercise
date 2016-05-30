export function debounce (func, wait, immediate) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

export function fetchData (query, context) {
  const request_url = 'https://api.github.com/search/users?q=' + query;
  fetch(request_url)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      context.setState({
        searchResults : responseData.items,
        dirtySearch : true
      });
    })
    .catch((err) => {
      throw new Error(err);
    })
};

export function fetchUserData (query, context) {
  const request_url = 'https://api.github.com/users/' + query;
  fetch(request_url)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      context.setState({
        currentFocus : responseData
      });
      fetchUserFollowersRepos(context.state.currentFocus.repos_url, context, 'repos');
      fetchUserFollowersRepos(context.state.currentFocus.followers_url, context, 'followers');
    })
    .catch((err) => {
      throw new Error(err);
    })
};

const fetchUserFollowersRepos = (query, context, update) => {
  fetch(query)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      if (update === 'repos') {
        context.setState({
          currentFocusRepos : responseData
        });
      } if (update === 'followers') {
        context.setState({
          currentFocusFollowers : responseData
        });
      }
    })
    .catch((err) => {
      throw new Error(err);
    })
};

export function stringifyDate (stringDate) {
  const months = {
    '01' : 'Jan',
    '02' : 'Feb',
    '03' : 'Mar',
    '04' : 'Apr',
    '05' : 'May',
    '06' : 'Jun',
    '07' : 'July',
    '08' : 'Aug',
    '09' : 'Sept',
    '10' : 'Oct',
    '11' : 'Nov',
    '12' : 'Dec'
  }

  let formattedDate = stringDate.substr(0, 10).split('-');
  formattedDate = months[formattedDate[1]]+' '+formattedDate[2]+' '+formattedDate[0]; 

  return formattedDate;
};