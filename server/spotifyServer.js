const SpotifyWebApi = require('spotify-web-api-node');

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
    clientID: clientID,
    clientSecret: clientSecret,
    redirectUri: redirectUri,
});
module.exports = spotifyApi;