import React, { useState, useEffect } from "react";
import {Grid, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';

function Playlists({artistName}) {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        async function fetchData() { 
            const response = await fetch(`/api/playlists/${artistName}`)
            const data = await response.json()
            var tempData = data.body.tracks.items
            var tempPlaylists = []
            for (var i = 0; i < tempData.length; i++) {
                const artists = tempData[i]?.album?.artists
                for (var j = 0; j < artists.length; j++) {
                    const currArtistName = artists[j]?.name.toLowerCase()
                    if (currArtistName.includes(artistName)) {
                        tempPlaylists.push(tempData[i])
                        break;
                    }
                }
            }
            console.log(tempPlaylists)
            setPlaylists(tempPlaylists)
        }
        fetchData()
    }, [artistName])

    return (
        <div>
            <Box m={10}>
                <Grid item xs={12}>
                    <List dense={true}>
                        {playlists.map((playlist) => {
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
            </Box>
            <p>{ JSON.stringify(playlists) }</p>
        </div>
    );
}

export default Playlists;
