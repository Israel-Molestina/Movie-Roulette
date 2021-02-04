//API Key MovieDB efcca3762e356b7b95982ec994db2fbc
//Youtube API Key AIzaSyCENe0M7rpOxtAXyYNUbOuUQc_DMYZ_JU4

var tmKey = 'api_key=efcca3762e356b7b95982ec994db2fbc';

// OMDB url
var omdbUrl = 'http://www.omdbapi.com/?apikey=49cd7bff&t=';

// TMBD url
var tmdbUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=efcca3762e356b7b95982ec994db2fbc';


omMovieSearch();

tmMovieSearch();

// loadYoutube();
// executeYoutube();

function omMovieSearch() {
    var movieName = 'blade'
    var updatedomdbUrl = omdbUrl + movieName;

    fetch(updatedomdbUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(returnJson) {
            console.log(returnJson);
        })
};

function tmMovieSearch() {
    var updatedtmUrl = tmdbUrl + '&include_adult=true';

    fetch(updatedtmUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(returnJson) {
            console.log(returnJson)
        })

};



    var key = 'AIzaSyCENe0M7rpOxtAXyYNUbOuUQc_DMYZ_JU4';
    var chanId = 'UCi8e0iOVk1fEOogdfu4YgfA';
    var tuebUrl = 'https://www.googleapis.com/youtube/v3/search';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: '1',
        type: 'video',
        channelId: chanId,
        q: 'blade'
    }
    loadVid();

    function loadVid() {
        $.getJSON(tuebUrl, options, function(trailer) {
            console.log(trailer)
            var vidId = trailer.items[0].id.videoId 
            console.log(vidId, trailer.items[0].id.videoId );
            var vid = 'https://www.youtube.com/embed/'+vidId
        console.log(vid);
        })
    }
    

// function loadYoutube() {
//     gapi.client.setApiKey('AIzaSyCENe0M7rpOxtAXyYNUbOuUQc_DMYZ_JU4')
//     gapi.client.load('https://www.googleapis.com/youtube/v3/search')
// }

// function executeYoutube() {
//     return gapi.client.youtube.search.list({
//         part: ['snippet'],
//         type: ['video'],
//         q: 'blade',
//         maxResults: 1,
//     })
//     .then(function(response) {
//         console.log(response);
//     })
// };

