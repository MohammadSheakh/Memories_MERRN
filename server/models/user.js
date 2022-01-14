// now the situation is going to be similar to what we have with the postMessage Model ...

import mongoose from "mongoose";

// now we have to create a schema ..
const userSchema = mongoose.Schema({
    // er moddhe amra ekta object dibo ..
    // inside of the object we put all of the necessary details ..
    name: {
        type: String,
        // required: [true, "Why no bacon?"],
        required: true,
        trim: true,
    },
    email: {
        type: String,
        // required: [true, "Why no bacon?"],
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    id: {
        type: String,
    },
});

// and finally we have to create a model .. which we export from this file ..
export default mongoose.model("User", userSchema); // model er nam ki dite chai , schema konta hobe ..
// ekhon controller er moddhe ei Model ta import korbo
