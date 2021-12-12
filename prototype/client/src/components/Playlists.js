import React, { useState, useEffect } from "react";
import {Grid, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';

function Playlists({artistName}) {
    const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
    const [itunesPlaylists, setItunesPlaylists] = useState([]);

    useEffect(() => {
        async function fetchData() {

            // fetch Spotify tracks
            // const response = await fetch(`/api/playlists/${artistName}`)
            // const data = await response.json()
            // var tempData = data.body.tracks.items
            // var tempPlaylists = []
            // for (var i = 0; i < tempData.length; i++) {
            //     const artists = tempData[i]?.album?.artists
            //     for (var j = 0; j < artists.length; j++) {
            //         const currArtistName = artists[j]?.name.toLowerCase()
            //         if (currArtistName.includes(artistName)) {
            //             tempPlaylists.push(tempData[i])
            //             break;
            //         }
            //     }
            // }
            // console.log(tempPlaylists)
            // setSpotifyPlaylists(tempPlaylists)

            // fetch iTunes tracks
            fetch(`https://itunes.apple.com/search?term=${artistName}`)
                .then( async res => {
                    try {
                        const data = await res.json()
                        setItunesPlaylists(data.results)
                        console.log('response data?', data.results)
                    } catch(error) {
                        console.error(error)
                    }
                }).catch(e => console.log(e));
        }
        fetchData()
    }, [artistName])

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h2 align="center">Spotify</h2>
                    <List dense={true}>
                        {spotifyPlaylists.map((playlist) => {
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={playlist?.album?.images[0]?.url} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={playlist?.album?.name}
                                        secondary={playlist?.album?.artists[0]?.name}
                                    />
                                </ListItem>)
                            })
                        }
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <h2 align="center">iTunes</h2>
                    <List dense={true}>
                        {itunesPlaylists.map((playlist) => {
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={playlist?.artworkUrl100} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={playlist?.trackName}
                                        secondary={playlist?.artistName}
                                    />
                                </ListItem>)
                            })
                        }
                    </List>
                </Grid>
            </Grid>
        </div>
    );
}

export default Playlists;
