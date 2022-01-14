// so, how are these routes going to look like ..
// basic structure jehetu age thekei ase .. shehetu shegula age import kore niye ashte hobe posts.js theke
//external imports

import express from "express";
const userRoutes = express.Router(); // setup our Router.. means create an instance of a router ..

// internal imports
import { signin, signup } from "../controllers/user.js"; // then we have to get some of the controllers from our controllers

// start adding our routes .. http://localhost:31313/user/

userRoutes.post("/signin", signin); // why this is a post route.. because you have to send some data to the back end
// more specifically you have to send all of the details from the form to the back end.. form sign in and sign up
// is the best way to explain how does the post request work ...you need it to be post request bcz you have to send
// all the information from the login form to the back-end ..and then back-end does something based on that information
// in this case ... it is going to sign in the user

// so what are we going to do when we go to sign in ...we are going to call our sign in controller

userRoutes.post("/signup", signup);

// router.get(
//     "/",
//     getPosts /*(req, res) => {
//     res.send("This Works from router!");
// }*/
// );
// router.patch("/:id", updatePost); // patch is used for updating existing document..
// // forward slash id .. and thats going to be dynamic ..  bcz.. we need to know the
// // ID before edit something ...

// router.delete("/:id", deletePost); // ekhon eta amader controller theke import korte hobe

// // for like post
// router.patch("/:id/likePost", likePost); // liking something is actually updating it ..

// export default router; // finally we have to export default this ..
// // index.js e ei router ta import korte hobe ..
export default userRoutes;
