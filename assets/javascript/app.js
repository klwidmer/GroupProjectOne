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

// Random quote API (need to replace b/c of 10 call/hour limit)
const quoteURL = 'http://quotes.rest/qod.json';

$.ajax({
  url: quoteURL,
  method: 'GET',
  cache: false,
}).then(function(response) {
  console.log(response);
});

// News API
