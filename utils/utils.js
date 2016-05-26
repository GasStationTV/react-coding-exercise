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

export function fetchData (query, partial, context) {
  const request_url = partial + query;
  fetch(request_url)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      context.setState({
        searchResults : responseData.items
      });
      console.log('state changed ', context.state);
    })
    .catch((err) => {
      console.log(err);
    })
};