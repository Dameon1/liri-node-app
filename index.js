'use strict';

require('dotenv').config();
const fs = require('fs');
const keys = require('./keys.js');
const request = require('request');
const cl = (info) => console.log(info);

const appendToFile = (info) => { fs.appendFile('./log.txt', info +',', (err) => {
  if (err) { cl(err); } });
};

export const getTweets = () => {
  keys.client.get('statuses/user_timeline','Dameon_H20', (error, tweets, response) => {
    if(error) { return cl(`There was a problem occuring at:${error}`); }
    tweets.forEach((tweet,i) => {
      cl(`\nTweet #(${i+1}) ${tweet.text}\n Created On:${tweet.created_at}\n-------------------`);
      appendToFile(`\nTweet #(${i+1}) ${tweet.text}`);
    });   
  });
};

export const displaySongInfo = (songName='This is America') => {
  keys.spotify.search({ type: 'track' , query: songName}, (error, data) => {
    if (error) { return cl(`Your song was not found:\n${error}`); } 
    const songInfo = data.tracks.items[0];
    cl(`Artist: ${songInfo.artists[0].name}\nSong title: ${songInfo.name}\nLink to song: ${songInfo.external_urls.spotify}\nAlbum title: ${songInfo.album.name}\n-----------------`);
    appendToFile(`Artist: ${songInfo.artists[0].name}\nSong title: ${songInfo.name}`);
  }
  );   
};

export const displayMovieInfo = (movieArg='Cloak And Dagger') => {
  const queryUrl = `http://www.omdbapi.com/?t=${movieArg}&y=&plot=short&apikey=40e9cece`;
  request(queryUrl,(error, response, body) => {
    if(error) { return cl(`An error occured at:${error}`); }
    const movie = JSON.parse(body);    
    cl(`\nThe title is: ${movie.Title} \nThe year it was made: ${movie.Year}\nIMDB rating: ${movie.imdbRating}
        \nRotten Tomatoes rating:${movie.Ratings[1].Value}\nCountry it was filmed: ${movie.Country} 
        \nLanguage it was filmed in: ${movie.Language} \nThe movies plot is: ${movie.Plot} 
        \nActors starring in the movie: ${movie.Actors} \n`);
    appendToFile(`\nThe title is: ${movie.Title}`);
  });      
};
    
switch (process.argv[2]) {
case 'tweets': {
  getTweets(process.argv[3]);
  break;
}
case 'movie': {
  let movieName='';
  for (let i = 3; i < process.argv.length; i++) { movieName += process.argv[i]+'+'; }
  (process.argv[3] === undefined) ? displayMovieInfo():displayMovieInfo(movieName);
  break;
}
case 'spotify': {
  let songName = '';
  for(let i = 3; i < process.argv.length; i++) { songName += '+' + process.argv[i]; }
  (process.argv[3] === undefined) ? displaySongInfo() : displaySongInfo(songName);
  break;
}
case 'do-what': {
  fs.readFile('doWhat.txt', 'utf8', (error, data) => {
    if (error) { return cl(error); }    
    const dataArr = data.split(',');     
    switch (dataArr[0]){
    case 'tweets': {
      getTweets();
      break;
    }
    case 'spotify': {
      displaySongInfo(dataArr[1]);
      break;
    }
    case 'movie': {      
      displayMovieInfo(dataArr[1]);
      break;
    }
    default: {
      cl('no information provided');
    }
    }
  });
  break; 
}
default :
  return 'no information provided';
}