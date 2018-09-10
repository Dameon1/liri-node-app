'use strict';

require('dotenv').config();
let fs = require('fs');
let keys = require('./keys.js');
let request = require('request');

let cl = function(x){
  console.log(x);     
};

let appendToFile = (info) => {
  fs.appendFile('./log.txt', info +',', (err) => {
    if (err) { cl(err); }
  });
};

let getTweets = () => {
  keys.client.get('statuses/user_timeline','Dameon_H20', (error, tweets) => {
    if(error) {
      return cl('There was a problem occuring at: ' + error);
    }
    tweets.forEach(tweet => {
      cl('\n'+'Tweet #'+(i+1)+' '+tweet.text);
      cl('Created On: ' + tweet.created_at);
      cl('\n-------------------');
      appendToFile('\n'+'Tweet #'+(i+1)+' '+tweet.text);
    });   
  });
};

let displayUndefinedSongInfo = () => {
  if (process.argv[3] === undefined) {    
    let songName = 'The Sign';
    let artistName = 'Ace of Base';
    keys.spotify.search({ type: 'track' || 'artist', query: artistName || songName },(error, data) => {
      if (error) {
        return cl('There was a problem occuring at: ' + error);
      }
      let songInfo=data.tracks.items[0];
      cl('\nYou did not identify a song. Here is information about Ace of Base:'+ 'The Sign');
      cl(`Artist: ${songInfo.artists[0].name}`);
      cl(`Song title: ${songInfo.name}`);
      cl(`Link to song: ${songInfo.external_urls.spotify}`);
      cl(`Album title: ${songInfo.album.name}`);
      cl('\n-----------------');
      appendToFile(`Artist: ${songInfo.artists[0].name}`);
      appendToFile(`\nSong title: ${songInfo.name}`);
    });
  } 
};        

let displaySongInfo = (songArg) => {
  let nodeArgs = process.argv;  
  let songName = process.argv[3];
  for(let i = 4; i < nodeArgs.length; i++) {
    songName += '+' + nodeArgs[i];
  }
  if(songArg){songName=songArg;}      
  keys.spotify.search({ type: 'track' , query: songName}, (error, data) => {
    if (error) {
      return cl('Your song was not found: ' + '\n'+ error);
    } 
    let songInfo=data.tracks.items[0];
    cl(`Artist: ${songInfo.artists[0].name}`);
    cl(`Song title: ${songInfo.name}`);
    cl(`Link to song: ${songInfo.external_urls.spotify}`);
    cl(`Album title: ${songInfo.album.name}`);
    cl('\n-----------------');
    appendToFile(`Artist: ${songInfo.artists[0].name}`);
    appendToFile(`\nSong title: ${songInfo.name}`);
  }
  );   
};

let displayUndefinedMovieInfo = () => {
  let movieName = 'Mr.Nobody';
  let queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=40e9cece';
  request(queryUrl, function(error, response, body) {
    if (error) {
      return cl('\nAn error occured at:'+error);
    }
    let movie = JSON.parse(body);
    cl(`\nYou did not pick a movie so here is information on: Mr. Nobody \nThe title is: ${movie.Title} 
        \nThe year it was made: ${movie.Year}\nIMDB rating: ${movie.imdbRating}
        \nRotten Tomatoes rating:${movie.Ratings[1].Value}\nCountry it was filmed: ${movie.Country} 
        \nLanguage it was filmed in: ${movie.Language} \nThe movies plot is: ${movie.Plot} 
        \nActors starring in the movie: ${movie.Actors} \n`);
    appendToFile(`\nThe title is: ${movie.Title}`);
  });
};  

let displayMovieInfo = (movieArg) => {
  let nodeArgs = process.argv;
  let movieName ='';
  for (var i = 3; i < nodeArgs.length; i++) {
    movieName += nodeArgs[i]+'+';
  }
  if(movieArg){movieName = movieArg;}   
  let queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=40e9cece';
  request(queryUrl, function(error, response, body) {
    if(error) {
      return cl('An error occured at: '+error);
    }
    let movie = JSON.parse(body);    
    cl(`\nThe title is: ${movie.Title} \nThe year it was made: ${movie.Year}\nIMDB rating: ${movie.imdbRating}
        \nRotten Tomatoes rating:${movie.Ratings[1].Value}\nCountry it was filmed: ${movie.Country} 
        \nLanguage it was filmed in: ${movie.Language} \nThe movies plot is: ${movie.Plot} 
        \nActors starring in the movie: ${movie.Actors} \n`);
    appendToFile(`\nThe title is: ${movie.Title}`);
  });      
};
    
switch (process.argv[2]) {
case 'tweets': {
  getTweets();
  break;
}
case 'movie': {
  (process.argv[3] === undefined) ? displayUndefinedMovieInfo() : displayMovieInfo();
  break;
}
case 'spotify': {
  (process.argv[3] === undefined) ? displayUndefinedSongInfo() : displaySongInfo();
  break;
}case 'do-what': {
  fs.readFile('log.txt', 'utf8', function(error, data) {
    if (error) {
      return console.log(error);
    }    
    let dataArr = data.split(',');
    let anonAction = dataArr[0];
    let searchItem = dataArr[1];
    switch (anonAction){
    case 'tweets': {
      getTweets();
      break;
    }
    case 'spotify': {
      displaySongInfo(searchItem);
      break;
    }
    case 'movie': {
      displayMovieInfo();
      break;
    }
    default: {
      console.log('no information provided');
    }
    }
  });
  break; 
}
default :
  return 'string';
}