require("dotenv").config();

// Create requires for npm
var keys = require("./keys.js");
var spotifyAPI = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


// Create spotify variable with our own ID and secret for authorization
var spotify = new spotifyAPI(keys.spotify);

// Function for switch method for taking node input
function master(command, input) {
    switch (command) {
        case "concert-this": concert(input);
        break;

        case "spotify-this-song": song(input);
        break;
    
        case "movie-this": movie(input);
        break;
    
        case "do-what-it-says": doWhat();
        break;

        default: console.log("Please provide a proper input.");
        break;
    }
}

// Function for Axios call to Bandsintown API
function concert(input) {
    var artist = input;
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming";

    axios.get(queryURL)
    .then(function(response) {
        console.log("The next upcoming show for " + artist + " is the following:");
        console.log(response.data[0].venue.name);
        if (response.data[0].venue.region===""||(typeof(response.data[0].venue.region))==="undefined") {
            console.log(response.data[0].venue.city + ", " + response.data[0].venue.country);
        }
        else {
            console.log(response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
        }
        console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));

        // Log the data to 'log.txt'
        // Validate proper output; some don't have 'region' for venue
        if (response.data[0].venue.region===""||(typeof(response.data[0].venue.region))==="undefined") {
            var text = "The next upcoming show for " + artist + " is the following:\n" + response.data[0].venue.name + '\n' + response.data[0].venue.city + ", " + response.data[0].venue.country + '\n' + (moment(response.data[0].datetime).format("MM/DD/YYYY")) + '\n\n';
            fs.appendFile("log.txt", text, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        else {
            var text = "The next upcoming show for " + artist + " is the following:\n" + response.data[0].venue.name + '\n' + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country + '\n' + (moment(response.data[0].datetime).format("MM/DD/YYYY")) + '\n\n';
            fs.appendFile("log.txt", text, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
    .catch(function(error) {
        console.log('Error occurred: ' + error);
    });
};

// Function for Node-Spotify-API call
function song(input) {
    var song = input;
    var artist = "";

    if (typeof(input) === "undefined") {
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
};

// Function for Axios call to OMDB API
function movie(input) {
    var movieName = input;

    if (typeof(input) === "undefined") {
        movieName = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
            console.log("Movie name: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country the movie was produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function(error) {
            console.log('Error occured: ' + error);
        });
};

// Function to read input from a local file named 'random.txt'
function doWhat() {
    var dataArr = [];

    // FS ReadFile call
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        else {
            // Split the string from the file that is formatted [command,"input"] into an array
            dataArr = data.split(",");
            master(dataArr[0], dataArr[1]);
        }
    });
};

master(process.argv[2], process.argv[3]);