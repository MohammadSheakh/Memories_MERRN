import {
    // string er bodole egula arek file theke niye ashlam
    START_LOADING,
    END_LOADING,
    FETCH_POST,
    FETCH_BY_SEARCH,
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    COMMENT,
} from "../constants/actionTypes.js";
// ekhon amader api folder er moddhe thaka index.js file use korte hobe ..
import * as api from "../api/index.js"; // .js ki deowa lage ? 🔴

// one more action creator
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost(id); // api call er moddhe id ta pass kore dite hobe
        //ekhon api endpoint create korte hobe api er index.js er moddhe

        dispatch({ type: FETCH_POST, payload: { post: data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

// api.createfetchPosts(); 1:13:45

// now we have to create actions .. more specifically action creators
// Action Creators are functions that return action

// app.js e jehetu eita use korte hobe .. tai eita export korte hobe ..
// action ta jokhon dispatch hobe ..amra sheta app.js er useEffect theke kortesi .. amra tokhon post reducer
// e chole jabo ..  shekhane amader ke logic handle korte hobe .. 'FETCHING_ALL' post er logic .. tokhon amra ei file e
// shob post fetch korbo API theke .. and then sending that data through the action.payload .. and finally amra reducer er moddhe
// action.payload ta return kore dibo.. .. action.payload tai amader actual post ..
/**
 * ei kotha gula ei file er porer kotha
 * Now we have been working a lot with redux data passing .. but how do we actually retrieve the data from
 * within our components .. so sheta korte amra ekhon  in the component that actually needs the posts .. and
 * thats gonna be .. Posts.js Component .. inside there .. we have to somehow .. fetch the data from the global
 * redux store .. we can do that with the help of something known as selectos ..
 *
 */
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING }); //post fetch korar age amra Start loading action ta dispatch kore dibo
        // i am going to fetch all the data from API // database theke data fetch korar try korsilam ..
        ///const { data } = await api.createfetchPosts(); // response er moddhe data object ta thake .. amra destructure kore nisi
        const {
            data: { data, currentPage, numberOfPages },
        } = await api.fetchPosts(page);
        // data object .. which we 🔴returning from the backend
        // data represent the posts
        ///dispatch({ type: FETCH_ALL, payload: data });

        console.log(
            "📢🔥🔥 data from getPosts .. action",
            data,
            "🎯Current Page from post actions getPosts",
            currentPage,
            "🎯numberOfPages from post actions getPosts",
            numberOfPages
        );
        dispatch({
            type: FETCH_ALL,
            payload: { data, currentPage, numberOfPages },
            /// payload: data,
        });
        // shob gula post fetch korar pore .. loading ta end kore dibo
        dispatch({ type: END_LOADING });
        // we are successfully using redux to actually pass or dispatch an action from the data from our backend
    } catch (err) {
        console.log("err from getPosts action", err.message, "🚁🚁", err); // never console.log err.message .. just console.log err .. that will give you
        // more information...
    }
    // // ekhane amra action declare korbo ..
    // const action = {
    //     type: "FETCH_ALL",
    //     payload: [],
    // };
    // // payload is usually the data where we store all of our posts ...
    // // finally we have to return it

    // /// return action;
    // // action return korar bodole.. redux thunk er jonno ebar amader action ta dispatch korte hobe ..
    // dispatch(action);
};

// action creator create kore fellam .. shomossha hocche amra asynchoronous data niye kaj kortesi ..
// to actually fetch the posts .. some time is going to have to pass .. and for that .. we have to use
// redux-thunk // eta amader ekta addition arrow function er shubidha dey ... amra dispatch er access pai..

// equal to an arrow function .. which then returns another arrow function .. with the dispatch right there ..
// that comes from redux thunk ..
export const createPost = (post, navigate) => async (dispatch) => {
    console.log("🧾📈📢post variable from posts action 🎯", post);
    console.log("🧾📈📢dispatch variable from posts action 🎯", dispatch);
    // finally a try catch block ..
    try {
        dispatch({ type: START_LOADING }); // 🚁🎯 loading Start korsi kintu end kori nai
        // we need to get that data .. destructure the data from the response ..
        const { data } = await api.createPost(post); // this is basically making an api request ..
        // a post api request to our backend server.. and we are sending a post right there ..

        // finally we are going to dispatch an action .. type of the action is going to be CREATE
        console.log(
            "🧾📈📢 data variable from posts action createPost: 🎯",
            data
        );
        dispatch({
            type: CREATE,
            payload: data,
        });
        dispatch({ type: END_LOADING }); // 🚁🚁 eta chilo na amra add korsi
        // 🎯 naviage kintu hoy na .. new post create korar pore .. link same e thake
        navigate(`/posts/${data._id}`); // post create hoye gele post er page e redirect kore dibe ..
    } catch (err) {
        console.log(
            "🔴 err from action/posts.js/createPost => ",
            err.message,
            err
        );
    }
    // now we have to dispatch that action... to do that we can go into the form .. in there .. we can import
    // useDispatch from react ..
};

/////////////////////////////////////////////////////////////////////////////////////////////////
//2nd video /////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

export const updatePost = (id, post) => async (dispatch) => {
    try {
        // making api request to update the post ..
        const { data } = await api.updatePost(id, post); // response theke amra data ta destructure kore nisi

        dispatch({ type: UPDATE, payload: data }); // dispatch function e action pass kortesi..
    } catch (error) {
        console.log("from update Post from action : ", error.message, error); // error print korte hobe shob shomoy .. message print kora jabe na
    }
    // action er kaj korar por amader ke reducer file e jete hoy ... // reducer -> post.js
};

export const likePost = (id) => async (dispatch) => {
    // part-3
    const user = JSON.parse(localStorage.getItem("profile"));
    try {
        const { data } = await api.likePost(id); // we want to get the data of newly updated post ... onekta
        // update er motoi ...

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log("from like Post from action : ", error.message, error);
    }
};

// jei id ta api er deletePost theke pathano hoyeche .. sheta parameter hishebe receive korlam ..
export const deletePost = (id) => async (dispatch) => {
    try {
        // jehetu amader ar kono data pass korar proyojon nai ..
        await api.deletePost(id); // so amra api call er jonno await korbo ..

        // amader jehetu ar kono response proyojon nai .. we only want to delete it
        // like ..
        // const response = await api.deletePost(id);
        // amra simply dispatch function call kore dite pari ..

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

/** ekta object receive kora hocche .. jei nam e receive kora hobe .. sheta dot search othoba sheta dot tags er maddhome value gula access kora jabe  */
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        // inside of try block we want to try to communicate to our back-end .. getPostsBySearch jei parameter
        // receive korbe .. thik shetai amra api request er moddhe pass kore dibo ..
        const {
            data: { data },
        } = await api.fetchPostsBySearch(searchQuery);
        // ekhon amra api folder er index.js er moddhe jabo ..karon amader fetchPostsBySearch nam e api endpoint
        // create korte hobe ..

        // we will have to destructure the data two times .. first time because we are making an axios request ..
        // and the second time because we put it in a new object where it has the data property.. just like this

        console.log(
            "🙄🙄 from actions .. posts.js -> getPostBySearch :: ",
            data
        );

        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
        console.log("Error From getPostsBySearch😆");
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id); // back-end theke data ashbe ..
        // front-end theke comment er value ar jei post er against e comment ta kora hocche .. shetar id
        // send kora hocche

        dispatch({ type: COMMENT, payload: data });

        return data.comments; // for the first time return kortesi..
    } catch (error) {
        console.log(error);
    }
};
