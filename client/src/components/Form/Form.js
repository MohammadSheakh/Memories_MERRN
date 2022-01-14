import React, { useState, useEffect } from "react"; // lets create State using useState
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
// import FileBase64 from "react-file-base64";
import FileBase64 from "react-file-base64";
// now we have to dispatch that action .. which come from action/posts.js... to do that we can go into the form
// in here .. we can import  useDispatch from react-redux ..
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import ChipInput from "material-ui-chip-input";

// now we have data for the post  ... now use the useEffect to populate the value for the form
// eta temon kichui na ... setPostData er moddhe value assign kore dite hobe ...

const Form = ({ currentId, setCurrentId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // now this allow us is actually dispatch actions ..
    // the question is where do we want to dispatch it ..well .. of course on the handle submit ..

    const [postData, setPostData] = useState({
        // inside of the empty object .. we need to specify the properties .. that the object is going to
        // start with.. so, in here we need to mention .. everything that it's gonna have ..
        // creator: "", // ekhon ar creator lagbe na ... karon user e login korte pare and post korte pare .. dynamic vabe post er creator er name add hobe ..
        title: "",
        message: "",
        tags: [],
        selectedFile: "", // we are going to convert an image into base-64-image .. just in a second ..
    }); // initially empty object ...
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem("profile")); // 🔴🔴

    /**
     *
     *  next step is the update the field of the form with the values of the post we want to update ..
     *  karon amra jokhon ekta post edit korar jonno click korbo .. amra kintu ekdom shuru theke post
     *  update korar jonno koshto kore likhte chai na ... form ta age theke fillup thakle amar jonno shubidha ..
     *  So to do that ............... we have to fetch a new post ... means fetches some data from redux ...
     *  Posts.js e amra post fetch korar jinish ta korsilam .. useSelector() use kore amra data fetch kori
     */
    //  post hobe karon find method is returning one singular thing ..
    ///🔵const post = useSelector((state) => {
    // as a parameter amra whole state ta pabo .. jeta whole global redux store or state
    // and then we can immediately return state.posts
    /// return state.posts;   // shob post return korar jonno
    // amra kivabe janbo je .. eta state.posts.. amra jodi reducer folder er index.js e jai .. tahole
    // shekhane amra dekhte parbo combineReducers er moddhe posts ta ke pathano hoyechilo ..
    // shei post ashsilo reducer folder er e posts namok arek file theke...

    // amra to shob post return korte chai na .. we only want data for the updated post ..
    // ternary operator use korbo ...if we have a current_id .. so, it is not null .. then .. we want to
    // loop over state.post. and we want to call a find method on that ..  more specifically we want to find
    // a post that specifically.. "p" in this case .. that has the same id ..as our current id ...
    /// 🔵   return currentId ? state.posts.find((p) => p.id === currentId) : null;
    ///});

    /**
     * we have to somehow get the current _id of the post we are on ..
     * jekono post e upore right corner e ekta button ase .. shei button ta holo
     * post update korar button .. keo jodi button e click kore .. tahole amra
     * post er id ta .. form component er kache pathiye dibo ..
     * that way we can change this from creating a memory to editing a memory..
     * uder the specific ID.. ekhon button ta hocche Post Component er under e
     */
    // state er moddhe ekhon ar shudhu array of post nai .. ekhon ekta object er moddhe post er array ta ase
    // tai post ta object theke destructure kore nilam
    const post = useSelector((state) => {
        console.log("Post from Form Component : 💻💻", state.posts.posts); // jeno amra specific post khuje pai
        return currentId
            ? state?.posts?.posts.find((message) => message._id === currentId)
            : null;
    });

    useEffect(() => {
        // now we have data for the post from redux..now use the useEffect to populate the value for the form
        if (post) setPostData(post);
    }, [post]); // [] er moddhe amra bole dei ... when this callback function should be run...
    // jei jei value er jonno ei useEffect ta run korbe .. sheta [] er moddhe bole dibo ...
    // ekhane jemon post value change hoilei useEffect ta run korbe ...
    // ekhon arekta kaj o korte hobe ... jokhon submit button press kora hobe .. tokhon jeno
    // shob input clear hoye jay .. eta korar jonno amader clear function create kora lagbe ..

    const handleSubmit = async (e) => {
        // once the use submit .. we want to send over a post request .. with all the data that user typed in
        // first of all we always have to say event that prevent default .. not to get the refresh in the
        // browser ..
        // and in here .. we are going to dispatch an action ..
        e.preventDefault();
        ///dispatch(createPost(postData)); // this is it is createPost and inside of there.. we are going to pass all the
        // data .. from our state .. // we have to import createPost from actions ...
        // now we are making that request .. once we click the submit button ...
        if (currentId === 0) {
            // current id jodi na thake .. taile amra createPost function
            // dispatch korbo ...
            // 🔴🔵dispatch(createPost(postData));
            dispatch(
                createPost({ ...postData, name: user?.result?.name }, navigate)
            );
            /**
             * now we are remove that name .. but  how is our back-end .. going to know ... what name do
             * we use .. well .. what you can do .. is right in here when you are sending that specific user
             * you can add it .. so if you dispatch a creation .. we can specify the post data ... so we can
             * create a new object .. we can spread the postData ..  So, this is not going to change ..
             * anything we had so far .. but now .. we can add name property .. and name is going to be equal
             * to the users that currently logged in .. and that user is going to be stored in local Storage ..
             * so, how can we get the user .. we can say at the very top ..  const user = JSON.parse(localStorage.getItem("Profile"))
             * So, this is going to make sure to grab the user for you .. now in here ..
             * One more thing we can do it in here.. check if there is no currently logged in users ..
             * In that case .. we want to show a card .. that says .. no .. you cannot create a post right now ..
             */
        } else {
            // post er current id jodi thake .. tar mane hocche post
            // create korar ar kono kaj nai .. ekhon post update korte hobe
            // tahole postData er shathe
            // post er currentId tao .. postData er shathe dispatch
            // function e pathiye dibo ...
            // 🔴🔵dispatch(updatePost(currentId, postData));
            dispatch(
                updatePost(
                    currentId,
                    { ...postData, name: user?.result?.name },
                    navigate
                )
            );
        }

        // 🔴 Once the action is dispatched ... then we go to reducers

        // ekhon arekta kaj o korte hobe ... jokhon submit button press kora hobe .. tokhon jeno
        // shob input clear hoye jay .. eta korar jonno amader clear function create kora lagbe ..

        clear();
        // update korar shomoy submit button click korar shathe shathe jeno post update hoye jay
        // ejonno amader ekhon kaj korte hobe ..sheta korar jonno amader 🔵 App.js e jete hobe ..
        // clearing the input means changing the current id .. jokhon e amra current id change kortesi ..
        // tokhon app er moddhe .. app dispatch korbe getposts() action ..
    };

    // ekhon arekta kaj o korte hobe ... jokhon submit button press kora hobe .. tokhon jeno
    // shob input clear hoye jay .. eta korar jonno amader clear function create kora lagbe ..
    const clear = () => {
        setCurrentId(0); // post jehetu edit kora shesh ... tai ekhon post er id 0 kore dilam ...
        setPostData({
            // creator: "", // creator text field tai uthai disi .. karon ekhon post er creator dynamic vabe add hobe ..
            title: "",
            message: "",
            tags: "",
            selectedFile: "",
        });
    };

    /*
     * 🔵 One more thing we can do it in here.. check if there is no currently logged in users ..
     * In that case .. we want to show a card .. that says .. no .. you cannot create a post right now ..
     */
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's
                    memories.
                </Typography>
            </Paper>
        );
    }
    const handleAddChip = (tag) => {
        //setPostData({ ...postData, tags: [...postData.tags, tag] });
        setPostData((prevState) => ({
            ...prevState,
            tags: [...prevState.tags, tag],
        }));
    };

    const handleDeleteChip = (chipToDelete) => {
        setPostData({
            ...postData,
            tags: postData.tags.filter((tag) => tag !== chipToDelete),
        });
    };
    return (
        <>
            {/* now lets create our form   🔴🔴part-4 theke copy korte hobe full 🔴🔴*/}

            {/* lets start by adding the JSX to our form  */}
            <Paper className={classes.paper}>
                <form
                    autoComplete="off"
                    nonValidate
                    className={`${classes.form}${classes.root}`}
                    onSubmit={handleSubmit}
                >
                    {/* logic for text change ... based on condition  */}
                    <Typography variant="h6">
                        {" "}
                        {currentId ? "Editing" : "Creating"}Creating a Memory
                    </Typography>
                    {/* 
                    //🔴 ekhon post er creator er nam ar type kore nite hobe na .. dynamically add hobe .. 
                    <TextField
                        name="creator"
                        variant="outlined"
                        label="Creator"
                        fullWidth
                        value={postData.creator} // store in the state // name of the state is postData
                        onChange={(e) =>
                            setPostData({
                                ...postData,
                                creator: e.target.value,
                            })
                        } 
                    /> */}
                    {/* Whole data from our post .. is gonna be post into our postData object in the state.. and
                    then each object key is going to be a specific text field .. now lets create that state ..  */}
                    {/* how are we going to change the value of the state field using this onChange...  */}
                    <TextField
                        name="title"
                        variant="outlined"
                        label="Title"
                        fullWidth
                        value={postData.title} // store in the state // name of the state is postData
                        onChange={(e) =>
                            setPostData({ ...postData, title: e.target.value })
                        }
                    />
                    <TextField
                        name="message"
                        variant="outlined"
                        label="Message"
                        fullWidth
                        value={postData.message} // store in the state // name of the state is postData
                        onChange={(e) =>
                            setPostData({
                                ...postData,
                                message: e.target.value,
                            })
                        }
                    />
                    <div style={{ padding: "5px 0", width: "94%" }}>
                        <ChipInput
                            name="tags"
                            variant="outlined"
                            label="Tags"
                            fullWidth
                            value={postData.tags}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip) => handleDeleteChip(chip)}
                        />
                    </div>
                    {/* <TextField
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags} // store in the state // name of the state is postData
                        // onChange={
                        //     (e) =>
                        //         setPostData({
                        //             ...postData,
                        //             tags: e.target.value.split(","),
                        //         })
                        //     // we want to split this string into an array by comma then give me an array of all the
                        //     // tags
                        // }
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}
                    /> */}
                    <div className={classes.fileInput}>
                        {/* // inside of there .. we have to use that package we
                        installed at the start .. // its called .. file base .. */}
                        <FileBase64
                            // we have to specify lot of property in here ..
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                                setPostData({
                                    ...postData,
                                    selectedFile: base64,
                                })
                            } // that we are receiving from here
                        />
                    </div>

                    <Button
                        className={classes.buttonSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        fullWidth
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={clear}
                        variant="contained"
                        color="secondary"
                        size="small"
                        fullWidth
                    >
                        Clear
                    </Button>
                    {/*  now that if we make a post request .. we are going to be
                    able to add a new post .. into our database.. connected to
                    our server .. now lets add the API request .. and the
                    action... for the post request .. First Lets go to the API
                    .. means API folder ... index.js file ..  */}
                </form>
            </Paper>
        </>
    );
};

export default Form;
