import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Redirect,
    Navigate,
} from "react-router-dom";
// Redirect v6 e ekhon ar nai ... Navigate chole ashse ...

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    /**
     * In pagination system .. if we click in any page .. nothing is going to happen .. bcz we are navigating to
     * /post/?page=1 .. but our current client side navigation does not know what that is .. because..all the posts
     * are simply on localhost:3000 .. so we have to make our client side navigation and react router .. work with
     * the current new pagination system .. prothome amra Redirect Component ke import korbo ..
     *
     */
    const user = JSON.parse(localStorage.getItem("profile")); // we want to get the profile ..
    return (
        <Router>
            <Container maxWidth="xl">
                <Navbar />

                {/* self closing component */}
                <Routes>
                    {/* Slash Render first on a page ..we dont want to render a home
                    component there ..what we want to do is call a callback
                    function .. which is simply going to call the redirect
                    component ..and that Redirect is going to redirect us to ...
                    and thats going to be forward slash posts .. */}
                    {/*🔴 <Route path="/" exact element={<Home />} /> */}
                    <Route
                        path="/"
                        exact
                        element={<Navigate replace to="/posts" />}
                        // element={<Home />}
                    />
                    {/* So, we only want to see posts if we are on this specific
                    path means only slash (/) and we are going to be immediately
                    redirected.. */}
                    {/* of course we have to keep in mind that if we want to show
                    something on this specific route.. we also need to create it */}
                    <Route path="/posts" exact element={<Home />} />
                    <Route path="/posts/search" exact element={<Home />} />
                    {/* search er shomoy aro query parameter add hobe */}
                    <Route path="/posts/:id" exact element={<PostDetails />} />
                    {/**This is going to post details path .. :id means this id should be dynamic ..  */}

                    {/* User logged in obosthay thakle Auth Page e jaite deowa uchit na .. element render korar
                    age amader check korte hobe user logged in ase kina .. ejonno amader ke localStorage theke
                    user ke niye ashte hobe age ...  */}
                    {/* <Route path="/auth" exact element={<Auth />} /> */}
                    <Route
                        path="/auth"
                        exact
                        element={
                            !user ? <Auth /> : <Navigate replace to="/posts" />
                        }
                    />
                    {/* ekhon amra Home Componenet Refactor korbo .. jeno amra Pagination Search egula shekhane 
                    implement korte pari  */}
                </Routes>
            </Container>
        </Router>
    );
};
export default App;
// Redirect v6 e ekhon ar nai ... Navigate chole ashse ...
