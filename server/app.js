// SERVER SIDE CODE

const { response } = require('express');
const express = require('express');
const app = express()
const router = express.Router()
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'dcd381c8849f4e12927c5ae5d86e8b00',
  clientSecret: '0b2de1a111844316badd615e1c861207',
  redirectUri: 'http://localhost:5000/callback'
});
const token = "BQBjCl9G9q5OtzsMJuD0MoNoelgh9M64p_odskTY5znbLS8fAsUVpxVLEZ_JReFTqvm7KkkroEAcaOMRdzMJhoIAbOo8RBRfRGBdOkX_35RHJWA5kCh_e7oKdb7s7BLVbc1B7rV78FmiUWvD_A1VveakWv7xbit-0dQENWYf4MHLycyDHJG53eEXNInonhZytJdAn3nhqmfNEUevLcMJfIxaD2KSMrAPCI6ydFmJovY8tJVAy-iE-kj_TBR7QSN8uzb7fRzWS0VAvxizuEIgGQ2KEHS7mP2jxwxYSKcSGDvwkd4DBo5E"

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

// GET ACCESS TOKEN (go to http://localhost:5000/callback whenever access token expired)
router.get('/callback',(req,res,next) => {
  console.log('query', req.query)
  const code = req.query.code
  spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
    res.send(JSON.stringify(response))
    spotifyApi.setAccessToken(token)
  }).catch(console.log("failed"))
})

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

// Search artists whose name contains 'Love'
const searchArtists = async (artist) => {
  const artists = await spotifyApi.searchArtists(artist)
  console.log('artist', artists)
  console.log('bilgiler', artists.body.artists.items[0])
}
// searchArtists('Love')

// Get albums by a certain artist
const getArtistAlbums = (artistID) => {
  spotifyApi.getArtistAlbums(artistID)
    .then(function(data) {
      console.log('Artist albums', data.body);
    }, function(err) {
      console.error(err);
    });
}
// getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')

// Search tracks whose name, album or artist contains 'Love'
const searchTracks = (search) => {
  spotifyApi.searchTracks(search)
    .then(function(data) {
      console.log('Search by ' + search, data.body);
    }, function(err) {
      console.error(err);
    });
}
// searchTracks('Love')



// Search tracks whose name, album or artist contains 'Love' (go to http://localhost:5000/api/playlists to view the api response)
app.get('/api/playlists', async (req,res) => {
  const playlists = await spotifyApi.searchTracks('Love')
  res.json(playlists)
})



app.use('/',router)
const port = 5000
app.listen(port, () => {
  console.log(`running on PORT ${port}`)
})
