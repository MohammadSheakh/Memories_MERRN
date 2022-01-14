/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// useDispatch use kori action dispatch korar jonno .. useSelector use kori state theke kichu jinish select korar
// jonno 
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getPosts } from '../actions/posts'; 
// amader ekhane getPosts action o import kora lagbe .. 
import useStyles from './styles';

// Our Pagination is going to be a react component called Paginate ... and its going to be of course a functional
// component ..  Home Component theke page variable ta props akare ashse .. 
const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts); // back-end e set korsilam and value ta front-end
  // e state er maddhome pathaisilam .. object hishebe ashsilo .. tai destructure kore nisi 
  const dispatch = useDispatch();

  const classes = useStyles();

  // inside here .. we can create useEffect .. jei useEffect ta Home Component e chilo .. sheta ekhane niye ashsi
  // ekhane getPosts action dispatch kortesi .. tar moddhe Page ta pass kore disi .. jei page ta Home Component 
  // theke ashse mane query akare value ashbe .. 
  useEffect(() => {
    // we want to fetch the posts any time that the page changes .. to fetch the posts .. as always we are going
    // to use dispatch with redux 
    // page change hoilei getPosts action dispatch hobe 
    if (page) {
      dispatch(getPosts(page));
      // specific page er jonno Post Fetch korbe .. 
    }
  }, [dispatch, page]);

  return (
    // Pagination Component ta return korbo .. jeta amra import korsi .. kichu props receive kore .. 
    <Pagination
      classes={{ ul: classes.ul }}
      /** count ar page variable er value prothome static holeo pore sheta dynamic hobe ..  
       * for count we will have to dynamically fetch the number of total pages depending on the number of posts we
       * currently have .. 
      */
      /// count={10}
      count={numberOfPages} // count hocche numberOfPages .. may be total number of pages ..  static vabe amra {5} value set kore rakhte pari .. pore dynamic hobe 
      page={Number(page) || 1} // current page .. if we dont have a page number .. we want to render one .. to be on the first page 
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        // dynamic block of code with a callback function .. its going to take an item as a prop ... and we are 
        // going to instantly return something .. PaginationItem return kortesi .. er moddhe prop hishebe 
        // item ta spread kore pass kore dilam .. we went to pass all of the data from the item .. 
        // then we are going to say this Component is going to be a special Link Component .. finally we have to
        // say where is this pointing to .. ekta link e point kore dilam.. mane holo 3 number page e click 
        // korle she 3 number page e niye jabe .. /post/?page=3 .. query string hishebe .. page er value assign hoye
        // jabe .. 4 number button e click korle .. /post/?page=4 hobe ..  ei page er value back-end e amader kaje
        // lagbe.. shekhane amra 3 othoba 4 number page er jonno nirdishto kichu post user ke dekhabo ..  
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        //🔴 < PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};

export default Paginate;
// with that said .. our currently static pagination component is now done .. So, we can import in somewhere and
// start using it .. We are going to import it inside of our home component .. 