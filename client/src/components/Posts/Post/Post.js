import React from "react";
import useStyles from "./styles";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    ButtonBase,
} from "@material-ui/core";

// also import some icons ...
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// moment library
import moment from "moment";
import { useDispatch } from "react-redux"; // reducer setup er jonno
import InfoIcon from "@material-ui/icons/Info";

import { useNavigate } from "react-router-dom";
import { getPost, likePost, deletePost } from "../../../actions/posts"; // action import korlam ..

const Post = ({ post, setCurrentId }) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch(); // dispatch ta initialize korte hobe ...

    /**
     * 1 like, 2 likes, 3 likes.. and if you like something .. but other people don't like something ..
     * you have to have a different message .. so shob logic consider korte amra ekta Post component  er Sub
     * Component create korbo ..
     */
    // user is just coming from the local storage ..
    const user = JSON.parse(localStorage.getItem("profile")); // user er upor base kore jehetu like ta kaj korbe ..
    const Likes = () => {
        if (post?.likes?.length > 0) {
            // we are first checking if a current person likes something or if he didn't like something
            // we can check that in two ways .. we are checking if the likes array contains .. the id of the current
            // person ..and that can be either the google id , if the person did the OAUTH .. or it can be a custom
            // id from the database..
            // if that is the case .. we want to say .. you and a certain number of people like something .. or
            // the post has one like or multiple likes you can see the "s" there ...
            // and then if the person didn't like it .. we can just say .. the number of like or likes .. and so on ..
            // and then if nothing happen .. if you are the first to like it ... its just like ..
            return post.likes.find(
                (like) => like === (user?.result?.googleId || user?.result?._id)
            ) ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;
                    {post.likes.length > 2
                        ? `You and ${post.likes.length - 1} others`
                        : `${post.likes.length} like${
                              post.likes.length > 1 ? "s" : ""
                          }`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{post.likes.length}{" "}
                    {post.likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        } else {
            return (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;Like
                </>
            );
        }
    };

    const openPost = (e) => {
        // dispatch(getPost(post._id, navigate));

        ////////////////////////////////////////////////🔴🔴 ei navigate ta may be lagbe na .. dekhte hobe pore
        navigate(`/posts/${post._id}`);
    };

    return (
        // <>
        //     <h1>POST</h1>
        // </>
        <Card className={classes.card}>
            {/* ///////////////// Normally ekhane Button Base add kora ase  */}
            <CardMedia
                className={classes.media}
                image={
                    post.selectedFile ||
                    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                title={post.title}
            />
            <div className={classes.overlay}>
                {/* * One more thing to do .. that is exchange the creator for name in our post .. That is going
                 * to be right here .. in Post.js .. before creator was the name of our person ..  but now
                 * its not going to be the creator ... it is going to be simply name .. we change that ..
                 * the creator .. is now the id of the person who is creating it ..   */}

                {/* <Typography variant="h6">{post.creator}</Typography> */}
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            {/* 🔴🔵 Edit Button Show korbo shudhu post ta jokhon current logged in user
            er nijer post hobe tokhon ..post er creator id ar user er id same hoite hobe arki  */}
            {(user?.result?.googleId === post?.creator ||
                user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    {/* You can see that our user also has the edit button .. and the { delete button
                at last } we still haven't changed those for non-logged in user .. Thats gonna
                be the next step and we also have the like button .. now if we log out.. 
                we can not create new ones.. means new memory .. or we cannot like other post
                ... of course ... the edit, delete and like shouldn't be here as well ...
                because if your not logged in .. you shoudn't be able to do those actions ..  */}
                    <Button
                        style={{ color: "white" }}
                        size="small"
                        onClick={() => {
                            setCurrentId(post._id);
                            /**
                             * here we have to keep track of current id .. to do that ..
                             * ekhon amra go back korbo app.js and post.something e ..
                             */
                        }}
                    >
                        <MoreHorizIcon fontSize="default"></MoreHorizIcon>
                        Icon
                    </Button>
                </div>
            )}
            {/* ///////////////// May be ekhane Button Base add korte hobe */}
            <ButtonBase
                component="span"
                name="test"
                className={classes.cardAction}
                onClick={openPost}
            >
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>
                    {post.title}
                </Typography>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {post.message}
                    </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button
                    style={{ color: "primary" }}
                    disabled={!user?.result}
                    size="small"
                    onClick={() => dispatch(likePost(post._id))}
                >
                    {/* <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp;
                    {post.likeCount} */}
                    <Likes />
                    {/* Likes Sub Component er logic upore likha hoise */}
                </Button>
                {/* 🔴 We have to check if the current POST wast created from the
                current user .. only in that case ..we want to show the current
                Delete button .... so to do that .. i am going to open the logic
                block .. i am gonna check if user?.result?.googleId .. we already had that .. so we are checking
                if the id is equal to  post?.creator ..... so we are checking if the currently logged in user 
                via google .. has the same id as the creator of the post .. or there is a second possibility
                if the user?.result?._id if that is equal to post?.creator means manual logged in user is the creator
                of this post ..           only if that is the case .. then we want to show the delete button */}
                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    // tailei amra button ta show korbo ..mane post er creator logged in user na hoile take Post Delete
                    // korar button show korbo na ..
                    <Button
                        style={{ color: "primary" }}
                        size="small"
                        onClick={() => dispatch(deletePost(post._id))}
                    >
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;
