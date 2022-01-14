import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";

// Now we have been working a lot with redux data passing .. but how do we actually retrieve the data from
// within our components .. so sheta korte amra ekhon  in the component that actually needs the posts .. and
// thats gonna be .. Posts.js Component .. inside there .. we have to somehow .. fetch the data from the global
// redux store .. we can do that with the help of something known as selectos
import { useSelector } from "react-redux";

// className={classes.appbar}
const Posts = ({ setCurrentId }) => {
    const classes = useStyles();
    /**we have to fetch a new post ... means fetches some data from redux  */
    //** Successfully Fetching the post here ... */
    const { posts, isLoading } = useSelector((state) => {
        /**🔴 age amader shudhu [] array of posts chilo state e  kintu ekhon amader ekta object ache ..
         * {posts: []} // shekhane posts nam e ekta property ache ..tar moddhe array of post ase ..
         * reducer dekhle bujha jabe ...
         * amader ekhon useSelector er age shudhu posts er jaygay {posts} likhte hobe .. mane posts destructure
         * kore nite hobe ... karon jehetu object .. onek gula jinish e ase ..posts o ase ..
         * amra array theke object e change korar main reason ta hocche amader multiple things ase .. amader
         * isLoading property ase , number of pages ase .. aro onek jinish ase ..
         */
        // as a parameter amra whole state ta pabo .. jeta whole global redux store or state
        // and then we can immediately return state.posts
        return state.posts;
        // amra kivabe janbo je .. eta state.posts.. amra jodi reducer folder er index.js e jai .. tahole
        // shekhane amra dekhte parbo combineReducers er moddhe posts ta ke pathano hoyechilo ..
        // shei post ashsilo reducer folder er e posts namok arek file theke...
    });
    // so amra posts peye gesi ..
    console.log("posts 🧾🔥🔥🔥 from Posts.js Component : ", posts);
    if (!posts?.length && !isLoading)
        return "No Posts {from Posts.js Component  for developer}"; //🔴🔵 mane hocche jodi post o na thake ar Loading o na kore .. tar mane amader kono post e nei
    return (
        // <>
        //     <h1>POSTS</h1>
        //     <Post></Post>
        //     <Post></Post>
        // </>
        //🔴 !posts?.length ? (
        isLoading ? (
            <CircularProgress />
        ) : (
            // we are going to create a grid of our post
            <Grid
                className={classes.container}
                container
                alignItems="stretch"
                spacing={3}
            >
                {
                    // write js logic here ..
                    // loop over the posts ...
                    posts.map((post) => (
                        // for each post .. we are gonna immediately return something ..
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} setCurrentId={setCurrentId} />
                            {/* as we are mapping with real post now .. not generic
                            ones.. we can send .. that individual value of a
                            post , to each Post component .. now we can go to singular Post component 
                            and implement the logic there */}
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
};

export default Posts;
