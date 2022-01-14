// inside of this .. we are going to add all the routes that have to do something with posts both being
// that carts that we see previously..

//external imports

import express from "express";
// where do we use that auth middleware.. and the answer is .. in the routes ..
// for example .. when somebody likes something .. in that case .. we want to use that middleware ..
// so first of all lets import it on this file ..
import auth from "../middleware/auth.js"; // back-end e jehetu asi .. tai auth.js bolte hobe
// now we wanna add it before specific actions for example all of the users .. no matter if they are logged in
// or not .. they can see all the posts but to create a post .. you need to have your own id .. you need to be
// logged in ..

const router = express.Router(); // setup our Router ..

// internal imports
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostsBySearch,
    getPost,
    commentPost,
} from "../controllers/posts.js";

// start adding our routes .. http://localhost:31313/posts

router.get(
    "/",
    getPosts /*(req, res) => {
    res.send("This Works from router!");
}*/
);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost); // patch is used for updating existing document..
// forward slash id .. and thats going to be dynamic ..  bcz.. we need to know the
// ID before edit something ...

router.delete("/:id", auth, deletePost); // ekhon eta amader controller theke import korte hobe
/**we also need to implement the logic for deleting only the post that you created ..  same goes for updating
 * delete post and update post are going to managed on front-end .. because ..what we have to do is disable user
 * from deleting something .. well .. if he is not the creator of the post .. simply remove the delete button ..
 * its not going to even be there .. he wont be able to click it ..
 */

// for like post
router.patch("/:id/likePost", auth, likePost); // liking something is actually updating it ..
/**we still have to implement the logic for liking only one specific post .. */
/** like post is going to be managed on the back-end */

router.post("/:id/commentPost", commentPost);

export default router;
// index.js e ei router ta import korte hobe ..
