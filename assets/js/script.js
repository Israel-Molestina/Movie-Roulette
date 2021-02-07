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
var btnSave = document.querySelector('#saveMovie');
var btnPage = document.querySelector('#watchPage');
var genreMenu = document.querySelector('.genre');
var movieTitleEl = document.querySelector('#movieTitle');
var sumBox = document.querySelector('#descrip');


// event listener that will take user to their watched movies page
btnPage.addEventListener('click', function() {
    location.assign('watched.html');
});



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

// event listener that will save movies along with their info to local storage in an object form
btnSave.addEventListener('click', function() {
    console.log($(this));
    var title = $(this)[0].ownerDocument.body.children[0].firstElementChild.nextElementSibling.lastElementChild.children[0].children[0].firstChild.innerHTML;
    var summary = sumBox.textContent;
    var movieThings = {name: title,
                        description: summary}
    var key = title;
    var value = JSON.stringify(movieThings);

    localStorage.setItem(key, value);

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
                console.log(returnJson);
                randomMovie(returnJson);
                
            });
            
            }
            
            // gonna put an else statment here if response is for some reason invalid
        })
        
}
// Function to choose random movie 
function randomMovie(returnJson){
    var index = Math.floor(Math.random() * returnJson.results.length);
    console.log(index);
    console.log(returnJson.results[index])

    var movieOption = returnJson.results[index]

    movieTitle(movieOption);
}
var searchMovie
// Adds Movie title and description to designated area
function movieTitle(movieOption){
    var movieTitleSpan = document.createElement('h2');
    var summarySpan = document.createElement('p');

    if((movieTitleEl.innerHTML) & (sumBox.innerHTML) === ""){
    movieTitleSpan.textContent = movieOption.title;
    movieTitleEl.appendChild(movieTitleSpan);

    summarySpan.textContent = movieOption.overview;
    sumBox.appendChild(summarySpan);}
    else {
        movieTitleEl.innerHTML = ""
        sumBox.innerHTML = ""
        
    movieTitleSpan.textContent = movieOption.title;
    movieTitleEl.appendChild(movieTitleSpan);

    summarySpan.textContent = movieOption.overview;
    sumBox.appendChild(summarySpan);
    }
    searchMovie = movieOption.id;
    tmTrailerSearch(searchMovie)
}
/// First step of using MovieID to get  Youtube ID for trailer
function tmTrailerSearch(searchMovie) {
    var plugInUrl = 'https://api.themoviedb.org/3/movie/' + searchMovie + '/videos?api_key=efcca3762e356b7b95982ec994db2fbc&language=en-US';
    var searchTrailerUrl = plugInUrl;
    console.log(searchTrailerUrl)
    
    fetch(searchTrailerUrl)
        .then(function (response) {

            if (response.ok) {
                response.json()
                .then(function(data) {
                console.log(data);
                
                // youtubeTrailer(data)
            });
            
            }
            
            
        })
        
}

////  Uses Movie ID to get Youtube ID \\\\\\\\
// function youtubeTrailer(data){
//     index = 0;
//     console.log(index)
//     var yourTrailer = data.results[0]
    
//     var searchIt = yourTrailer.key
//     console.log(yourTrailer);
//     console.log(searchIt);

// //setting parameters for youtube fetch request
// var chanId = 'UCi8e0iOVk1fEOogdfu4YgfA';
// var options = {
//     part: 'snippet',
//     key: tubeKeyChin,
//     maxResults: '1',
//     type: 'video',
//     channelId: chanId,
//     q: searchIt
// }

// loadVid();
// furns youtube fetch request
// loadVid(options)

// }
/* function loadVid(options) {

    $.getJSON(tuebUrl, options, function(trailer) {
        console.log(trailer)
        var vidId = trailer.items[0].id.videoId 
        var vid = 'https://www.youtube.com/embed/'+vidId
        console.log(vid);
    })
};  */

// ombd fetch request for extra info on movie
// function omMovieSearch() {
//     var movieName = 'blade'
//     var updatedomdbUrl = omdbUrl + movieName;

//     fetch(updatedomdbUrl)
//         .then(function (response) {

//             if (response.ok) {
//                 response.json()
//                 .then(function(returnJson) {
//                 console.log(returnJson);
//                 })
//             }
//         })
// };

// //calls the ombd fetch function
// omMovieSearch();