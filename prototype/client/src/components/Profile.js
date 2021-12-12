import React, { useState } from "react";
import {Grid, Button} from '@material-ui/core';

function Profile() {
  return (
    <div>
        <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" style={{marginTop:100}}>
            <h3>User Name:</h3>
            <h3>User Email:</h3>
            <h3>Saved Tracks:</h3>
        </Grid>
    </div>
  );
}

export default Profile;
