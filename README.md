# liri-node-app
Node.js app for searching bands, music, movies


Liri is a Javascript-based app for querying multiple APIs based on bands, songs and movies. When Liri is run with Node.js, it takes inputs fro mthe user and provides data based on a proper command.

   * `concert-this` will return Name of the venue, Venue location, and Date of the Event for the next upcoming concert for the artist or band. 
   
   Input should be in the form `node liri.js concert-this "artist name"`

   * `spotify-this-song` will return Artist(s), The song's name, A preview link of the song from Spotify, and The album that the song is from

   Input should be in the form `node liri.js spotify-this-song "song name"`

   * `movie-this` will return Title of the movie, Year the movie came out, IMDB Rating of the movie, Rotten Tomatoes Rating of the movie, Country where the movie was produced, Language of the movie, Plot of the movie, and Actors in the movie

   Input should be in the form `node liri.js movie-this "movie name"`

   * `do-what-it-says` will read a command and input from a locally stored text file named 'random.txt' and perform one of the above functions

   Input should be in the form `node liri.js do-what-it-says`

   See the included screenshots.


Additionally, all data that is output to the console will also be logged to a locally stored text file named 'log.txt'

NPM Dependencies: `Axios`, `Node-Spotify-API`, `Dotenv`, `Moment`, `FS`

APIs used: `Spotify` (user must use their own Spotify ID and Secret stored in a .env formatted as 

        # Spotify API keys

        SPOTIFY_ID=
        SPOTIFY_SECRET=

), `OMDB`, and `Bands In Town`

The entire contents of liri.js were written by me, Tom Elliott.