
Top of the morning

Is a weather and news application that gives you up to date information specific to your location.  The application also provides a daily inspirtional quote with a relaxing background image.

Why we chose this project:
Website to visit in the morning to get customized news topics and local weather
A pleasant image with a motivational quote to start the day right!

API Reference:
Underground weather Link: https://www.wunderground.com/weather/api/
Nytimes Link: https://developer.nytimes.com/


Code Example:
function loadCarosel(){
  let topStoriesUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?';
  topStoriesUrl += $.param({
    'api-key': 'enter specific api key',
  });
  $.ajax({
    url: topStoriesUrl,
    method: 'GET',
  }).done(function(result)

Contributors:
Becky Afzali
Bill Carver
Mary Quint
Kevin Widmer

License:
MIT

Website:
https://klwidmer.github.io/GroupProjectOne/
