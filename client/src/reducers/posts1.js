import {
    // action er moto ekhaneo niye ashlam variable gula ... jeno String use korte na hoy ...
    FETCH_ALL,
    FETCH_BY_SEARCH,
    FETCH_POST,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
} from "../constants/actionTypes";
// now let's talk about reducers ..
// what are reducers ...
// well, a reducer is a function .. so let's create it
const reducer = (posts = [], action) => {
    // more specifically is equal to a function that accepts the state .. and also it accepts the action ..
    // then based on the action type .. so..
    /** 
    if(action.type === 'CREATE')
    {
        // then we want to do some logic here.. more specifically we want to return either action or 
        // we want to return the state .. changed by the action.. 
        // usually you are gonna have multiple if statement ..for a lot of things.. for that reason ..
        // people prefer to have a switch statement .. and this is how it works
    }
    */
    switch (action.type) {
        // action.type gula ekhane ek ekta case e likhbo ..
        case FETCH_ALL:
            // fetch all action for fetching all the posts ..
            // Amadeus jehetu kono logic nai ekhono tai Tamra state tai return korbo ..
            // ar logic thakle .. action er upor base kore updated state ta return korbo ..

            // in reducer the state always needs to be equal to something we cannot have it equal to
            // nothing .. thats why we have to set initial value to state .. state = []
            // our posts are going to be an array .. and thats why .. we are specifying this empty array there

            // and also just to simplify things our 🔴🟡state🔵 is always gonna be simply posts..
            // because we are in a post reducer so we can rename the 🔵state to 🟡posts

            // we are gonna add logic here later on .. but now we just need to set it up .. so it works
            // together .. once we connect the redux to the store

            // ei reducer ta ekhono use kora hoy nai amadou .. so what we can do is export default this function
            // return posts; // ashole state return kore
            return action.payload;
        case CREATE:
            // return posts; // ashole state return kore
            // we have to send over an array .. and we have an array of posts.. first of all .. we have to spread
            // all the posts.. and then we have to add a new post ..and that new post is stored in the action.payload
            return [...posts, action.payload];

        //2nd/////////////////////////////////////////////////////////////////////////////////////////////////////
        case UPDATE:
            // in here we have to implement the case for the update post ...
            // we return something .. that something is posts.map...
            return posts.map(
                (post) =>
                    // post array will be changing something in here and will be returning the changed array.
                    // inside of the map.. we have single post .. then tarnery operation ..
                    post._id === action.payload._id ? action.payload : post
                // action.payload is the updated post ...
            );
        case DELETE:
            // eta onekta update er motoi .. kintu arektu simpler ...
            // we are going to keep all the posts..except the one .. where the post._id === action.payload ..
            return posts.filter((post) => post._id !== action.payload);
        case LIKE:
            return posts.map(
                (post) =>
                    post._id === action.payload._id ? action.payload : post // update er motoi same
                // post er id ar action payload er id same hoile post er like count barse ...
                // action payload mane updated ta return korbo .. ar same na hoile .. like bare nai
                // regular post tai return korbo /////////////// same kotha gula update er jonno o  projojjo
            );
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        default:
            return posts; // ashole state return kore
        //https://www.youtube.com/watch?v=aibtHnbeuio&ab_channel=JavaScriptMastery
        //https://www.youtube.com/watch?v=ngc9gnGgUdA&ab_channel=JavaScriptMastery 47:19

        // Redux jeno Store er shathe connect korle ek shathe kaj kore ..ejonno apatoto ei tuku kaj korlam
        // aro logic .. pore set korbo ..
    }
    /**
     * redux jokhon store er shathe connect kora hobe .. tokhon jeno kaj kore ..
     * ei reducer jehetu currently use hocche na .. so amra export default kore dite pari
     */
};
export default reducer; // eta may be amra index.js er combineReducers er moddhe use korbo

/**
 *
 *
 */
