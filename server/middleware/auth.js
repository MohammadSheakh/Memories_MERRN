import jwt from "jsonwebtoken";
// finally we can call the next()
// next(); // so that we can pass the action onto the second thing ...
// for example if the user wanted to like a post  //wants to like a post
// he has to do this -> click the like button .. then this is what happens..
// first we dont immediately like it .. cz, we are not sure if he has permissions to like it ..
// first we go to the 🔴auth middleware .. auth middleware confirms or denies that request ..
// so all of this is correct means .. all logic is satisfy under auth middleware
// we are going to call the next() and we are going to say okey ..  you are okey to like that post ..
// only then we are going to call the Like Controller .. and this is what middleware is for ..
// for any kind of action that happens before something ..
// this next() thing is crucial .. we are saying do this .. and then do something next .. do something after this
// is done ..  and that is a middleware ..

// ekhon amra amader auth function create korbo ..
const auth = async (req, res, next) => {
    // do something and move to the next thing ..

    try {
        console.log(
            "🎯req.headers : from auth middleware backend🎯 :",
            req.headers // front-end theke kono headers back-end e ashse kina sheta check kortesi
        );
        // in the try block we have to see if the user is really who is claiming to be
        // and we can do that using jsonwebtoken ...
        // so , after the user is signed up or signed in ..  he gets this specific token ..
        // 🔴 controller er user file theke amra user er jonno specific token set kore diyechilam ...
        // now when he wants to do something .. like , like a post or delete a post .. we have to check
        // if his token is valid .. and that's what we are doing right here ..

        // so, to get the token from the front end .. we can say const token

        // no matter how you write it at the front end .. at the back end .. it is always going to receive ..
        // as the lower case key letter ..
        const token = req?.headers?.authorization?.split(" ")[1]; // and we only want to token itself ..
        // and the token is on the first position in the array after we split it ..
        /**
         * one more thing we have to do .. and that is exchange the creator for name in our post ..that is going to
         * be inside of Single Post Component
         */

        // then we are gonna have two kinds of tokens.. we are gonna have the one from the google auth ..
        // and we are gonna have our own ..

        // so inside here we can decide if it is our own or to google auth
        const isCustomAuth = token?.length < 500; // it means it is our own token .. 500 er beshi hoile sheta google auth er
        let decodedData; // this is the data that we want to get from the token itself
        // now finally
        if (token && isCustomAuth) {
            // amader jodi token thake .. ar token ta jodi amader hoy mane google authorization er na hoy
            decodedData = jwt.verify(token, "test"); // taile amra decodedData ta set korbo
            // this is going to give us the data from each specific token ... it's going to give us the userName of the
            // person and  its Id, .. so , token ta pass korte hobe .. ar Secret ta pass korte hobe .. jeta .env file
            // theke ashbe ..jeta amra signin/ signup user Controller er moddhe set korsilam ..

            // ekhon amader kase decodedData ase .. and amra jani which user is logged in and which user is for
            // example liking the post or deleting the post ..

            // so we are going to store his id
            req.userId = decodedData?.id; // question mark is for optional chaining ..

            // okey this is how we get the user's id .. if we are working with our own token ..
        } else {
            // else amra jodi googles / OAuth token er help nei login korar jonno taile
            decodedData = jwt.decode(token); // in this case .. we don't need the secret ..
            // once we have that .. situation is going to be similar ..
            req.userId = decodedData?.sub; // sub is simply google's name for a specific id .. that differentiates
            // every single google user.. basically it's an id that we can differentiate the users with
        }
        // finally we can call the next()
        next(); // so that we can pass the action onto the second thing ...
    } catch (err) {
        console.log("error from middleware auth.js : 🎯", err);
    }
};

export default auth;
// where do we use this auth middleware.. and the answer is .. in the routes ..
// for example .. when somebody likes something .. in that case .. we want to use this middleware ..
// so first of all lets import it on that file ..

/**
 * One more thing to do .. that is exchange the creator for name in our post .. That is going
 * to be right here .. in Post.js .. before creator was the name of our person ..  but now
 * its not going to be the creator ... it is going to be simply name .. we change that ..
 * the creator .. is now the id of the person who is creating it ..
 */
