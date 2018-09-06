'use strict';

//dot env for enviormentals
require('dotenv').config();

//acces to files in key.js
let keys = require('./keys.js');

//allow the program to read and write to other files
let fs = require('fs');

//allows node to make a request with callback functions
let request = require('request');

//variable to compare
let twitterAction = 'my-tweets';

//variable to compare
let songAction = 'spotify-this-song';

//vairable to compare
let movieAction = 'movie-this';

//variable to compare
let doWhatItSays = 'do-what-it-says';

//variable to make an array out of the command line
let nodeArgs = process.argv;

//takes in the the third argument from command line
let actionToTake = process.argv[2];

//takes in the the third argument from command line
let takeActionOn = process.argv[3];

//variable for holding a song
let songName = '';

//variable for holding an artist name
let artistName ='';

//variable for holding temporary movie name
let movieName = '';

//function to console.log
let cl = function(x){
  console.log(x);
  //closes out the console.log function    
};

//function to append file
let ap = function(info){
  fs.appendFile('./log.txt', info +',', function(err) {
    if (err) {
      cl(err);
    }
  });
  //closes out the append function
};

//function to get twitter information
function getTweets() {
   
  //this line uses my personal API key to get my timeline tweets
  keys.client.get('statuses/user_timeline','Dameon_H20', function(error, tweets, response) {
   
    //if an error occurs then it it logged
    if(error) {
      return cl('There was a problem occuring at: ' + error);
    } 
        
    //if there is no error then..
    else {
      for (var i = 0; i < tweets.length; i++) {
            
        //this logs the tweets with the number then appends it to the log.txt file              
        cl('\n'+'Tweet #'+(i+1)+' '+tweets[i].text);
        ap('\n'+'Tweet #'+(i+1)+' '+tweets[i].text);
            
        //this logs the date and time the tweet was created            
        cl('Created On: ' + tweets[i].created_at);
        cl('\n-------------------');
      }
    }
  });
  //closes out the Twitter function
}

//function to get song information
function displaySongInfo () {
  if (takeActionOn === undefined) {
        
    //if the user did not state a song
    cl('\nYou did not identify a song. Here is information about Ace of Base:'+ 'The Sign');
          
    //give the user song information for Ace of Bases' "The Sign"
    songName = 'The Sign';
    artistName = 'Ace of Base';
        
    //this line uses my personal API key to get song information
    keys.spotify.search({ type: 'track' || 'artist', query: artistName || songName }, function(error, data) {
   
      //if there is an error, report it to the user
      if (error) {
        return cl('There was a problem occuring at: ' + error);
      }
   
      //logs the artist (Ace of Base) and appends to the file log.txt
      cl('Artist: '       + data.tracks.items[0].artists[0].name);
      ap('Artist: '       + data.tracks.items[0].artists[0].name);
               
      //logs the "The Sign"  and appends to the file log.txt
      cl('Song title: '   + data.tracks.items[0].name);
      ap('\nSong title: '   + data.tracks.items[0].name);
               
      //link to song
      cl('Link to song: ' + data.tracks.items[0].external_urls.spotify);
                             
      //logs album name
      cl('Album title: '  + data.tracks.items[0].album.name);
                             
      //stop line for identification purposes
      cl('\n-----------------');
    });
    //closes out the undefined song information
  } 
              
  //if the user does identify a song then 
  else {
              
    //this line identifies the song that the user specified
    songName = process.argv[3];
                
    //if the song title is more than a one word title then this loop grabs the whole title
    for(i = 4; i < nodeArgs.length; i++) {
      songName += '+' + nodeArgs[i];
    }
              
    //gives the user back the song they searched for
    cl('You searched for: '+songName);
                
    //this line uses my personal API to retrieve the song information
    keys.spotify.search({ type: 'track' , query: songName}, function(error, data) {
                
      //if the song did not return any information log the error
      if (error) {
        return cl('Your song was not found: ' + '\n'+ error);
      } 
                  
      //this is the information returned for the song searched for
      else {
                   
        //logs the artist name and appends it to the log.txt file
        cl('Artist: '       + data.tracks.items[0].artists[0].name);
        ap('\nArtist: '     + data.tracks.items[0].artists[0].name);
               
        //logs the song name and appends it to the log.txt file
        cl('Song title: '   + data.tracks.items[0].name);
        ap('\nSong title: ' + data.tracks.items[0].name);
               
        //logs the link to song
        cl('Link to song: ' + data.tracks.items[0].external_urls.spotify);
                              
        //logs the album name
        cl('Album title: '  + data.tracks.items[0].album.name);
                             
        //Stop line for identification purposes
        cl('\n-----------------');
      }
    });
    //closes out the user selected song information  
  }
  //closes out what to do for song information
}


//if the user wants the last 20 tweets            
if (actionToTake === twitterAction){
  getTweets();
}

//if the user wants song information       
if (actionToTake === songAction) {
  displaySongInfo();
}

//if the user wants movie information    
if (actionToTake === movieAction) {
   
  //if the movie is not stated 
  if (takeActionOn === undefined) {
       
    //inform the user they didn't state a movie and give them information
    cl('You did not pick a movie so here is information on: Mr. Nobody\n');
        
    //variable to hold movie URL
    movieName = 'Mr.Nobody';
        
    //variable to the omdb destination
    let queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=40e9cece';
    
    //request for movie information
    request(queryUrl, function(error, response, body) {
       
      //check to see if no errors
      if (!error && response.statusCode === 200) {
  
        // If the request is successful
        cl('\n');
        
        //logs the title and appends it the log.txt file
        cl('The title is: '+JSON.parse(body).Title);
        ap('\nThe title is: '+JSON.parse(body).Title);
        
        //logs the year the film was made
        cl('The year it was made: '+JSON.parse(body).Year);
        
        //logs the IMDB rating
        cl('IMDB rating: '+JSON.parse(body).imdbRating);
        
        //logs the Rotten Tomatoes rating
        cl('Rotten Tomatoes rating: '+JSON.parse(body).Ratings[1].Value);
        
        //logs the country the movie was filmed in
        cl('Country it was filmed: '+JSON.parse(body).Country);
        
        //logs the language the movie was "originally" spoken in
        cl('Language it was filmed in: '+JSON.parse(body).Language);
        
        //logs the plot of the movie
        cl('The movies plot is: '+JSON.parse(body).Plot);
        
        //logs the accreditted main actors in the movie
        cl('Actors starring in movie: '+JSON.parse(body).Actors);
        
        // this is for spacing purposes in the console
        cl('\n');

      }
      //if this didnt happen then give the user the error
      else {
        cl('\nAn error occured at:'+error);
      }
    });     
    //closes out the undefined information
  }
    
  //if the user does define a movie name
  else {
  
    //this runs through the command line to get the whole title
    for (var i = 3; i < nodeArgs.length; i++) {
      movieName += nodeArgs[i]+'+';
    }   
         
    //variable to hold movie URL
    let queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=40e9cece';

    //request for movie information
    request(queryUrl, function(error, response, body) {

      //check to see if no errors occured
      if (!error && response.statusCode === 200) {

        // If the request is successful starts a new line and gives the movie information
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
        cl('Country it was filmed: '+JSON.parse(body).Country);
        
        //logs the language the movie was "originally" spoken in
        cl('Language it was filmed in: ' + JSON.parse(body).Language);
        
        //logs the plot of the movie
        cl('The movies plot is: ' + JSON.parse(body).Plot);
        
        //logs the accreditted main actors in the movie
        cl('Actors starring in movie: ' + JSON.parse(body).Actors);
        
        // this is for spacing purposes in the console
        cl('\n');
      }
         
      //if an error did occur then log what happened
      else {
        cl('An error occured at: '+error);
      }
    });
    //closes out the user inputed movie information
  }
  //closes out what to do for movie information
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


