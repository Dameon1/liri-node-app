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
    if (err) {
      cl(err);
    }
  });
};

let getTweets = () => {
  keys.client.get('statuses/user_timeline','Dameon_H20', (error, tweets, response) => {
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

let displaySongInfo = () => {
  let nodeArgs = process.argv;  
  let songName = process.argv[3];
  for(let i = 4; i < nodeArgs.length; i++) {
    songName += '+' + nodeArgs[i];
  }      
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

let displayMovieInfo = () => {
  let nodeArgs = process.argv;
  let movieName ='';
  for (var i = 3; i < nodeArgs.length; i++) {
    movieName += nodeArgs[i]+'+';
  }   
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
}

default :
  return 'string';

}
















































 

if (process.argv[2] === 'do-what-it-says') {
  console.log('still working');
}










































//The next block of code combines all three of these function if given a command from an outside source  (random.txt)//

//variable to hold a global search item for the follow combination of commands
let searchItem;

//if the user makes a do-what-it-says command
if (actionToTake === doWhatItSays) {

  //grabs the information from the random.txt file
  fs.readFile('random.txt', 'utf8', function(error, data) {
 
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    } else {
                
      // information recieved from the outside source
      console.log('The information received from random.txt was: ' + data);
                
      //puts data in array to use
      let dataArr = data.split(',');
                
      //variable for an annonomous action
      let anonAction = dataArr[0];
                
      //variable for an annonomous search item
      searchItem = dataArr[1];
                
      //let the user know what they searched for
      cl('This is the search item: ' + searchItem);
                               
      //if the annonomous action is get-tweets            
      if (anonAction === twitterAction){
                
        //can use this function because it only uses the global variables
        getTweets();
      }
                

      //if the annonomous action is spotify-this-song
      if (anonAction === songAction) {
            
        //give the user back the searched for song
        cl('You searched for: ' + searchItem);
            
        //if the user did not state a song
        if (searchItem === undefined) {
                    
          //informs the user that they did not specify a song and will now display the following
          cl('\nYou did not identify a song. Here is information about Ace of Base:'+ 'The Sign');
          
          //give the user song information for Ace of Bases' "The Sign"
          songName = 'The Sign';
          artistName = 'Ace of Base';
        
          //this line uses my personal API key to get song information
          keys.spotify.search({ type: 'track' || 'artist', query: artistName || songName }, function(error, data) {
            
            //if there is an error report it to the user
            if (error) {
              return cl('There was a problem occuring at: ' + error);
            }
                
            //logs the Ace of Base and appends to the file log.txt
            cl('Artist: '       + data.tracks.items[0].artists[0].name);
            ap('\nArtist: '       + data.tracks.items[0].artists[0].name);
               
            //logs the "The Sign"  and appends to the file log.txt
            cl('Song title: '   + data.tracks.items[0].name);
            ap('\nSong title: ' + data.tracks.items[0].name);
               
            //link to song "The Sign"
            cl('Link to song: ' + data.tracks.items[0].external_urls.spotify);
                             
            //logs album name
            cl('Album title: '  + data.tracks.items[0].album.name);
                             
            //stop line for identification purposes
            cl('\n-----------------');
                
            //closes out the spotify request
          });
              
          // closes out the undefined music request
        } 
            
        //if the user does identify a song then 
        if (searchItem !== undefined) {
                  
          //tell the user the song they search
          cl(searchItem);

          //this is the call to spotify which returns information through the (data)
          keys.spotify.search({ type: 'track' || 'artist', query: searchItem  }, function(error, data) {
                   
            //if there is an error report it to the user
            if (error) {
              return cl('There was a problem occuring at: ' + error);
            }

            //logs Ace of Base as an artist and appends to the file log.txt
            cl('Artist: '       + data.tracks.items[0].artists[0].name);
            ap('Artist: '       + data.tracks.items[0].artists[0].name);
                       
            //logs the the song "The Sign" and appends to the file log.txt
            cl('Song title: '   + data.tracks.items[0].name);
            ap('\nSong title: ' + data.tracks.items[0].name);
                       
            //link to song searched for
            cl('Link to song: ' + data.tracks.items[0].external_urls.spotify);
                                     
            //logs album name
            cl('Album title: '  + data.tracks.items[0].album.name);
                                     
            //stop line for identification purposes
            cl('\n-----------------');
                        
            //closes out the user defined request
          });
          //closes out if search item is defined   
        }
        //closes out the song search function
      }


               
      //if the command is for movie-this
      if (anonAction === movieAction) {
        
      //if the movie is not stated 
        if (searchItem === undefined) {
       
        //inform the user they didn't state a movie and give them information
          cl('You did not pick a movie so here is information on: Mr. Nobody\n');
        
          //variable to hold movie URL
          searchItem='Mr.Nobody';

          //variable to the omdb destination
          let queryUrl = 'http://www.omdbapi.com/?t=' + searchItem + '&y=&plot=short&apikey=40e9cece';
    
          //request for movie information
          request(queryUrl, function(error, response, body) {
       
            //check to see if no errors
            if (!error && response.statusCode === 200) {
  
              // If the request is successful
              cl('\n');
        
              //logs the title and appends it the log.txt file
              cl('The title is: '   + JSON.parse(body).Title);
              ap('\nThe title is: ' + JSON.parse(body).Title);
        
              //logs the year the film was made
              cl('The year it was made: ' + JSON.parse(body).Year);
        
              //logs the IMDB rating
              cl('IMDB rating: ' + JSON.parse(body).imdbRating);
        
              //logs the Rotten Tomatoes rating
              cl('Rotten Tomatoes rating: ' + JSON.parse(body).Ratings[1].Value);
        
              //logs the country the movie was filmed in
              cl('Country it was filmed: ' + JSON.parse(body).Country);
        
              //logs the language the movie was "originally" spoken in
              cl('Language it was filmed in: ' + JSON.parse(body).Language);
        
              //logs the plot of the movie
              cl('The movies plot is: ' + JSON.parse(body).Plot);
        
              //logs the accreditted main actors in the movie
              cl('Actors starring in movie: ' + JSON.parse(body).Actors);
        
              // this is for spacing purposes in the console
              cl('\n');
        
              //closes out then non defined movie and logs an error if there was one
            } else { cl('There was an error getting: '+error);}
        
            //closes out undefined request to OMDB    
          }); 
          //closes out undefined  user search
        }
    
        //if there is a defined movie to search for
        if (searchItem !== undefined) {
       
        //inform the user they didn't state a movie and give them information
          cl('You search for information about:' + searchItem + '\n');
        
                
          //variable to the omdb destination
          let queryUrl = 'http://www.omdbapi.com/?t=' + searchItem + '&y=&plot=short&apikey=40e9cece';
    
          //request for movie information
          request(queryUrl, function(error, response, body) {
       
            //check to see if no errors
            if (!error && response.statusCode === 200) {
  
              // If the request is successful
              cl('\n');
        
              //logs the title and appends it the log.txt file
              cl('The title is: '   + JSON.parse(body).Title);
              ap('\nThe title is: ' + JSON.parse(body).Title);
        
              //logs the year the film was made
              cl('The year it was made: ' + JSON.parse(body).Year);
        
              //logs the IMDB rating
              cl('IMDB rating: ' + JSON.parse(body).imdbRating);
        
              //logs the Rotten Tomatoes rating
              cl('Rotten Tomatoes rating: ' + JSON.parse(body).Ratings[1].Value);
        
              //logs the country the movie was filmed in
              cl('Country it was filmed: ' + JSON.parse(body).Country);
        
              //logs the language the movie was "originally" spoken in
              cl('Language it was filmed in: ' + JSON.parse(body).Language);
        
              //logs the plot of the movie
              cl('The movies plot is: ' + JSON.parse(body).Plot);
        
              //logs the accreditted main actors in the movie
              cl('Actors starring in movie: ' + JSON.parse(body).Actors);
        
              // this is for spacing purposes in the console
              cl('\n');
        
              //ends the information and logs an error if there was one
            } else {
              cl('There was an error and couldnt get this information: ' + error);
            }

            //closes out the user the movie search request
          });
          //closes out the user defined movie search   
        }
        //closes out the movie-this  
      }      
      //closes out the else block if there is no error on the fs.read request
    }
    //closes out the fs.read request             
  });
//closes out the do-what-says command    
}


