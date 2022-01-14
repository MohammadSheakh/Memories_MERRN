// this is going to be the place where we are going to put all the complex logic of actually signing in and
// signing up the user
import bcrypt from "bcrypt"; // bcrypt is used to hash the password
// of course if you creating your users .. users want to have some security ..
// if your database is hacked and if you are storing your passwords in a plain text .. everybody will be able to
// see it .. if you hash the passwords that won't be the case .. thats why we use bcrypt

// and we also need jwt .. json web token ...
import jwt from "jsonwebtoken"; // and that is a safe way for us to store the users.
// or more specifically store the user in a browser for some period of time ..
// for example for an hour , 2 hour ..  or even a week .. that way .. if user leaves the site.. he will still
// be able to stay logged in .. no mattar what ..

// in this file , we have to use User Model ..  which we haven't created yet ..

// ekhon ei controller er moddhe User Model ta import korbo.. and based on that we can create a lot of instances
// of users ..
import User from "../models/user.js";

// ekhon finally amra amader controllers gula create korte parbo ..

const secret = "test";

// we know that we need to have two ..
// one is going to be
export const signin = async (req, res) => {
    const { email, password } = req.body; // we are going to get two things from the front end ..

    // so the question is how are we getting it from the front end .. whenever you have a post request ..
    // you get all the data through the req.body

    console.log(
        "💬💬💬req.body from user controller sign in function  : ",
        req.body
    );
    try {
        const oldUser = await User.findOne({ email }); // amra jodi sign in kori .. tahole amader ke ekta
        // oldUser khuje ber korte hobe ..

        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" });

        // ekhon User jodi khuje paowa jay .. taile ekhon amader jante hobe .. user jei password ta type korsilo
        // sheta shothik kina ..
        const isPasswordCorrect = await bcrypt.compare(
            password, // jei password ta form e type kora hoyeche
            oldUser.password // database theke paowa user er password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        // moving on .. ekhon shob cheye guruttopurno kahini ..
        // user er email ar password jodi thik thake .. amra taile user er jonno ekta token generate korbo ..
        // means then we finally get his json web token that we need to send to the front end ..

        const token = jwt.sign(
            // in here we have to provide all the information that we want to store in the token
            {
                email: oldUser.email,
                id: oldUser._id,
            },
            secret, // ekhane ekta secret string provide korte hoy .. jeta shudhu ami e jani .eta .env file theke ashbe
            { expiresIn: "60s" } // ekhane options object dite hoy .. ekta option hocche expire kokhon hobe sheta ..
            // here 24 hours * 14 days = 336 hours .. ei time er moddhe token ta expire hobe na ... 14 days = 2 weeks
            /**
             * if token expired .. we simply need to log the user out ..for that amra navbar component e jabo front end er
             * shekhane useEffect er moddhe amader check korte hobe token expire hoye gese kina ..
             * 2: 30: 48 part 3 is done but kaj kore na may be expiresIn jinish ta
             */
        );

        res.status(200).json({ result: oldUser, token }); // user ar token ta response hishebe send kore dilam ..
    } catch (err) {
        res.status(500).json({
            message:
                "Something went wrong in server side user controller signin catch .. 500 means undefined server error",
        });
    }
};
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    console.log("💬💬💬req.body from user controller  signup: ", req.body);
    try {
        // ekhaneo amra existing user khujbo age
        const oldUser = await User.findOne({ email });

        if (oldUser)
            return res.status(400).json({ message: "User already exists" });

        // old user means existing user na thakle amader new account khulte ar kono shomossha nai ..
        // kintu amra arekta check korbo je .. password ar confirmPassword same diyeche kina ...
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password don't match !" });
        }
        // ekhon ar amader new account create korte ar kono shomossha nai .. kintu ekhon amader password ta ke
        // hash korte hobe .. karon amra original password database e save korte chai na
        const hashedPassword = await bcrypt.hash(password, 12); // salt , level of difficulty that you want to
        // use to hash your password, people usually use 12 ...

        // ekhon amader ke user create korte hobe ...
        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        // amader token o create korte hobe ...
        const token = jwt.sign(
            {
                email: result.email,
                id: result._id,
            },
            secret,
            { expiresIn: "336h" }
        );

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({
            message:
                "Something went wrong in signup .. backend users controller",
        });

        console.log(error);
    }
};

/**
 *  2nd Step hocche jokhon User actually logged in .. he can do all kind of actions ... he can do delete a post that
 * he created .. he can like it .. he can like all the other posts and their backend needs to be able to basically
 * say okey .. you are allowed to do that .. you are real User ..you are currently logged in and you can do that ..
 * for that .. we use something known as middleware .. our next step is creating authentication middleware ..
 * middleware er jonno amra ekta folder e create kore feltesi ..
 */
