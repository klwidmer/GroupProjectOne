$('document').ready(function() {
  // wunderground API

  let zipCode = 55102;
  const weatherKey = '97be962b96e69fba';
  const weatherUrl = `http://api.wunderground.com/api/${weatherKey}/conditions/q/${zipCode}.json`;

  $.ajax({
    url: weatherUrl,
    dataType: 'jsonp',
    method: 'GET',
  }).then(function(response) {
    console.log(response);
    const weatherIcon = $('<img>').attr('src', response.current_observation.icon_url);
    weatherIcon.addClass('weather-image');
    const location = response.current_observation.display_location.full;
    const temperature = response.current_observation.temp_f;
    const condition = response.current_observation.weather;
    const wind = response.current_observation.wind_string;
    const precipitation = response.current_observation.precip_today_in;
    const weatherURL = response.current_observation.ob_url;
    const conditionSentence = $('<h6>').addClass('weather-overview');
    conditionSentence.text(`Currently ${condition} and ${temperature} degrees in ${location}`);
    const bigTemp = $('<h3>').text(temperature);
    bigTemp.addClass('currentTempBig');
    const windSentence = $('<p>').text(`Wind: ${wind}`);
    const precipSentence = $('<p>').text(`Precipitation: ${precipitation} in. expected today`);
    $('#weatherIcon').append(weatherIcon, bigTemp, conditionSentence, windSentence, precipSentence);
    $('#weatherURL').attr('href', weatherURL);
  });

  // quote API
  const QuoteUrl = 'https://favqs.com/api/qotd';
  $.ajax({
    url: QuoteUrl,
    method: 'GET',
  }).then(function(result) {
    console.log(result.quote.body);
    $('#quote').text(result.quote.body);
  });

  const section = ['Home', 'World', 'Technology', 'Sports', 'Travel', 'Food', 'Automobiles', 'Arts'];

  function displayModalTopicChoices() {
    $('#topic-buttons').empty();
    for (let i = 0; i < section.length; i++) {
      const pTopicChoice = $('<div>');
      const labelTopicChoice = $('<label>');
      const inputTopicChoice = $('<input type="checkbox" />');
      const textTopicChoice = $('<span>');

      inputTopicChoice.attr('data-section-value', section[i]);
      inputTopicChoice.attr('id', 'topicInput');
      pTopicChoice.append(labelTopicChoice);
      labelTopicChoice.append(inputTopicChoice);
      textTopicChoice.text(section[i]);
      labelTopicChoice.append(textTopicChoice);

      $('#topic-buttons').append(pTopicChoice);
  
  

    }
  }

  let userTopicArray = [];

  // select and initialize modal
  const elemModal = document.querySelector('.modal');
  const instanceModal = M.Modal.init(elemModal);

  // initialize collapsible
  const elemCollapse = document.querySelector('.collapsible');
  const instanceCollapse = M.Collapsible.init(elemCollapse);

  // open modal using the customize button
  $('.modal-trigger').click(function(event) {
    event.preventDefault();
    instanceModal.open();
    displayModalTopicChoices();
  });

  // store data to local storage when the modal-close button is pressed
  $('.modal-close').click(function(event) {
    event.preventDefault();
    // capture user inputs and store them to variables
    zipCode = $('#zip-code-input').val().trim();

    userTopicArray = $('input:checked').map(function() {
      return $(this).attr('data-section-value');
    });

    // console log to confirm we're capturing them
    console.log(zipCode);
    userTopicArray = userTopicArray.get();
    console.log(userTopicArray);

    // clear LocalStorage
    localStorage.clear();

    // store all content to LocalStorage
    localStorage.setItem('zip', zipCode);
    localStorage.setItem('userTopics', userTopicArray);
  });

  const userTopicString = localStorage.getItem('userTopics');
  userTopicArray = userTopicString.split(',');

  console.log(userTopicString);
  console.log(userTopicArray);


  // start Bill's code
  function addToUserNewsSettings() {
    for (let j = 0; j < userTopicArray.length; j++) {
      const sectionValue = userTopicArray[j];
      // $(this).attr('data-section-value');
      // console.log("SectionValue: " + sectionValue);

      let newsUrl = `https://api.nytimes.com/svc/topstories/v2/${sectionValue}.json?`;
      newsUrl += $.param({
        'api-key': '11762ff764a447f59a19f692781b25d4',
      });
      $.ajax({
        url: newsUrl,
        method: 'GET',
      }).done(function(result) {
        console.log(result);
        const numOfArticles = result.results.length;
        console.log(numOfArticles);
        // Creates all the page elements for articles
        for (let i = 0; i < 2; i++) {
          const currentArticle = result.results[i];
          console.log(currentArticle);
          const newArticle = $('<div>');
          newArticle.attr('class', 'article-div');
          const linkElement = $('<a>');
          linkElement.attr('href', currentArticle.url);
          const image = $('<img>');
          image.attr('src', currentArticle.multimedia[0].url);
          const headline = $('<h5>');
          headline.text(currentArticle.title);
          const abstract = $('<p>');
          if (currentArticle.abstract === undefined) {
            abstract.text('Unknown');
          } else {
            abstract.text(currentArticle.abstract);
          }
          linkElement.append(image, headline, abstract);
          newArticle.append(linkElement);
          $('#article-dump').append(newArticle);
        }
      })
        .fail(function(err) {
          throw err;
        });
    }

    // console.log(url);
  }
  addToUserNewsSettings();
});
