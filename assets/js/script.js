//API Keys
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
var tubebUrl = 'https://www.googleapis.com/youtube/v3/videos';

// asignment variables
var btnSub = document.querySelector('#submit');
var btnSave = document.querySelector('#saveMovie');
var btnPage = document.querySelector('#watchPage');
var genreMenu = document.querySelector('.genre');
var movieTitleEl = document.querySelector('#movieTitle');
var sumBox = document.querySelector('#descrip');
var insertTrailer = document.querySelector('#movieTrailer');
var trailerEl = document.createElement('iframe');
var movieTitleSpan = document.createElement('h2');
var summarySpan = document.createElement('p');
var notFound = document.getElementById('notFound');
var showMovieEl = document.getElementById('showmovie');
var introEl = document.getElementById('instructions');

// event listener that will take user to their watched movies page
btnPage.addEventListener('click', function() {
    location.assign('watched.html');
});

// click event listener for when user submits criteria
btnSub.addEventListener('click', function() {

    userGenre();

});

// event listener that will save movies along with their info to local storage in an object form
btnSave.addEventListener('click', function() {

    //assingment variables
    var title = movieTitleSpan.textContent;
    var summary = summarySpan.textContent;
    var trailer = trailerEl.src;
    var rating = document.querySelector('input[name=userStar]:checked').value;
    var userDescript = document.querySelector('#userInput').value;

    var movieThings = {name: title,
        description: summary,
        trailerUrl: trailer,
        userRating: rating,
        notes: userDescript}

        var key = title;
        var value = JSON.stringify(movieThings);
        
        localStorage.setItem(key, value);
        
});

// hide instructions to get movie
function hideIntro(){
    
    notFound.style.display = 'none';
    
    introEl.style.display = 'none';
    
    showMovieEl.style.display = 'block';

    
};

// gets the user selected genre and adds it to the updated url
function userGenre () {
    var genId = genreMenu.options[genreMenu.selectedIndex].value;
    if (genId === null) {
        var updatedtmUrl = tmdbUrl
        userRate(updatedtmUrl);
    }
    else {
        var genre = '&with_genres=' + genId;
        var updatedtmUrl = tmdbUrl + genre;
        userRate(updatedtmUrl);
        
    }
};

// gets the user selected rating and adds it to the updated url
function userRate(updatedtmUrl) {
    var rates = document.querySelectorAll('input[name=star]');
    var counter = 0;
    for (const rate of rates) {
        if (rate.checked) {
            var valueRate = rate.value;
            var vote = '&vote_average.gte=' + valueRate;
            updatedtmUrl = updatedtmUrl + vote;
            tmDirectorSearch(updatedtmUrl);
            counter ++;
            break;
        }
    }
    if (counter === 0) {
        updatedtmUrl = updatedtmUrl;
        tmDirectorSearch(updatedtmUrl);
    }
};

// gets the user selected director and adds it to the updated url
function tmDirectorSearch (updatedtmUrl) {

    var director = document.querySelector('[name="director"]').value;
    console.log(director)

    if (director) {

        var directorSearch = 'https://api.themoviedb.org/3/search/person?api_key=efcca3762e356b7b95982ec994db2fbc&language=en-US&'
        console.log('---------' + director);
        director = (director.replace(/\s/g ,"%20"));
        var directorQuery = 'query=' + director;
        var directorUrl = directorSearch + directorQuery + '&page=1';
        
        fetch(directorUrl)
            .then(function (response) {

                if (response.ok) {

                    console.log('-----'+ response.url);

                    response.json()

                    .then(function(direct) {
                        var directorId = direct.results[0].id
                        console.log(directorId);

                        var directID = '&with_people=' + directorId;

                        updatedtmUrl = updatedtmUrl + directID;
                        tmActorSearch(updatedtmUrl);
                    });
                   
                }; 
            })
    }
    else {
        updatedtmUrl = updatedtmUrl;
        tmActorSearch(updatedtmUrl);
    }
}

// gets the user selected actor and adds it to the updated url
function tmActorSearch(updatedtmUrl) {

    var actor = document.querySelector('[name="searchactor"]').value;

    if (actor) {

        var actorSearch = 'https://api.themoviedb.org/3/search/person?api_key=efcca3762e356b7b95982ec994db2fbc&language=en-US&'
        console.log('---------' + actor);
        actor = (actor.replace(/\s/g ,"%20"));
        var actorQuery = 'query=' + actor;
        console.log(actor);
        var actorUrl = actorSearch + actorQuery + '&page=1';
    
        fetch(actorUrl)
            .then(function (response) {
            
                if (response.ok) {
                
                    response.json()

                    .then(function(act) {
                        var actorId = act.results[0].id
                        console.log(actorId);

                        var act = '&with_people=' + actorId;
                        updatedtmUrl = updatedtmUrl + act;
                        tmMovieSearch(updatedtmUrl);
                    }); 
                }
            })
    }

    else {
        updatedtmUrl = updatedtmUrl;
        tmMovieSearch(updatedtmUrl);
    }
};

// fetch function for the movie data base.
function tmMovieSearch(updatedtmUrl) {
    console.log(updatedtmUrl)
    
    fetch(updatedtmUrl)
        .then(function (response) {
            response.json()
            .then(function(returnJson) {

                console.log(returnJson.results.length);
                if (returnJson.results.length !== 0) {
                    hideIntro();
                    randomMovie(returnJson);
                }
                else {
                    noMovie();
                }
                
            })

        }) 
};

function noMovie() {
    introEl.style.display = 'none';
    notFound.style.display = 'block';
    showMovieEl.style.display = 'none';

}

// Function to choose random movie 
function randomMovie(returnJson){
    var index = Math.floor(Math.random() * returnJson.results.length);
    console.log(returnJson.results[index])

    var movieOption = returnJson.results[index]

    insertMovieInfo(movieOption);
};

/// First step of using MovieID to get  Youtube ID for trailer
function tmTrailerSearch(searchMovie, posterPath) {
    console.log(posterPath);
    //Clears Poster Img 
    insertTrailer.innerHTML= '';
    
    var plugInUrl = 'https://api.themoviedb.org/3/movie/' + searchMovie + '/videos?api_key=efcca3762e356b7b95982ec994db2fbc&language=en-US';
    var searchTrailerUrl = plugInUrl;
    console.log(searchTrailerUrl)
    
    fetch(searchTrailerUrl)
        .then(function (response) {

            if (response.ok) {
                response.json()
                .then(function(data) {
                console.log(data);
                // Checks to see if there is a movie Trailer available
                //If not grabs movie poster path
                console.log(data.results.length)
                
                if(data.results.length < 1){
                    setPoster(posterPath)
                    console.log(posterPath);
                    console.log('-----Search FOR POSTER----')
                }else {
                    console.log('-----Found Trailer----')
                    youtubeTrailer(data);
                }
            });
            }
        })
};
// Display's movie Poster
function setPoster(posterPath){
    console.log(posterPath);
    var posterEl = document.createElement('img');
    var posterUrl = 'https://image.tmdb.org/t/p/w342' + posterPath;
    
    console.log(posterUrl);

    posterEl.setAttribute('src', posterUrl)

    insertTrailer.appendChild(posterEl);
}
//  Uses Movie ID to get Youtube ID \\\\\\\\
function youtubeTrailer(data){

    var yourTrailer = data.results[0]
    console.log(yourTrailer)
    var searchIt = yourTrailer.key

    //setting parameters for youtube fetch request
    var options = {
        part: 'player',
        id: searchIt,
        key: tubeKeyChin
    }

    loadVid(options);

};

// makes a fetch request to youtube api
function loadVid(options) {

    $.getJSON(tubebUrl, options, function(trailer) {
        parseTrailer(trailer);
    })

};

function parseTrailer(trailer) {

    var vid = trailer.items[0].player.embedHtml
    var vidSplit = vid.split('//')
    var vidSplitAgain = vidSplit[1].split(' ')[0];
    var newVid = vidSplitAgain.substring(0, vidSplitAgain.length - 1);
    var newVidHTTP = 'https://' + newVid;
    insertMovieTrailer(newVidHTTP);

};

// Adds Movie title and description to designated area
function insertMovieInfo(movieOption, posterPath){

    movieTitleSpan.textContent = movieOption.title;
    movieTitleEl.appendChild(movieTitleSpan);

    summarySpan.textContent = movieOption.overview;
    sumBox.appendChild(summarySpan);

    var searchMovie = movieOption.id;
    var posterPath = movieOption.poster_path;
    console.log(posterPath);
    tmTrailerSearch(searchMovie, posterPath)
};

// inserts the movie trailer
function insertMovieTrailer(newVidHTTP) {
    
    trailerEl.setAttribute('src', newVidHTTP);
    insertTrailer.appendChild(trailerEl);

};

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
