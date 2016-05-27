
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
    })
    .catch((err) => {
      console.log(err);
    })
  };