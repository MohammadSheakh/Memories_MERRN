import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js"; // we have signIn and signUp api calls here from API ..

//🎯 main code e navigate er jaygay router likha
export const signin = (formData, navigate) => async (dispatch) => {
    // that is going to be an action creator jeta simply ekta action return kore ...
    /**
     * if action or more specifically action creators are asynchronous then we have to use redux thunk ..
     * meaning we have a function that returns an async function with a dispatch
     */
    try {
        /**
         *  in here we get what we passed into our function Component Auth.js ...
         *  mane hocche amra Auth Component e handleSubmit function e dispatch call korsilam .. shekhane ...
         * signin function er moddhe .. jetar body ekhane likhtesi .. form data pathiye diyechilam ..
         * sheta ekhane accept korte hobe .. shathe navigate o pathiyechilam
         */

        const { data } = await api.signIn(formData); // form hobe may be .. jehetu shudhu form pathaisilam Auth Component theke
        // sorry pore abar Auth Component er shob form ke formData likhe disi // destructure the data from a request
        /**
         * formData koi theke ashtese .. koi jacche eta asholei confusing .. so, let me give you the whole explanation
         * 🔴First we get to the actual form .. the form is a component ..jeta Auth Component er vitore ase ..
         * once we fill in all the inputs .. in handleSubmit we want to dispatch something .. we dispatch an action
         * kon action ta dispatch korbo sheta condition er upor base kore bole dibo ..
         * now this action makes another call to our API.. just so we know where we are going .. and its basically
         * API folder er moddhe index.js e initialize kora ase .. its make a post request .. says .. hei database ..
         * get me some data and return it .. to me ... and right in our action .. that's what we do .. we get some data
         * finally from our action creator .. we can finally dispatch some things and then .. we are coming into our
         * reducers .. so in this case .. once we have the data .. we want to dispatch an action .. with a type of AUTH
         * and we went to pass over the data to our reducer .. and with that our auth actions ar done ..
         *
         * reducer er moddhe we are getting the profile and then we are setting it to the local storage ..
         *
         * er porer kotha gula ami banglay emni e likhsi arki .. important ase ..
         * shei action er parameter
         * hishebe navigate, formData ta Form theke ashbe jeta amra receive kortesi ekhane .. data hishebe .. and shei ta ke
         * amra abar ekhan thekei specific type ar data ta diye dispatch kore dicchi .. jeno reducer e shei type
         * er upor base kore local storage er Profile Item er upor data set korlam ..
         */

        // try to get the data for sign in or rather we are going to send the data to the database ..or to the
        // backend .. so that it knows to sign in the user .. right now .. we dont have the back end endpoints for
        // this to actually work .. so this is going to be a good time to transfer back to the back-end ..

        // before we do that though lets just create a complete mock of the sign in and the sign up and then we
        // will move to the back-end ...

        console.log("from auth.js actions signin formData : 🎯", data);

        /** login the user */
        dispatch({ type: AUTH, data });
        /** login the user */
        // router.push("/") er jaygay navigate("/");
        navigate("/"); // sign in korle / route e navigate hoye jabe .. we want to navigate to the home page
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // signup the user
        const { data } = await api.signUp(formData);

        console.log("from auth.js actions signup formData : 🎯", data);

        dispatch({ type: AUTH, data });

        // navigate to the home page
        navigate("/");
        // router.push("/");
    } catch (error) {
        console.log(error);
    }
    // ekhon amra backend e gia shei end points gula age create korbo .. then .. shegula ekhane call korbo
    // ekhon amader backend e gia user model .. controller .. routes .. egula create korte hobe
};
