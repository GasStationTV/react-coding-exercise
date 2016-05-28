
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
        searchResults : responseData.items
      });
      console.log('state changed ', context.state);
    })
    .catch((err) => {
      console.log(err);
    })
};

export function fetchUserData (query, context) {
  const request_url = 'https://api.github.com/users/' + query;
  console.log(request_url);
  fetch(request_url)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      context.setState({
        currentFocus : responseData
      });
      console.log('state changed ', context.state.currentFocus);
      fetchUserFollowersRepos(context.state.currentFocus.repos_url, context, 'repos');
      fetchUserFollowersRepos(context.state.currentFocus.followers_url, context, 'followers');
    })
    .catch((err) => {
      console.log(err);
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
      console.log('state changed', context.state);
    })
    .catch((err) => {
      console.log(err);
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
  // console.log(formattedDate)  

  return formattedDate;
};