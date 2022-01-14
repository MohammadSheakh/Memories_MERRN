import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
    // initially state er value undefined thake .. so amader ke ekta default value dite hoy ...
    // tai amra ekta authData: null ekta value assign kore dilam...
    switch (action.type) {
        case actionType.AUTH:
            // if our action type is equal to AUTH .. we are getting all the details inside of the action.payload
            // or more specifically we call the data ...
            console.log(
                "action.data from authReducer .. auth.js -> 🔴 : ",
                action?.data // data shob shomoy na  o thakte pare .. ejonno ? deowa valo
            ); // what are we getting ..
            // jei data gula amra pailam .. shegula amra localStorage er moddhe set kore felte chai ..
            // karon that way once we refresh the page the browser is still going to know that we are logged in ..
            // log in korar jonno jei jei data amader dorkar .. shegula amra local storage e set kore fellam ..

            // setItem dia item set korlam ... getItem dia item get korbo navbar er moddhe
            localStorage.setItem(
                "profile",
                JSON.stringify({ ...action?.data })
            ); // we are setting our profile with the data field for the user .. we can try to use it somewhere ..
            // The Best place to use it would be a navbar ... because in here we already have our user .. which is
            // currently set to null .. So , now lets try to add a real user in there

            return {
                // state ta to return kortei chai .. aro specify kore dite chai aro kichu jinish ..
                // action.data ke authData nam e send korte chai .. loading ke false and errors ke null value diye
                // send korte chai ..
                ...state,
                authData: action.data,
                loading: false,
                errors: null,
            };
        case actionType.LOGOUT:
            localStorage.clear();

            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
};

export default authReducer;

// eta ke amader reducer folder er e index.js e use korte hobe ...
