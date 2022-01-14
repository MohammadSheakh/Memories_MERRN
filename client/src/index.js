/**
 * npm install
 * axios -> for making API request
 * moment -> library for working with time and date
 * react-file-base64 -> we will use this to convert our images
 * redux ->
 * redux-thunk -> used for asynchronous actions using redux
 * if action or more specifically action creators are asynchronous then we have to use redux thunk ..
 * @material-ui/core
 * @material-ui/icons
 * import decode from "jwt-decode";
 * npm i react-google-login -> import { GoogleLogin } from "react-google-login";
 * npm install @material-ui/lab -> for pagination and some other things ..
 * npm install @material-ui/lab material-ui-chip-input -> That is going to be our input for our tags ...
 */

import React from "react";
import ReactDom from "react-dom";
import "./index.css";

// initialize Redux from here
import { Provider } from "react-redux"; // redux Provider is going to keep track of that store .. which
// is that global state and that allows us to access that store from anywhere inside of the app.
// we don't have to be exactly in a parent component or in a child component ..
// we can access  that state from anywhere ..
// then we are going to import
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers"; // reducers folder er index.js theke ashbe .. // combineReducers ta niye ashlam..
// now lets set it up

import App from "./App";

// to set redux we first have to create store so that's going to be
const store = createStore(reducers, compose(applyMiddleware(thunk))); // createStore duita jinish ney ..

// now we can wrap our application with a provider component

ReactDom.render(
    // last thing .. we need to specify the store

    <Provider store={store}>
        {/* amader application successfully redux use kortese .. and we can start
        using all of its capabilities 
        -> first we have to dispatch out get posts action and we are going to do that into our app.js 
        
        */}
        <App />
    </Provider>,
    document.getElementById("root")
);
