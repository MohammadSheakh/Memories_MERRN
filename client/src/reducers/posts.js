import {
    FETCH_ALL,
    FETCH_BY_SEARCH,
    FETCH_POST,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    COMMENT,
} from "../constants/actionTypes";
/**
 * age amader posts chilo ekta simple array of posts.. kintu ekhon amra ekta object pacchi.. jar moddhe
 * amader array of posts ta ache ..
 */

//eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, posts: [] }, action) => {
    // export default (state = [], action) => {
    /**
     * considering we change the way we view data .. we also have to change this state ... the state is
     * no longer just going to be  an array of posts .. its going to be an object .. thats going to have
     * the isLoading property and that isLoading is initially going to be set to true ..and also .. we are
     * going to have the posts array .............. now that we have changed this .. we also have to change
     * how to we get the data back .. once we like create update or delete posts .. the only thing we have to
     * do is we have to everywhere .. spread the state
     */
    switch (action.type) {
        case "START_LOADING":
            // amra ekta object return korbo.. we want to spread the state, that we currently have
            // and we only want to change the state of one variable and that is isLoading is going to true
            // if we want to start the loading
            return { ...state, isLoading: true };
        case "END_LOADING":
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data, // ekhon ar post shudhu action.payload na ... action file e gele bujha jabe
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };
        // return action.payload.data;
        case FETCH_POST:
            //FETCH_BY_SEARCH e posts send kortesilam..ekhon jehetu ekta post..amra post hishebe send kortesi
            return { ...state, post: action.payload.post };
        case LIKE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id == +action.payload._id) {
                        return action.payload;
                    }
                    return post;
                }),
            };
        default:
            return state;
    }
};
