// ei file ta good commenting kora hoyeche ...
// rafce
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Icon from "./icon";
import { signin, signup } from "../../actions/auth"; // action theke ashbe ...
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUp = () => {
    const [formData, setFormData] = useState(initialState); // form er data save korar jonno state declare korlam ..
    // handle submit function er moddhe ei form data niye kaj korbo ..
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    // form er nich er kichu text dekhanor jonno eita toggler hishebe kaj korbe ..
    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    /**
     * next step hocche implement the manual login and registration system ..using the JSON WEB TOKEN  ..
     * for that we are gonna use sign in form that we created .. lets start working on that ..
     * ekhon amra backend eo kaj korbo .. karon amader ke User er jonno Model Create korte hobe ..
     * as well as controller create korte hobe and the routes for the login and registration ..
     * but for now .. lets handle the client side of the authentication system ..to do that we have to
     * go to our Auth Form .. means Component ..
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // form submit korle page jeno reload na nei .. shejonno ei ta likhlam ..

        console.log(
            "🧾📈📢 form Data on Submit from Auth.js -> handle Submit : 🎯",
            formData
        );
        // well there is going to be two different types of submits .. one is going to be our sign up and other one
        // is going to be our sign in .. amader to isSignup nam e ekta variable e ase .. sheta dia amra check korte
        // pari ..
        if (isSignup) {
            // in this case we want to do the logic to sign up the user

            dispatch(signup(formData, navigate)); // so in this case we want to dispatch an action and more specifically
            // is going to be a signup action.. and we want to pass the entire form data and also want to pass the
            // navigate  ..... we want to pass the form data so well we can have it in our database ofCourse..
            // but we pass the navigate.. previously history object so that we can navigate .. once something happens
        } else {
            // we want to do the logic to sign in the user
            dispatch(signin(formData, navigate)); // signup / signin action gula import kore nite hobe .. egula
            // action folder er auth.js theke ashbe ..
        }
    };
    // we have the handleChange... and each one of our inputs.. is using that handle change ..
    const handleChange = (e) => {
        // we spread out the form data and then we update only a specific input that we are currently managing ..
        // and the question is how can we know .. on which input are we currently..
        // well each one of the inputs has its own name .. first of all .. you have to make sure that your names
        // are exactly the same as the names in the initial State right above ..
        // [e.target.name] : means thats going to be equal to e.target.value...
        // setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥e.target : ", e.target, formData);
        setFormData((prevState) => ({
            // object ta auto return hoye jay
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // this is going to make sure to spread all of the other properties ..but only change the one specific
    // one you are currently on.. with the target value .. that means the current input that we have in there ..

    const googleSuccess = async (res) => {
        const result = res?.profileObj; // optional chaining operator ...
        const token = res?.tokenId;

        try {
            // login successful hoile amra kichu jinish dispatch korbo ..
            dispatch({ type: AUTH, data: { result, token } }); // action er type hocche AUTH ..
            // then the data will be sending in .. is gonna be the payload.. and all that we want to send is a
            // new object .. that contains the result and token ..

            // ekhon amader reducer add korte hobe .. jeta eta ke properly handle korte parbe ..

            // navbar component er useEffect e kaj korar pore finally amader Auth Component e arekta change korte
            // hobe .. more specifically .. once we dispatch this
            // we actually have to redirect back to the home .. so , for that .. we can use history.push('/');
            // kothay push korbo .. forward slash e .. eta ager technology .. ekhon amra navigate use korbo
            // eta korle jeta hobe amader google sign in korar pore localhost:3000/auth theke localhost:3000/ e niye
            // ashbe ..redirect kore ..

            // er porer kaj holo amader logout niye kaj kora ..navbar e logout button ase amader
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = () =>
        console.log("Google Sign In was unsuccessful. Try again later"); // alert o use kora jabe

    return (
        // <Container component="main" maxWidth="xs">
        //     <Paper className={classes.paper} elevation={3}>
        //         <Avatar className={classes.avatar}>
        //             <LockOutlinedIcon />
        //         </Avatar>
        //         <Typography component="h1" variant="h5">
        //             {isSignup ? "Sign up" : "Sign in"}
        //         </Typography>
        //         <form className={classes.form} onSubmit={handleSubmit}>
        //             <Grid container spacing={2}>
        //                 {/* 📢💬 Form e ki ki field dekhabo sheta base korbe kon form dekhacchi  sign in naki sign up */}
        //                 {isSignup && (
        //                     <>
        //                         {/* empty react fragment */}
        //                         <Input
        //                             name="firstName"
        //                             label="First Name"
        //                             handleChange={handleChange}
        //                             autoFocus
        //                             half
        //                         />
        //                         <Input
        //                             name="lastName"
        //                             label="Last Name"
        //                             handleChange={handleChange}
        //                             half
        //                         />
        //                     </>
        //                 )}
        //                 <Input
        //                     name="email"
        //                     label="Email Address"
        //                     handleChange={handleChange}
        //                     type="email"
        //                 />
        //                 <Input
        //                     name="password"
        //                     label="Password"
        //                     handleChange={handleChange}
        //                     type={showPassword ? "text" : "password"}
        //                     handleShowPassword={handleShowPassword}
        //                 />
        //                 {isSignup && (
        //                     <Input
        //                         name="confirmPassword"
        //                         label="Repeat Password"
        //                         handleChange={handleChange}
        //                         type="password"
        //                     />
        //                 )}
        //             </Grid>
        //             <Button
        //                 type="submit"
        //                 fullWidth
        //                 variant="contained"
        //                 color="primary"
        //                 className={classes.submit}
        //             >
        //                 {isSignup ? "Sign Up" : "Sign In"}
        //             </Button>
        //             <GoogleLogin
        //                 clientId="305104859436-bflca5asl7s9g7ura62tbucupnht8n54.apps.googleusercontent.com"
        //                 render={(renderProps) => (
        //                     <Button
        //                         className={classes.googleButton}
        //                         color="primary"
        //                         fullWidth
        //                         onClick={renderProps.onClick}
        //                         disabled={renderProps.disabled}
        //                         startIcon={<Icon />}
        //                         variant="contained"
        //                     >
        //                         Google Sign In
        //                     </Button>
        //                 )}
        //                 onSuccess={googleSuccess}
        //                 onFailure={googleError}
        //                 cookiePolicy="single_host_origin"
        //             />
        //             <Grid container justify="flex-end">
        //                 <Grid item>
        //                     <Button onClick={switchMode}>
        //                         {isSignup
        //                             ? "Already have an account? Sign in"
        //                             : "Don't have an account? Sign Up"}
        //                     </Button>
        //                 </Grid>
        //             </Grid>
        //         </form>
        //     </Paper>
        // </Container>
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isSignup ? "Sign up" : "Sign in"}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignup && (
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup
                                    ? "Already have an account? Sign in"
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUp;
