# liri-node-app

This liri node app makes use of 'npm packages and an API's' from Twitter, Spotify, and OMDB.

A user can enter in a <node liri.js> command that is in "()" in the the terminal with the following returns that follow.

1. (my-tweets), uses the [node-twitter-api], which can be found here 
   (https://apps.twitter.com/app/new)
   
   Returns the last 20 tweets along with the date and time they were created.
   I used my personal API keys to make this work, however you could easily change out my @handle with yours to get the information you need along with looking up the documentation here 
   (https://developer.twitter.com/en/docs/api-reference-index);


2. (spotifiy-this-song (space) song desired), uses the [node-spotify-api], which can be found here                                       (https//www.npmjs.com/package/node-spotify-api)

    Returns information on the song inputed. 
    Song Name, Group, A link to the song, and the Album, based on the Spotify API.
    Further documentation of the API endpoints can be found here. (https://developer.spotify.com/web-api/endpoint-reference/)

    If no song was selecter then the displayed song will be Ace of Base "The Sign".


3. (movie-this (space) movie desired), uses the [omdbapi], whichh can be found here,
   (https://www.omdbapi.com/)

   Returns the follow information based on the movie selected
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    The API endpoints are not redily available for screening.[ request(queryUrl, function(error, response, body)]  with a logging of the body will show the information given back through the API call.

    If no movie was selected, then the move "Mr. Nobody" will be displayed.


4.(do-what-it-says),grabs information from the outside source random.txt and does one of the three commands based on what the           command is.
