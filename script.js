

const apiKey = 'yrvZzbilpP8UzCcqQEgUZC3fxE74YrL5YvBtg0nf'; 
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the array
    for (let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
        `<li><h3><a href='${responseJson.data[i].url}'>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  };

function getParks(query, maxResults=10) {
    const params = {
      q: query,
      api_key: apiKey,
      maxResults
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
  
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
        console.log(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
        console.log(err.message);
      });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getParks(searchTerm, maxResults);
    });
}

$(watchForm);