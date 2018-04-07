const photoArray = ['assets/images/ivana-cajina-316246-unsplash.jpg', 'assets/images/elena-prokofyeva-17909-unsplash.jpg', 'assets/images/david-marcu-114194-unsplash.jpg', 'assets/images/julia-caesar-15080-unsplash.jpg',
  'assets/images/andrey-grinkevich-358756-unsplash.jpg', 'assets/images/aron-reacher-549695-unsplash.jpg', 'assets/images/ashley-rowe-5658-unsplash.jpg', 'assets/images/dan-aragon-387257-unsplash.jpg',
  'assets/images/hugues-de-buyer-mimeure-335733-unsplash.jpg', 'assets/images/irene-davila-45779-unsplash.jpg', 'assets/images/marko-blazevic-423709-unsplash.jpg', 'assets/images/testimage.jpg'];
  const section = ['world', 'technology', 'sports', 'travel', 'food', 'automobiles', 'arts'];
  var userTopicArray = [];
  var userTopicTitles = [];
function randomPhoto () {
  const index = Math.floor(Math.random() * photoArray.length);
  $('.headerimage').attr('src', photoArray[index]);
}

function setWeather() {
  if  (localStorage.getItem('zip') === null) {
    zipCode = "55120";
    localStorage.setItem('zip', zipCode);
    weatherMaker();
  }
  else (localStorage.getItem('zip') !== null);  {
    zipCode = localStorage.getItem('zip');
    weatherMaker();
  }
}
function weatherMaker(){
  const weatherKey = '97be962b96e69fba';
  const weatherUrl = `https://api.wunderground.com/api/${weatherKey}/conditions/q/${zipCode}.json`;
  $.ajax({
    url: weatherUrl,
    dataType: 'jsonp',
    method: 'GET',
  }).then(function(response) {
    // console.log(response);
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
    $("#weatherIcon").empty();
    $('#weatherIcon').append(weatherIcon, bigTemp, conditionSentence, windSentence, precipSentence);
    $('#weatherURL').attr('href', weatherURL);
  });
}
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

function displayQuote(){
  const QuoteUrl = 'https://favqs.com/api/qotd';
  $.ajax({
    url: QuoteUrl,
    method: 'GET',
  }).then(function(result) {
    // console.log(result.quote.body);
    $('#quote').text(result.quote.body);
  });
}
function addToUserNewsList() {
  // localStorage
  const userTopicString = localStorage.getItem('userTopics');
  userTopicArray = userTopicString.split(',');
  const userTopicTitles = [];
  for (let t = 0; t < userTopicArray.length; t++) {
    userTopicTitles[t] = userTopicArray[t].charAt(0).toUpperCase() + userTopicArray[t].slice(1);
  }
  console.log(userTopicString);
  console.log(userTopicArray);
  console.log(userTopicTitles);
  $('#article-dump').empty()
  
  for (let j = 0; j < userTopicArray.length; j++) {
    const sectionValue = userTopicArray[j];
    const sectionTitleValue = userTopicTitles[j];
    // Create headers and news category divs
    const categoryDiv = $('<div class="category-div">');
    const newsCategoryHeading = $('<h4>').text(sectionTitleValue);
    const collapsibleCategoryDiv = $(`<div id=${sectionTitleValue} class="collapsible-div">`)
    categoryDiv.append(newsCategoryHeading, collapsibleCategoryDiv);

    let newsUrl = `https://api.nytimes.com/svc/topstories/v2/${sectionValue}.json?`;
    newsUrl += $.param({
      'api-key': '11762ff764a447f59a19f692781b25d4',
    });
    
    $.ajax({
      url: newsUrl,
      method: 'GET',
    }).done(function(result) {
      // console.log(result);
      // Creates all the page elements for articles
      
      for (let i = 0; i < 3; i++) {
        const currentArticle = result.results[i];
        // console.log(currentArticle);
        const newArticleCard = $('<div class="article-div card blue-grey lighten-5">');
        const newArticleCardContent = $('<div class="card-content">');
        const linkElement = $('<a>');
        linkElement.attr('href', currentArticle.url);
        const image = $('<img class="article-image">');
        image.attr('src', currentArticle.multimedia[1].url);
        const headline = $('<h5 class="card-title">').text(currentArticle.title);
        const abstract = $('<p>');
        if (currentArticle.abstract === undefined) {
          abstract.text('Unknown');
        } else {
          abstract.text(currentArticle.abstract);
        }
        // linkElement.append(image, headline, abstract);
        linkElement.append(headline);
        //new 
        newArticleCardContent.append(image, abstract);
        newArticleCard.append(linkElement, newArticleCardContent);

        collapsibleCategoryDiv.append(newArticleCard)
        categoryDiv.append(collapsibleCategoryDiv);
        $('#article-dump').append(categoryDiv);
        collapsibleCategoryDiv.hide()
      }
    })
      .fail(function(err) {
        throw err;
      });
  }


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
    $('#article-dump').empty();
    // $("#weatherIcon").empty();
    weatherMaker();
    addToUserNewsList();

  });

}

function modalFunctionality(){
  
  userTopicArray = [];
  // select and initialize modal
  const elemModal = document.querySelector('.modal');
  const instanceModal = M.Modal.init(elemModal);
  
  $('.modal-trigger').click(function(event) {
    event.preventDefault();
    instanceModal.open();
    displayModalTopicChoices();
  });
}
  
 

function loadCarosel(){
  let topStoriesUrl = 'https://api.nytimes.com/svc/topstories/v2/home.json?';
  topStoriesUrl += $.param({
    'api-key': '11762ff764a447f59a19f692781b25d4',
  });
  $.ajax({
    url: topStoriesUrl,
    method: 'GET',
  }).done(function(result) {
    // console.log(result);
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

}
function setNews() {
  console.log("IF");
  if (localStorage.getItem('userTopics') === null) {
    userTopicString = "food";
    localStorage.setItem('userTopics', userTopicString);
    addToUserNewsList();
  }
  else if (localStorage.getItem('userTopics') !== null) {
    console.log("else");
    userTopicString = localStorage.getItem('userTopics');
    addToUserNewsList();
    }
  }
  

$('document').ready(function() {
    setNews();
    modalFunctionality();
    randomPhoto();
    setWeather();
    displayQuote();
    displayModalTopicChoices();
    loadCarosel()
    // addToUserNewsList();
  });


$("#article-dump").on("click", "h4", function(){
  // $(".collapsible-div").hide()
  var articleSectionId = $(this).text()
  console.log(articleSectionId)
  $("#" + articleSectionId).toggle()

})

$("#article-dump").on("mouseenter", "h4", function(){
  // $(".collapsible-div").hide()
  $(this).animate({opacity: .5}, 0);

})

$("#article-dump").on("mouseleave", "h4", function(){
  $(this).animate({opacity: 1.0}, 0);
})