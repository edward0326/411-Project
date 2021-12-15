import React, { useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Grid
} from "@material-ui/core";
import {LibraryMusic} from '@material-ui/icons';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchConcert from "./SearchConcert";
import { Profile } from "./Profile";
import Login from "./Login";
import Landing from "./Landing";

const Navbar = () => {
    const [currentPage, setCurrentPage] = React.useState("landing");
    const [auth, setAuth] = React.useState(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"}}>
            <Toolbar>
                {!auth && (
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => setCurrentPage("home")}
                        color="inherit"
                    >
                        <LibraryMusic />
                    </IconButton>
                )}
                {auth && (
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => setCurrentPage("profile")}
                        color="inherit"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => setCurrentPage("home")}>
                    CS411 Music World!
                </Typography>
                {!auth && (
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => {
                            setCurrentPage("home");
                            setAuth(true) // needs change
                        }}
                        color="inherit"
                    >
                        <LoginIcon />
                        <div style={{fontSize: 18, fontWeight: 600}}>Login</div>
                    </IconButton>
                )}
                {auth && (
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => {setCurrentPage("home"); setAuth(false)}}
                        color="inherit"
                    >
                        <LogoutIcon />
                        <div style={{fontSize: 18, fontWeight: 600}}>Logout</div>
                    </IconButton>
                )}
            </Toolbar>
          </AppBar>
          {currentPage == "landing" ?
            <Landing /> : <Grid></Grid>
          }
          {currentPage == "home" && auth ?
            <SearchConcert /> : <Grid></Grid>
          }
          {currentPage == "home" && !auth ?
            <Login /> : <Grid></Grid>
          }
          {currentPage == "profile" ?
            <Profile /> : <Grid></Grid>
          }
        </Box>
      );
};
export default Navbar;