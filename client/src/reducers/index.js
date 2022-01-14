// this also seems like a good starting point for redux
// Global index.js e redux initialize kore ashte hobe age ..
import { combineReducers } from "redux";

import posts from "./posts"; // ekhon amra reducers folder er posts.js file e jabo
import auth from "./auth";

export const reducers = combineReducers({
    // call as a function and put an object inside it ..
    // in here we can use all of the individual reducers that we have.
    // in our case, we are only going to have posts.
    // so, for that reason, we have to import posts..
    posts: posts,
    auth: auth,
});

// combineReducers  e holo reducers
