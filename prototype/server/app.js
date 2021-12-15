// SERVER SIDE CODE
const express = require('express');
const app = express()

const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node');
let request = require('request')
let querystring = require('querystring')

// for users
const bodyParser = require("body-parser");
require("./config/db");
const userRoutes = require("./api/routes/userRoutes");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get credentials
require("dotenv").config()
let clientId = process.env.CLIENTID || "aacacdaa0c47455eb07969227af44907"
let clientSecret = process.env.CLIENTSECRET || "86093d6759994e2d92bd367e8850e724"
let redirectUri = process.env.REDIRECTURI || 'http://localhost:5000/callback'
let port = process.env.PORT || 5000
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri
});


router.get('/', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: 'user-read-private user-read-email',
      redirect_uri: redirectUri
    }))
})

router.get('/callback',(req,res) => {
  let code = req.query.code
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(
        clientId + ':' + clientSecret
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
})

// Get the authenticated user
const getMe = () => {
  spotifyApi.getMe()
    .then(function(data) {
      console.log('Some information about the authenticated user: ', data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
}
// getMe();

// Search tracks whose name, album or artist contains artistName
app.get("/api/playlists/:value", async (req, res) => {
  const {value} = req.params;  
  const playlists = await spotifyApi.searchTracks(value)
  res.json(playlists)
})


app.use('/',router)
userRoutes(app);
app.listen(port, () => {
  console.log(`running on PORT ${port}`)
})
