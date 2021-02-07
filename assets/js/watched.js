
// will load the saved movies when user goes to their movies page
$('document').ready(function() {

    // array that holds the movies saved in local storage
    var movieArr = [];
    
    var savedSidebar = document.querySelector('#sidebar');
    
    // for loop that loops through local storage and pushes movies to an array
    for (var i = 0; i < localStorage.length; ++i ) {

        movies = JSON.parse(localStorage.getItem(localStorage.key(i)));
        movieArr.push(movies);

    };

    // function that appends the movies in local storage to list of saved movies
    movieArr.forEach(function(film) {
        // variables creating elements
        var savedMovies = document.createElement('section');
        var savedTitle = document.createElement('h2');

        // appends movie names to list of saved movies
        savedSidebar.append(savedMovies);
        savedMovies.append(savedTitle);
        savedTitle.textContent = film.name;

    });

});