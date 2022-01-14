import React, { useState, useEffect } from "react";
import {
    Container,
    Grow,
    Grid,
    AppBar,
    TextField,
    Button,
    Paper,
} from "@material-ui/core";
import { useDispatch } from "react-redux"; // is allowed to do dispatch an action ..
import { useNavigate, useLocation } from "react-router-dom"; // useLocation-> on which page are we currently on ..
// useNavigate -> we can re-navigate to certain pages and search terms ..
import ChipInput from "material-ui-chip-input"; // normal input but it works great for tags ..

/// import { getPosts } from "../../actions/posts"; // // ei function ta useEffect er moddhe dispatch er moddhe bole dite hobe
import { getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import useStyles from "./styles"; // update kora hoy nai ...

/**
 * we also have to set up our url search params ...   we are going to use that to know .. on which page are we
 * currently on .. and what search term are we looking for ..
 *
 */
function useQuery() {
    return new URLSearchParams(useLocation().search);
    // that simply allow us to use it as a hook...
}

const Home = () => {
    /**
     * Current Id State ta amader ke ekhane declare korte hoise .. karon amader
     * ke state ta share korte hobe Post ar Form Component er moddhe ..
     * ar amader App hocche tader parent component .. later on we are going to
     * refactor this to use redux ..  but for now we does use plain react ..
     */
    const [currentId, setCurrentId] = useState(0); // set current id to be null
    // at the start if you dont have the id selected..
    // we have to define that dispatch so we need to say
    const dispatch = useDispatch(); // now that we have access to this dispatch .. we need to find a way where
    // we are actually going to dispatch the action .. and eta useEffect er moddhe kora best ..

    /// useEffect(() => {
    ///     dispatch(getPosts()); // finally we can use this dispatch .. to dispatch an action ..
    ///    // Right now we dont have any action here .. so our next goal is to create an action ..
    ///     // we can do that right here by importing it ..
    ///     // 🔴Action Folder er Post file theke getPosts() export korte hobe

    ///     // form theke update korar shomoy submit button click korar shathe shathe jeno post update hoye jay
    ///     // ejonno amader ekhon kaj korte hobe ..sheta korar jonno amader 🔵 App.js e jete hobe ..
    ///     // clearing the input means changing the current id .. jokhon e amra current id change kortesi ..
    ///     // tokhon app er moddhe .. app dispatch korbe getposts() action .. and that is going to make sure that
    ///     // every change we are going to get new posts.. er jonno controllers er moddhe mongoose import kore nite
    ///     // hobe ...
    /// }, [currentId, dispatch]);
    /**
     * We getting the page and the search query from the query parameters ..but now .. lets put that page to use
     * we will no longer fetch the post from the Home Component ..  we are going to remove the useEffect..
     * and we are going to pass our page straight to our Pagination Component as a prop.. that way we can go to
     * our Pagination component and
     */

    const classes = useStyles();
    const query =
        useQuery(); /** query is where we will be getting our page info form .. */
    const page = query.get("page") || 1; // this is going to read our url and see .. if we have a page parameter in
    // there .. if so, it's going to populate this page variable .. page parameter query hishebe url e thakle valo
    // naile amra etar value 1 dhorbo . mane first page ..
    const searchQuery = query.get("searchQuery");

    const [search, setSearch] = useState(""); // Search korar jonno State...
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    //logic for search Post ..
    const searchPost = () => {
        // search state er value gula trim korlam.. othoba tag array er jei value gula ase shegula thakleo hobe
        if (search.trim() || tags) {
            /**
             * we want to dispatch some logic to fetch our searched post ..dispatch korte amader redux lagbe ..
             * amra amader database ke tokhon e modify korbo jokhon specific post er jonno search kora hobe ..
             * we have to tell the database to only return us the posts that match our query .. to send a nice
             * message to the database .. we can use Redux .. so lets first create a redux action .. and a reducer ..
             * to manage our posts ..To have something to dispatch .. we need to create an action for searching the
             * posts ...ejonno amader actions folder e gia ..ekta action create korte hobe ..shekhane amra
             * getPostBySearch nam e ekta action create korbo ..
             */
            // action dispatch korbo..er moddhe search ar tags array er item gula comma dia join kore send kore dibo
            /** ekta object send kora hocche .. jei nam e receive kora hobe .. sheta dot search othoba sheta dot tags er maddhome value gula access kora jabe  */
            console.log(
                "search.trim() and tags from searchPost Home Component 🙄 HandleSubmit : ",
                search,
                tags
            );
            dispatch(getPostsBySearch({ search, tags: tags.join(",") })); //search query object parameter hishebe nibe
            // array pass kora jay na .. String pass korte hoy
            // search korlei to hobe na .. specific URL e amader ke result ta show korte hobe ..so amra navigate
            // kore dicchi ...
            navigate(
                `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(
                    ","
                )}`
            );
        } else {
            // state er value othoba tag na thakle / e navigate korbo mane home page e navigate korbo
            navigate("/");
        }
    };

    // Enter Press korle jeno Post Search kora shuru kore sheta ensure kortesi ekhane ...
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    // ager tags gular shathe new tag tao array ke add kore dilam ... array with state thakle .. prothome
    // previous tags gula spread korte hoy .. tarpor new tag add korte hoy ..
    const handleAddChip = (tag) => setTags([...tags, tag]);

    // delete korte gele mainly amra filter kori ...tags array te filter method chalale .. prottekta tag pabo ...
    // tag jodi chipToDelete er same na hoy ... tahole take abar array tei rakhbo ..
    const handleDeleteChip = (chipToDelete) =>
        setTags(tags.filter((tag) => tag !== chipToDelete));

    return (
        // <Grow in>
        //     <Container>
        //         <Grid
        //             container
        //             justify="space-between"
        //             alignItems="stretch"
        //             spacing={3}
        //         >
        //             <Grid item xs={12} sm={7}>
        //                 <Posts setCurrentId={setCurrentId} />
        //             </Grid>
        //             <Grid item xs={12} sm={4}>
        //                 {/* 🔴we are going to pass currentId over to the form
        //                     and Post Component .. */}
        //                 <Form
        //                     currentId={currentId}
        //                     setCurrentId={setCurrentId}
        //                 />
        //             </Grid>
        //         </Grid>
        //     </Container>
        // </Grow>
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={3}
                    className={classes.gridContainer}
                >
                    <Grid item xs={12} sm={6} md={9}>
                        {/* 🔴 All Memory Post are here */}
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar
                            className={classes.appBarSearch}
                            position="static"
                            color="inherit"
                        >
                            {/*🔴AppBar er moddhe Search korar jonno duita option
                            thakbe .. ekta TextField ar arekta ChipInput */}
                            <TextField
                                // onKeyPress={handleKeyPress}
                                onKeyDown={handleKeyPress}
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search} // ekhane jei value diben sheta TextField e dekhabe .. amra ekhon State er value show kortesi
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: "10px 0" }} // 10px top bottom , 0 pixel for left right
                                value={tags} // value hobe tags array er value gulai .. value dynamic hote hobe .. state theke ashte hobe
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search Tags"
                                variant="outlined"
                            />
                            {/*🔴 Search Korar Button */}
                            <Button
                                onClick={searchPost}
                                className={classes.searchButton}
                                variant="contained"
                                color="primary"
                            >
                                Search
                            </Button>
                        </AppBar>
                        {/* 🔴Notun Post Create korar form  */}
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                        {/* 🔵 Pagination is here */}
                        {!searchQuery && !tags.length && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                        {/* We getting the page and the search query from the
                        query parameters ..but now .. lets put that page to use
                        we will no longer fetch the post from the Home
                        Component .. we are going to remove the useEffect.. 
                        and we are going to pass our page straight to our
                        Pagination Component as a prop.. that way we can go to 
                        our Pagination component and  */}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
