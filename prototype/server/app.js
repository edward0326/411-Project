// SERVER SIDE CODE
const express = require('express');
const app = express()
const router = express.Router()
var SpotifyWebApi = require('spotify-web-api-node');

// get credentials
require("dotenv").config()
let clientId = process.env.CLIENTID
let clientSecret = process.env.CLIENTSECRET
let redirectUri = process.env.REDIRECTURI
let port = process.env.PORT
let token = process.env.TOKEN
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri
});

router.get('/',(req,res,next) => {
  res.redirect(spotifyApi.createAuthorizeURL([
    "ugc-image-upload",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "app-remote-control",
    "playlist-modify-public",
    "user-modify-playback-state",
    "playlist-modify-private",
    "user-follow-modify",
    "user-read-currently-playing",
    "user-read-currently-playing",
    "user-follow-read",
    "user-library-modify",
    "user-read-playback-position",
    "playlist-read-private",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "playlist-read-collaborative",
    "streaming"
  ]))
})

// GET ACCESS TOKEN (go to http://localhost:5000/ whenever access token expired)
// router.get('/callback',(req,res,next) => {
//   spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
//     res.send(JSON.stringify(response))
//     spotifyApi.setAccessToken(token)
//   }).catch(console.log("failed"))
// })

spotifyApi.setAccessToken(token)

// Get the authenticated user
const getMe = () => {
  spotifyApi.getMe()
    .then(function(data) {
      console.log('Some information about the authenticated user', data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
}
// getMe()

// Search tracks whose name, album or artist contains artistName
app.get("/api/playlists/:value", async (req, res) => {
  const {value} = req.params;  
  const playlists = await spotifyApi.searchTracks(value)
  res.json(playlists)
})


app.use('/',router)
app.listen(port, () => {
  console.log(`running on PORT ${port}`)
})
