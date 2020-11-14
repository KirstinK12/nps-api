'use strict';

  const apiKey = '6J4KdQJSqiPjkMp3NPUh9Ceoku0UQORn07JTQrK'

  const searchUrl = 'https://api.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    
    $('.js-error').empty();
    $('.results-list').empty();
  
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].directionsUrl}">Directions to Park</a></p>
        </li>`);
    }
    $('.results').removeClass('hidden');
}

function getParks(searchUrl, stateArr, maxResults, apiKey) {
   
    const params = {
        stateCode: stateArr,
        limit: maxResults
    }
   
    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);
   
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('.js-error').text(`Something went wrong: ${err.message}`);
    });
}


function watchForm() {
    $('.js-form').on('submit', function() {
        event.preventDefault();
        const stateArr = $('.js-state-entered').val().split(",");
        const maxResults = $('.js-result-amt').val();
        

        getParks(searchUrl, stateArr, maxResults, apiKey);
    })
}

$(watchForm);