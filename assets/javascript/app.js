const photoArray = ['assets/images/ivana-cajina-316246-unsplash.jpg', 'assets/images/elena-prokofyeva-17909-unsplash.jpg', 'assets/images/david-marcu-114194-unsplash.jpg', 'assets/images/julia-caesar-15080-unsplash.jpg',
  'assets/images/andrey-grinkevich-358756-unsplash.jpg', 'assets/images/aron-reacher-549695-unsplash.jpg', 'assets/images/ashley-rowe-5658-unsplash.jpg', 'assets/images/dan-aragon-387257-unsplash.jpg',
  'assets/images/hugues-de-buyer-mimeure-335733-unsplash.jpg', 'assets/images/irene-davila-45779-unsplash.jpg', 'assets/images/marko-blazevic-423709-unsplash.jpg', 'assets/images/testimage.jpg'];

function randomPhoto () {
  const index = Math.floor(Math.random() * photoArray.length);
  $('.headerimage').attr('src', photoArray[index]);
}

randomPhoto();

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

  const section = ['world', 'technology', 'sports', 'travel', 'food', 'automobiles', 'arts'];

  function displayModalTopicChoices() {
    $('#topic-buttons').empty();
    for (let k = 0; k < section.length; k++) {
      const pTopicChoice = $('<div>');
      const labelTopicChoice = $('<label>');
      const inputTopicChoice = $('<input type="checkbox" />');
      const textTopicChoice = $('<span>');
      inputTopicChoice.attr('data-section-value', section[k]);
      inputTopicChoice.attr('id', 'topicInput');
      pTopicChoice.append(labelTopicChoice);
      labelTopicChoice.append(inputTopicChoice);
      textTopicChoice.text(section[k]);
      labelTopicChoice.append(textTopicChoice);
      $('#topic-buttons').append(pTopicChoice);
    }
  }
  let userTopicArray = [];
  // select and initialize modal
  const elemModal = document.querySelector('.modal');
  const instanceModal = M.Modal.init(elemModal);
  // open modal using the customize button
  $('.modal-trigger').click(function(event) {
    event.preventDefault();
    instanceModal.open();
    displayModalTopicChoices();
  });
  const userTopicString = localStorage.getItem('userTopics');
  userTopicArray = userTopicString.split(',');
  const userTopicTitles = [];
  for (let t = 0; t < userTopicArray.length; t++) {
    userTopicTitles[t] = userTopicArray[t].charAt(0).toUpperCase() + userTopicArray[t].slice(1);
  }
  console.log(userTopicString);
  console.log(userTopicArray);
  console.log(userTopicTitles);
  // initialize collapsible
  // const elemCollapse = document.querySelector('.collapsible');
  // const instanceCollapse = M.Collapsible.init(elemCollapse);
  // $('.collapsible').collapsible();
  let topStoriesUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?';
  topStoriesUrl += $.param({
    'api-key': '11762ff764a447f59a19f692781b25d4',
  });
  $.ajax({
    url: topStoriesUrl,
    method: 'GET',
  }).done(function(result) {
    console.log(result);
    for (let m = 2; m < 5; m++) {
      const topStory = result.results[m];
      // console.log(topStory);
      // pull 3 top stories from nytime to put in carousel
      if (m === 2) {
        $('#story-one-img').attr('src', topStory.multimedia[4].url);
        $('#story-one-h3').text(topStory.title);
        $('story-one-p').text(topStory.abstract);
      } else if (m === 3) {
        $('#story-two-img').attr('src', topStory.multimedia[4].url);
        $('#story-two-h3').text(topStory.title);
        $('story-two-p').text(topStory.abstract);
      } else {
        $('#story-three-img').attr('src', topStory.multimedia[4].url);
        $('#story-three-h3').text(topStory.title);
        $('story-three-p').text(topStory.abstract);
      }
    }
  });
  // function to populate list of news articles on page
  function addToUserNewsList() {
    for (let j = 0; j < userTopicArray.length; j++) {
      const sectionValue = userTopicArray[j];
      const sectionTitleValue = userTopicTitles[j];
      // $(this).attr('data-section-value');
      // console.log("SectionValue: " + sectionValue);
      // // For collapsible feature... not currently working with dynamically generated classes
      // const newCategory = $('<li>');
      // const headerNewCategory = $('<div class="collapsible-header">');
      // headerNewCategory.text(sectionValue);
      // const bodyNewCategory = $('<div class="collapsible-body">');
      // bodyNewCategory.attr('id', sectionValue);
      // headerNewCategory.append(bodyNewCategory);
      // newCategory.append(headerNewCategory);
      // $('#article-dump').append(newCategory);
      // Create headers and news category divs
      const categoryDiv = $('<div class="category-div">');
      const newsCategoryHeading = $('<h4>');
      newsCategoryHeading.text(sectionTitleValue);
      categoryDiv.append(newsCategoryHeading);
      let newsUrl = `https://api.nytimes.com/svc/topstories/v2/${sectionValue}.json?`;
      newsUrl += $.param({
        'api-key': '11762ff764a447f59a19f692781b25d4',
      });
      $.ajax({
        url: newsUrl,
        method: 'GET',
      }).done(function(result) {
        console.log(result);
        // Creates all the page elements for articles
        for (let i = 0; i < 3; i++) {
          const currentArticle = result.results[i];
          console.log(currentArticle);
          const newArticle = $('<div class="article-div card blue-grey lighten-5">');
          const newArticleContent = $('<div class="card-content">');
          const linkElement = $('<a>');
          linkElement.attr('href', currentArticle.url);
          const image = $('<img class="article-image">');
          image.attr('src', currentArticle.multimedia[1].url);
          const headline = $('<h5 class="card-title">');
          headline.text(currentArticle.title);
          const abstract = $('<p>');
          if (currentArticle.abstract === undefined) {
            abstract.text('Unknown');
          } else {
            abstract.text(currentArticle.abstract);
          }
          // linkElement.append(image, headline, abstract);
          linkElement.append(headline);
          newArticle.append(linkElement);
          newArticleContent.append(image, abstract);
          newArticle.append(newArticleContent);
          categoryDiv.append(newArticle);
          $('#article-dump').append(categoryDiv);
          // bodyNewCategory.append(newArticle);
        }
      })
        .fail(function(err) {
          throw err;
        });
    }
    // store data to local storage when the modal-close button is pressed
    // refresh articles on page
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
      // re-display news articles with updated topics
      $('#article-dump').empty();
      addToUserNewsList();
    });
    // $('.collapsible').collapsible();
    // console.log(url);
  }
  addToUserNewsList();
});
