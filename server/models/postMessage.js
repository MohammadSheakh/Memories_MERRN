// we are going to utilize the possibilities of mongoose

// external imports
import mongoose from "mongoose";

//first we have to create a mongoose schema
const postSchema = mongoose.Schema({
    // which gonna be a function .. which is going to have a object immediately in there
    // Schema -> with mongo db .. you can create documents that looks absolutely different
    // prottek ta post er ki ki jinish thaka lagbe .. shegula define korbo amra ekhane

    title: String,
    message: String,
    creator: String, // id of the person , who is creating it ..
    name: String, // so we still want to have the name .. but it is going to be the name of the person who is logged in
    // not something that we can type ourselves ..before .. we had to type in our name .. bcz we didn't have the login system..but now we do ..
    tags: [String], // arrays of String
    selectedFile: String, // we are going to convert an image into a String using that base 64
    // likeCount ekhon likes hoye gese ..
    likes: {
        // type: Number, // age type Number chilo .. ekhon array of strings
        type: [String],
        // default: 0, // additional information set korlam .. ejonno object nilam
        default: [], // default value age 0 chilo .. ekhon empty array
    },
    comments: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

// now that we have a schema .. we have to turn it into a model ..
// to do that .. we are going to say
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage; // we are exporting a mongoose model from the postMessage file
// and then on that model .. later on .. we will be able to run commands ..
// such as find, create, delete and update ..
// amader model done .. ekhon amra aro route add korte pari ..
