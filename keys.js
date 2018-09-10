'use strict';

let Twitter = require('twitter');

let Spotify = require('node-spotify-api');

let client =  new Twitter ({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

let spotify = new Spotify({
  id: process.env.id, 
  secret: process.env.secret 
});

module.exports = {
  client,
  spotify,
};