require("dotenv").config();

var keys = require("./keys.js");
var spotifyAPI = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var spotify = new spotifyAPI(keys.spotify);

switch (process.argv[2]) {
    case "concert-this": concert();
    break;

    case "spotify-this-song": song();
    break;
 
    case "movie-this": movie();
    break;
 
    case "do-what-it-says": doWhat();
    break;

    default: console.log("Please provide a proper input.");
    break;
}

function concert() {
    var artist = process.argv[3];
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming";

    axios.get(queryURL)
    .then(function(response) {
        console.log("The next upcoming show for " + artist + " is the following:");
        console.log(response.data[0].venue.name);
        console.log(response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
        console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
    })
    .catch(function(error) {
        console.log('Error occurred: ' + error);
    });
}

function song() {
    var song = process.argv[3];
    var artist = "";

    if (typeof(process.argv[3]) === "undefined") {
        song = "Ace of Base The Sign";
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
            if (i >= 0 && i < data.tracks.items[0].artists.length - 1) {
                artist =  artist + data.tracks.items[0].artists[i].name + ", ";
            }
            else {
                artist += data.tracks.items[0].artists[i].name;
            }
        }
        console.log("Artist(s): " + artist);
        console.log("Song name: " + data.tracks.items[0].name);
        console.log("Preview mp3: " + data.tracks.items[0].preview_url);
        console.log("Album name: " + data.tracks.items[0].album.name);
    });
}

function movie() {
    var movieName = process.argv[3];

    if (typeof(process.argv[3]) === "undefined") {
        movieName = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
            console.log("Movie name: " + response.data.Year);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Year);
            console.log("Rotten Tomatoes Rating: " + response.data.Year);
            console.log("Country the movie was produced: " + response.data.Year);
            console.log("Language: " + response.data.Year);
            console.log("Plot: " + response.data.Year);
            console.log("Actors: " + response.data.Year);
        })
        .catch(function(error) {
            console.log('Error occured: ' + error);
        });
}