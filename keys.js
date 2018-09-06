///This comment is not needed, For class grading purposes, I have added what goes into the key.js file
'use strict';



//grabs the node package 'twitter'
let Twitter = require('twitter');

//grabs the node package 'spotify'
let Spotify = require('node-spotify-api');

//grabs the node package 'omdbapi'
let omdb = require('omdbapi');

//allows for a new twitter call
let client =  new Twitter ({
  consumer_key: 'fFApC9biLm8XH5SD5hFd1jjBw',
  consumer_secret: 'pYaNWxkeTwf0HlaAOhcnQwhrsIWbjY5QAS87VDj0JZ7SliBx0z',
  access_token_key: '5469072-6bpF3h8qiY97DON9ifZ9ar5EKWveJbLuCF3aEvx0Xe',
  access_token_secret: 'eu8gjweIvVARXAMwrQ69gZAm9PwQqwh5x2GqKg0v8JAOA',
});

//allows for a new spotify call
let spotify = new Spotify({
  id: process.env.id, 
  secret: process.env.secret 
});

//exports the key for twitter(client), and spotify(spotify)
module.exports = {
  client,
  spotify,
};