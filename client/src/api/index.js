import axios from "axios"; // we are gonna use it to make api calls

// in here we have to specify our URL and that URL is going to be a string .. thats
// going to say ...
//// 🔴🔵const url = "http://localhost:5000/posts"; // so this is the URL pointing to our backend route ..
/// 🔴🔵 const url = "http://memories-project.herokuapp.com/posts";
const API = axios.create({ baseURL: "http://localhost:5000" }); // empty object er moddhe base URL ta dicchi
/**
 * we dont wanna have that for slash posts because now we are going to have the api .. also to make some different
 * calls for example to the users .. and not only to the posts ..
 */
/**
 * amra jehetu axios er instance create korsi .. so that we can add one more thing to it .. and that one
 * thing is going to help our AUTH middleware ... our middleware can not work without that one thing ..
 * and that thing is adding something specific to each one of our requests ..  how do we do that .. we can say
 *
 */

API.interceptors.request.use((req) => {
    // this is going to be a function .. thats going to  happen on each one of our request ..
    // we need to provide a callback function ..
    // this is going to happen before all of these requests .. so why do we need this .. bcz we have to send
    // our token back to our back-end .. so that back-end middleware can verify that we are actually logged in
    // for that we can say if .. localStorage .. and we want to get the item of profile .. thats where we
    // store the token .. so, if that exists .. then we want to add something to our request .. that
    // something is going to be req.headers.Authorization
    // remember if we go to back-end and take a look at our middleware .. we can see that .. we are taking
    // something from req.headers.Authorization .. So, in here we need to put our token ..
    // and the token is going to be string .. and it needs to start with the word Bearer .. so this is going
    // to be a Bare token .. 2nd thing hocche divided by a space is the actual token .. we can get that by
    // saying json.parse .. inside of there .. we get the localStorage.getItem .. we get the profile .. and
    // on that profile we need to say dot token .. So,  we want to get the token from that specific profile ..
    if (localStorage.getItem("profile")) {
        //
        req.headers.authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }

    return req; // finally with interceptors we have to return the actual request .. So, that we can make
    // all of these future requests ..
    // So, now we are adding that to each and every request ..

    // with that our back-end .. will be able to get a specific .. header and based on that header ..
    // amader back-end er auth.js middleware e .. amra token ta pabo .. token ar jwt secret er maddhome
    // amra jwt verify korsi ... ar jei data ta amra paisi .. sheta amra decodedData er moddhe rakhsi ..
    // decoded data er moddhe user id ta thake .. sheta ke req.user er moddhe assign kore dibo ..
    // based on that .. our back-end is going to know that our user is indeed logged in ..
    // So for the user creation .. now that we have this req.userId on the backend ... means auth middleware
    // and we can head to controllers and posts .. means controllers -> posts .. we have dealt with the
    // like post controllers .. but we also have to make a change to our create post .. lets go there ..
});

// http:localhost:31313/posts .. this simply return all the posts that we currently have in the database ..
// eta re amra ar ei file e use korbo na .. export kore dibo
// create a function
/// 🔴🔵export const fetchPosts = () => axios.get(url);
// page ta action theke pathano hoise .. action ta Pagination.jsx er moddhe dispatch kora hoisilo .. shekhan theke page first pass kora hoisilo
// ekhon amra page er infomation ta backend eo pathacchi just so we know .. on which page are we currently on
// ekhon amra backend e gia controller modify korbo
export const fetchPosts = (page) => API.get(`/posts?page=${page}`); // now instead of axios, we will be making all of our
// requests to the uppercase API .. this is going to do the same thing absolutely the same thing .. but you don't
// have to specify the starting part of this url..so, how do we change that .. well now .. its not going to be
// api.get .. forward slash URL .. it is simply going to be /posts ...we always have to add that ..
// we did that .. so that .. later on we can use some more advanced features of axios .. some of the features
// that are not often mentioned .. in easy tutorials ..and are definitely a good thing to know .. before that
// though .. let's simply create the routes .. for the sign in and the sign out ..

//now we have to focus on adding redux capabilities..bcz all actions towards our backend are going to be done..using redux
// we need to dispatch those actions.. to do that, we have to add some boilerplate code meaning, we do have to create
// a few files and folders but later on, on bigger applications this is going to be extremely great .. because of the
// scalability and as our application grows , we will be able to use that same old consistency .. redux offers us without
// any trouble .. So, to do that we are first going to create a folder called actions

// take one parameter (newPost) .. that parameter is going to be the entire post .. after we got the post
// .. we can say
/// 🔴🔵export const createPost = (newPost) => axios.post(url, newPost);
export const createPost = (newPost) => API.post("/posts", newPost);
// url, then we have to specify the data we are sending .. after exporting .. we can go back to Actions...
// Folder Action ... file posts.js ..

/////////////////////////////////////////////////////////////////////////////////////////////////
//2nd video /////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

/// 🔴🔵export const likePost = (id) => axios.patch(`${url}/${id}/likePost`); // amader id ta lagbe ... jeta action theke ashbe
//api call for update post ..
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
/// 🔴🔵export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const updatePost = (id, updatedPost) =>
    API.patch(`/posts/${id}`, updatedPost);

/// 🔴🔵export const deletePost = (id) => axios.delete(`${url}/${id}`); // ei khetre amader kono updated post lagbe na ..
// jehetu amra shudhu delete korbo ... // ekhon amra actions/posts.js e jabo .. and shekhane amra amader action
// creator ke create korbo ...

export const deletePost = (id) => API.delete(`/posts/${id}`);
export const signIn = (formData) => API.post("/user/signin", formData); // as the post payload we want to send
// the form data ...
export const signUp = (formData) => API.post("/user/signup", formData); // ekhon amra amader auth.js action e jete pari
// and now we have these api calls there ... there means in auth.js actions ..
/**
 * front-end -> inside of action .. more specifically auth actions .. we said that we need to log in the user
 * but at the time we didn't have the actual endpoints on the back-ends on the back .. that we needed to contact
 * now we do have them so that is our next step ..
 * to log in or to sign up the user .. for that we are going to create API endpoints ...like we did for all of
 * our actions with the posts.. now we need to create these only for the authentication .. before we start with
 * that we are first going to do some updates to our current setup .. i am going to create an axios instance ..
 *
 */

/** ekta object receive kora hocche .. jei nam e receive kora hobe .. sheta dot search othoba sheta dot tags er maddhome value gula access kora jabe  */
export const fetchPostsBySearch = (searchQuery) =>
    API.get(
        `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
            searchQuery.tags || "none"
        }`
    ); // this time its going to be a function but .. its
// going to accept a parameter of searchQuery .. jeta getPostsBySearch action er maddhome / action dispatch
// houar maddhome front-end theke ashse ..
// Finally amra API.get request kortesi to .. /posts/ but amader ke search er kichu information o provide korte
// hobe .. /posts/search/ .. kintu ekhon amader query parameters o use korte hobe ..

// finally amra amader shob information amader search endpoint .. so ekhon amader endpoint o ase .. abar action o ase
// so ekhon amra amader home component e jabo .. action ta dispatch korte

export const fetchPost = (id) => API.get(`/posts/${id}`); //Single id er against e post er details page e niye jabe
// ekhon shob ready ekhon amader ke back-end side e jete hobe.. data niye ashte hobe front-end e

export const comment = (value, id) =>
    API.post(`/posts/${id}/commentPost`, { value });
// jei posts er id er jonno comment kora hocche shei id ta post korte hobe .. ar shathe comment er jei value ta
// shetao post korte hobe
