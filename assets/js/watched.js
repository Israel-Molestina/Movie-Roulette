

$('document').ready(function() {
    
    var movies = document.querySelector('#sidebar');
    var savedMovies = document.createElement('section');
    var savedTitle = document.createElement('h2');

    var name = JSON.parse(localStorage.getItem('key'));
    console.log(name.name);

});