// rafce
import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
/** useSelector karon.. to get the data about the post  */
import moment from 'moment'; // moment with js library .. that deals with time 
import { useParams, useNavigate } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
  
import CommentSection from './CommentSection';

const PostDetails = () => {
  console.log("💬🔴🔵Post Details Page");
  // fist we are going to get the data about the post 
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();
  const { id } = useParams(); /// amader url ta holo  /post/123

  useEffect(() => {
    // er moddhe amra ekta action dispatch korte pari and jei action amra dispatch korbo .. shei action ta hocche
    // getPost action .. she parameter hishebe id expect kore .. mane kon post she show korbe ! kon id er !
    dispatch(getPost(id));

    /**
     * now is the time that we create this action and make an api to the back-end .. and thats going to serve us
     * all the details about our specific post
     */
    // ei useEffect ta tokhon e fire hobe jokhon id change hobe 
  }, [id]);

  /**
   * Interesting thing about the recommended Posts.. is that we are gonna use the same endpoint we created
   * before get posts by search .. So i'm going to create one more useEffect here ... and yes .. you can have
   * multiple useEffect 
   */

  useEffect(() => {
    // So, when ever the id changes the post changes .. we want to do something .. 
    // for each post .. we want to see if the post exists and if it does ... we want to dispatch a new action
    // creator .. that action creator is not going to be getPost anymore .. its going to be getPostsBySearch
    // the one we created before .. finally we have to provide that search query in there .. we are not 
    // looking for search here .. so none .. and we are looking only for tags here .. thats what we are going
    // to use to recommend the posts 
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
      // eta korle post populate hobe .. sheta amra upore useSelector er maddhome state ta niye ashsi 
      // finally amra oi posts gula use kore ekta recommended posts er list create korte parbo .. jeta amra nich
      // e kortesi 
    }
  }, [post]);

  // ei check gula kortei hobe ... 
  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`); // post e click korle .. shei page e niye jabe ... 

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  // finally amra oi posts gula use kore ekta recommended posts er list create korte parbo .. jeta amra nich
  // e kortesi .. posts er theke id ta destructure kore nicchi .. we want to keep all the posts but delete the
  // one .. where the underscore id is not equal to the current post id 
  // karon current post kokhonoi er own recommendedPosts er list e thakte parbe na .. ejonno amra eta kortesi
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments </strong></Typography>
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>

      {/* recommendedPosts jodi thake .. tahole amra kichu recommended post dekhate chai  */}
      {!!recommendedPosts?.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{/*🎯*/}{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{/*🎯*/}{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{/*🎯*/}{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {/*🎯*/}{likes.length}</Typography>
                <img src={selectedFile} width="200px" alt="not found img from PostDetails.jsx"/>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;