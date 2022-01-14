//starting point of server application
/**
 *
 * npm install
 *  body-parser -> going to enable us to send post request
 *  cors -> going to enable cross origin request
 *  express -> as a framework for creating routing of our application
 *  mongoose -> to create models for our posts
 *  nodemon -> automatically refresh the server
 * npm i dotenv -> our application can be able to read the process.env variables
 * npm i bcrypt
 * jsonwebtoken
 */

//external imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// internal imports
import router from "../server/routes/posts.js"; // now we can use express middleware to connect this means this routes to our application ..
import userRoutes from "../server/routes/users.js"; // users.js file theke ashbe ..

// 🔵 first ei app initialize korte hoy
const app = express();
dotenv.config();
//image jehetu send korbo ..
app.use(bodyParser.json({ limits: "30mb", extended: true })); // helps to send our request
app.use(bodyParser.urlencoded({ limits: "30mb", extended: true }));

app.use(cors());

// time to connect our server application with a real database .. mongo db
// 🔗https://www.mongodb.com/cloud/atlas // specially their cloud atlas version of mongo db ..
// they are going to host our database on their cloud ..
// 🔗 https://www.mongodb.com/atlas/database

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

// finally we use mongoose to connect our database ..
mongoose
    .connect(CONNECTION_URL, {
        // object with all options
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        // we are gonna chain a dot then .. because this returns a promise..
        // if connection is successful call our app .. then on it .. we want to listen
        app.listen(PORT, () => {
            // run once when our application run successfully
            console.log(
                `Backend Server is running ! on port : ${PORT} link : http://localhost:${PORT}/posts
                ----------------------------------------------------------------------------------------------------Start------------------------------
                -----------------------------------------------------------------`
            );
        });
    })
    .catch((err) => {
        console.log(err.message);
    });

// mongoose.set("useFindAndModify", false); // this again .. make's sure that we dont get any warning in the console

app.use("/posts", router); // postRoutes er shob gula route .. /posts dia shuru hobe ..

// ekhane ekhon amader user er jonno routes add korte hobe ...
app.use("/user", userRoutes); // import kore nite hobe routes file theke ... /user dia shuru hobe ...
