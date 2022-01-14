// rafce -> React Arrow function export component
import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import memories from "../../images/memories.png";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = () => {
    // in Auth Reducer we are setting our profile with the data field for the user .. we can try to use it somewhere
    // The Best place to use it would be a navbar ... because in here we already have our user .. which is
    // currently set to null .. So , now lets try to add a real user in here...
    // const user = null;
    const [user, setUser] = useState(
        // setItem dia item set korechilam auth reducer e ... getItem dia item get korbo ekhane
        JSON.parse(localStorage.getItem("profile")) // evabei amra user ke pete pari
    );
    // ekhon jehetu user chole esheche .. amra simply console.log kore dekhte pari
    console.log("🧾📈📢 User info from Navbar.js : ", user);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const classes = useStyles();

    // logout functionality
    const logout = () => {
        // amra ekhaneo ekta action dispatch korbo ...
        dispatch({ type: actionType.LOGOUT }); // ekhon amake auth er reducer er moddhe logic niye kaj korte hobe
        // reducer er logout e kaj temon kichui na .. localStorage ta clear kore dite hobe shekhane

        navigate("/auth"); // /auth e navigate kore dite hobe .. jeno login korte pare

        setUser(null); // logout jehetu korei felse .. tai user null kore dite hobe ...
    };

    /**
     * one bad thing .. we had to refresh and manually head back to the local host 3000 port and not to login
     * form .. so lets re-navigate automatically.. so we don't have to do ti manually .. we can do that using a
     * useEffect .. jeta component run korar shomoy e start hoy ..
     */
    useEffect(() => {
        const token = user?.token; // amra token er jonno check korbo .. if token exist

        // JWT
        // then finally later on we are going to check for the json web token here.. if we do the manual sign up
        // but now we are using google so we don't do that .. but what we can do is say setUser() and the same thing
        if (token) {
            /**
             * if token expired .. we simply need to log the user out ..for that amra navbar component e jabo front end er
             * shekhane useEffect er moddhe amader check korte hobe token expire hoye gese kina ..
             * so .. we have to check if the token is expired .. prothome token exist kore kina sheta check korte
             * hobe ..and then .. if that is the case .. we want to decode it .. decode ta import kore nite hobe ..
             *
             */
            const decodedToken = decode(token); // its going to give us information on when this token is expiring ..

            // finally we need a simple if check ..decodedToken.exp -> its the expiry time .. into 1000 means a value
            // of millisecond .. if that is lower than .. new time ..
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
        // finally amader Auth Component e arekta change korte hobe .. more specifically .. once we dispatch this
        // we actually have to redirect back to the home .. so , for that .. we can use history.push('/');
        // kothay push korbo .. forward slash e .. eta ager technology .. ekhon amra navigate use korbo
        /**
         * dependency array te location add kore deowa lagse .. er mane hocche
         * so, when do we want to call this useEffect .. as soon as the url changes from the /auth to the
         * simply / and we can use the property useLocation.. and based on this .. we will have access to that
         * change .. when this changes .. we want to simply call the user .. when location changes .. simply set
         * the user ..
         */
        /**
         * next step hocche implement the manual login and registration system ..using the JSON WEB TOKEN  ..
         * for that we are gonna use sign in form that we created .. lets start working on that ..
         * ekhon amra backend eo kaj korbo .. karon amader ke User er jonno Model Create korte hobe ..
         * as well as controller create korte hobe and the routes for the login and registration ..
         * but for now .. lets handle the client side of the authentication system ..to do that we have to
         * go to our Auth Form .. means Component ..
         */
        // , logout, user?.token ei jinish gula dite bole dependency array te .. kintu dile jhamela kore
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography
                    component={Link}
                    to="/"
                    className={classes.heading}
                    variant="h2"
                    align="center"
                >
                    Memories
                </Typography>
                <img
                    className={classes.image}
                    src={memories}
                    alt="icon"
                    height="60"
                />
            </div>
            {/* 💬📢 etar moddhe user thakle ekta logic dekhabo ... ar na thakle arekta logic dekhabo ...  */}
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user?.result.name}
                            src={user?.result.imageUrl}
                        >
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user?.result.name}
                        </Typography>
                        <Button
                            variant="contained"
                            className={classes.logout}
                            color="secondary"
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
