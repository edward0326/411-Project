import React from "react";
import {Grid} from '@material-ui/core';
import landingImg from '../public/assets/landing.jpg';

function Landing() {
  return (
    <div>
        <Grid container direction="column" spacing={1} justifyContent="center" alignItems="center" style={{marginTop:100}}>
            <img src={landingImg} width="70%"/>
        </Grid>
    </div>
  );
}

export default Landing;