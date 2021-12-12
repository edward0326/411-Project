import React from "react";
import {Grid} from '@material-ui/core';
import GoogleButton from 'react-google-button';

function Login() {
  return (
    <div>
        <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" style={{marginTop:100}}>
            <Grid item xs={4}></Grid>
            <Grid item xs={5}>
                <GoogleButton
                    style={{
                        width:300
                    }}
                    onClick={() => { console.log('Google button clicked') }}
                />
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
    </div>
  );
}

export default Login;