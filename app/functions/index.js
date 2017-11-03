// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const SpotifyWebApi = require('spotify-web-api-node');
const LastfmApi = require('simple-lastfm');
const express = require('express');
const cors = require('cors')({origin: "*"});
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// SPOTIFY TOKEN //

// Gotten from spotify
var clientId = '88641e06b03f46d886b98db9c58e9935',
clientSecret = '8b9aa7488fb2456a98d4168dd4b5c2c4';
// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
    clientId : clientId,
    clientSecret : clientSecret
});

const app = express();


// SPOTIFY TOKEN //
// TODO: Ikke refresh token om det ikke er nødvendig
var spotifyToken = ""
var now = new Date();
var expires = new Date();
app.use(cors);
app.get('', (req, res) => {
    now = new Date()
    // Hvis tiden går ut om under 10 minutter (600000 ms) eller spotifyToken ikke er satt
    if (now.getTime()+600000 > expires.getTime() || spotifyToken === "") {
        // Retrieve an access token.
        spotifyApi.clientCredentialsGrant()
        .then(data => {
            // Spotify Token
            spotifyToken = data.body['access_token']
            // Sekunder til token går ut
            var expiresIn = data.body['expires_in']
            // Lag ny "Date" for når token går ut. expiresIn er oppgitt i sekunder.
            expires = new Date(now.getTime + expiresIn*1000)

            // Send token som JSON
            res.json({token: spotifyToken});

        // If error log it.
        }, err => {
            console.log('Something went wrong when retrieving an access token', err);
        });
    // Hvis tiden ikke går ut om under 10 minutter
    } else {
        // Bare send den man har
        res.json({token: spotifyToken})
    }
    
});

exports.spotifyToken = functions.https.onRequest(app);
// END OF SPOTIFY TOKEN //




exports.addNewUser = functions.auth.user().onCreate(event => {
    const user = event.data; // The Firebase user.
    const uid = user.uid;
    const email = user.email; // The email of the user.
    const displayName = email.split('@')[0]
    // [END eventAttributes]
    user.updateProfile({displayName: displayName})
    .then(() => {
        return admin.database().ref().child('users').child(uid).update({
        email: email,
        displayName: displayName
        })
    })
    .catch((error) => {
        console.log(error)
    })
});




/* 
// Last fm.
// Used to fetch bio and picture of artist

var lastfm = new LastfmApi({
    api_key: '4a8a0fe142d2a436d9a80d3e460ec1eb',
    api_secret: '66c6a14111b6faf09afe1df9e78df5bc',
    username: 'xxx',
    password: 'xxx',
});

exports.addArtistInfo = functions.database.ref("festival17/artists/{artist}").onCreate(event => {
    var artistBioSum = "";
    var artistPic = "";
    var name = event.data.val().name
    

    return admin.database().ref('festival17').child('artists').child(event.params.artist).update({
        summary: artistBioSum,
        pic: artistPic,
    });
}) */