const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const spotifyApi = require('./spotifyServer');

const scope = ['user-read-private', 'user-read-email', 'user-read-playback-state',
    'ugc-image-upload', 'streaming', 'playlist-read-collaborative', 'user-modify-playback-state',
    'user-read-private', 'playlist-modify-public', 'user-library-modify', 'user-top-read',
    'user-read-currently-playing', 'playlist-read-private', 'user-follow-read', 'app-remote-control',
    'user-read-recently-played', 'playlist-modify-private', 'user-follow-modify', 'user-library-read'];

const app = express();
app.use(bodyParser.json());
app.use(pino);

app.post('/api/authCodeGrant', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const code = req.body.code;
    spotifyApi.authorizationCodeGrant(code)
        .then( data => {
            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
            res.send("token set")
        })
        .catch( error => {
            console.log('Something went wrong!', error);
    });
});

app.get('/api/authorizeURI', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    spotifyApi.setClientId(process.env.CLIENT_ID);
    const authorizeUri = spotifyApi.createAuthorizeURL(scope, process.env.STATE, true);
    res.send(JSON.stringify({authorizeUri: authorizeUri}))
});
app.get('/api/getMyCurrentPlaybackState', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    spotifyApi.getMyCurrentPlaybackState({
    })
        .then( data => {
            res.send(data.body)
        })
        .catch(error => {
            res.send(error)
        })
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);