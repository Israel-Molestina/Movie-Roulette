// API Keys
// key for the moive database
var tmKey = 'api_key=efcca3762e356b7b95982ec994db2fbc';
// OMDB key
var omKey = '49cd7bff'
// youtube Key
var tubeKeyIz = 'AIzaSyBE2H7aDx23tFRGKkNlWiX6UiVKdPVdNmA';
var tubeKeyChin = 'AIzaSyAhxYQ0nbhFnVq9GPLuKCjXb_ny5G3XsnM';

// URLs
// TMBD url
var tmdbUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=efcca3762e356b7b95982ec994db2fbc&language=en-US';
// OMDB url
var omdbUrl = 'https://www.omdbapi.com/?apikey=49cd7bff&t=';
// youtube url
var tuebUrl = 'https://www.googleapis.com/youtube/v3/search';

// asignment variables
var btnSub = document.querySelector('#submit');
var genreMenu = document.querySelector('.genre');

// click event listener for when user submits criteria
btnSub.addEventListener('click', function() {

    // grabs the users selected genre and rating and passes it to the fetch function
    var genId = genreMenu.options[genreMenu.selectedIndex].value;
    console.log(genId);

    var rate = document.querySelector('input[type=radio]:checked').value;
    console.log(rate);

    // object that holds the movie criteria
    var object =
    {genre: genId,
     rating: rate}
        
    tmMovieSearch(object);

});

// fetch function for the movie data base.
function tmMovieSearch(object) {
    
    var genre = '&with_genres=' + object.genre
    var vote = '&vote_average.gte=' + object.rating
    var updatedtmUrl = tmdbUrl + genre + vote;
    console.log(updatedtmUrl)
    
    fetch(updatedtmUrl)
        .then(function (response) {

            if (response.ok) {
                response.json()
                .then(function(returnJson) {
                console.log(returnJson)
                });
            }
            // gonna put an else statment here if response is for some reason invalid
        })
}

// ombd fetch request for extra info on movie
function omMovieSearch() {
    var movieName = 'blade'
    var updatedomdbUrl = omdbUrl + movieName;

    fetch(updatedomdbUrl)
        .then(function (response) {

            if (response.ok) {
                response.json()
                .then(function(returnJson) {
                console.log(returnJson);
                })
            }
        })
};

//calls the ombd fetch function
omMovieSearch();


//setting parameters for youtube fetch request
var chanId = 'UCi8e0iOVk1fEOogdfu4YgfA';
var options = {
    part: 'snippet',
    key: tubeKeyChin,
    maxResults: '1',
    type: 'video',
    channelId: chanId,
    q: 'cat'
};

// loadVid();
// furns youtube fetch request
function loadVid() {

    $.getJSON(tuebUrl, options, function(trailer) {
        console.log(trailer)
        var vidId = trailer.items[0].id.videoId 
        var vid = 'https://www.youtube.com/embed/'+vidId
        console.log(vid);
    })
};