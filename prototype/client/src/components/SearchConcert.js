import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import {Grid, Button} from '@material-ui/core';
import Playlists from './Playlists'

function SearchConcert() {
    const [artistName, setArtistName] = useState("");
    const [city, setCity] = useState("");
    const [date, setDate] = useState(null);

  return (
    <div>
        <Grid container direction="row" spacing={1} justifyContent="center" alignItems="center" style={{marginTop:100}}>
            <TextField id="outlined-basic" label="Artist Name" variant="outlined" onChange={(event) => setArtistName(event.target.value.toLowerCase())} />
            <TextField id="outlined-basic" label="City" variant="outlined" onChange={(event) => setCity(event.target.value)}/>
            <DatePicker
                label="Concert Date"
                value={date}
                onChange={(newDate) => {
                    setDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </Grid>
        <h2 align="center">Tracks</h2>
        {artistName != "" ?
            <Grid ><Playlists artistName={artistName} /></Grid>
            : <Grid></Grid>
        }
    </div>
  );
}

export default SearchConcert;
