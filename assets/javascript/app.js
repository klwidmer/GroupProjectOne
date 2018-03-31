$('document').ready(function() {
// open weather app API info
  const zipCode = '55104';
  const queryURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=01189fd67504d20ce5fd075bdd8800ea`;

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).then(function(response) {
    console.log(response);
  });

  // wunderground API

  const zipCode2 = '55104';
  const weatherKey = '97be962b96e69fba';
  const weatherUrl = `http://api.wunderground.com/api/${weatherKey}/conditions/q/${zipCode2}.json`;

  $.ajax({
    url: weatherUrl,
    dataType: 'jsonp',
    method: 'GET',
  }).then(function(response) {
    console.log(response);
  });

  $.ajax({
    url: 'https://api.forismatic.com/api/1.0/',
    jsonp: 'jsonp',
    dataType: 'jsonp',
    data: {
      method: 'getQuote',
      lang: 'en',
      format: 'jsonp',
    },
  }).then(function(response) {
    console.log(response);
    $('#quote').html(response.quoteText);
    const authorPtag = $('<p id="author">');
    $('#quote').append(authorPtag);
    $('#author').html(response.quoteAuthor);
  });
});

