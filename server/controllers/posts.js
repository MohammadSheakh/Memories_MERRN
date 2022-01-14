//external imports

// internal imports
import express from "express";
import mongoose from "mongoose"; // mongoose use korte import kore nite hobe ...
import PostMessage from "../models/postMessage.js"; // eta amader real model ke access korte dibe ..
const router = express.Router(); //🔴 router ekhane keno lagbe bujhlam na

// each callback function is going to have a try and catch block
// create all the handlers for our routes
export const getPosts = async (req, res) => {
    // res.send("getPosts form controller");
    const { page } = req.query; // jehetu front end theke ekhon page variable ta query er maddhome ashtese ..
    // api er index.js theke page variable ta pathaisi ..
    try {
        const LIMIT = 8; // number of posts per page .. 8 is standard
        // start index of a post on a specific page .. example start index of the first post on the third page
        // would be 8+8+8-1 .. index 0 theke shuru hoy ..
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        /**
         * 1 page , 2 page , 3 page , 4 page
         * 0,       1,       2,       3,
         * 2nd page mane amra 8+8 16 ta post fetch korte chai na .. prothom page er 8 ta bad dia last 8 ta fetch
         * korte chai .. ejonno amader startIndex ta lagbe ..
         * tar mane 3 number page e thakle prothom
         */
        const total = await PostMessage.countDocuments({});

        // lets try to retrieve all the posts that we currently have in the database
        // finding something inside of a model.. takes time .. which means it is an asynchronous
        // action .. for that reason .. we have to add await in front of it .. and therefore
        // we have to make this function asynchronous
        /// const postMessages = await PostMessage.find();
        const posts = await PostMessage.find()
            .sort({ _id: -1 }) // sort newest to oldest... newest post first
            .limit(LIMIT)
            .skip(startIndex); // skip all the previous pages .. page 2 te thakle amra prothom 16 ta post abar
        // fetch korte chai na .. ete time onek beshi lagbe, amra matro prothom 8 ta bad dia baki 8 ta fetch korte chai

        console.log(
            "🧾🎯 postMessages from controllers->posts.js -> getPosts ->>🚁🚁🚁🚁🚁🚁🚁🚁🚁🚁",
            posts
        );

        //console.log("🚁🚁🚁 up res", res);

        // and finally we need to make our function return something
        /// res.status(200).json(postMessages); // array of all messages that we have..
        res.json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
        });
    } catch (err) {
        res.status(404).json({
            message: err.message,
        });
    }
};

//3rd video
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log("error from getPost controller : 😅", error);
    }
};

// now we have implement a logic for adding different post and we are going to do that right here
export const createPost = async (req, res) => {
    // with post request .. you have access to something known as a req.body
    // const {title, message, selectedFile, creator, tags } = req.body; // amader eto kichu dorkar nai
    // because they are just post ..
    const post = req.body;
    // and then we need to create a new post we do that by typing
    // age newPost chilo .. sheta ke ekhon newPostMessage korlam
    ///🔴 const newPostMessage = new PostMessage(post); // request er data ta Model er moddhe pass kore dilam .. newPost pailam ..
    // then we set the newPostMessage ..
    const newPostMessage = new PostMessage({
        // first of all spread this values of a specific post .. and then this is the key part ..
        // we want to set the creator of the post ..  arekta createdAt property o add kore dilam..
        ...post,
        creator: req.userId, // our creator is no longer going to be the name that we are self specify ..
        // it is going to be an id ... that means .. we have to go to our .. postMesssage Model ..
        // and then along with the creator .. we need to add one more thing .. and that is going to be a name ..
        /** so we still want to have the name but .. it is going to be the name of the person .. who is logged in..
         *  not something that we can type ourselves .. Before we had to type in our name because we didn't
         *  have the login.. but now we do login .. so , kon user post korse .. tar nam automatic register hobe ..
         */
        createdAt: new Date().toISOString(), // post ta jokhon create hobe .. tokhonkar time record rakhbe ..
    });
    console.log("📢📢newPost => ", newPostMessage);
    try {
        await newPostMessage.save(); // asynchronous action
        res.status(201).json(newPostMessage); // 201 means successful creation ..
        // https://www.restapitutorial.com/httpstatuscodes.html -> Documentation Errors
    } catch (err) {
        res.status(409).json({
            message: error.message, // 409 for post creation na hoile ..
        });
        console.log("🔴error happens in posts.js controllers🔴");
    }
    // res.send("Post Creation form controller");
};

// update route controller ... post/3 .. that 3 is params
export const updatePost = async (req, res) => {
    // extract that id from req.params
    /// 🔴const { id: _id } = req.params; // we rename the id => _id
    const { id } = req.params;

    const { title, message, creator, selectedFile, tags } = req.body;
    const post = req.body; // req er body theke updated post ta ashbe  ...
    // front end theke send kora hobe ..

    // ekhon post er jehetu _id property nai ... req.params theke _id ta ashse .. ekhon post er object er moddhe
    // amader ke _id ta push kore dite hobe ..
    // post object er ager property gula niye nilam .. tar shathe _id ta dhukiye dilam ..

    /// 🔴const newPost = { ...post, _id };

    // ekhane arekta check korbo .. _id ta ki really mongoose object id kina !
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No Post With That Id ! : ", id);

    // on the other hand .. if id is valid .. then we can update our post ..

    // We are going to call our model.. which is Post Message ...
    /// 🔴const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    /// 🔴   new: true,
    /// 🔴}); // kon _id er post update korbo sheta,
    // 2nd parameter e amra dibo .. whole updated post ta ..
    // but where are we receiving the data for the updates .. well ..
    // from the request body ..
    // , {new: true}.. so that we can actually receive the updated version of that post ..
    //
    const updatedPost = {
        creator,
        title,
        message,
        tags,
        selectedFile,
        _id: id,
    };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params; // amader id ta lagbe .. kon post delete korbo ..

    // id valid kina shetar jonno checking .. database theke
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    /// finally todo delete korar jonno logic implement kora ..
    await PostMessage.findByIdAndRemove(id); // params theke jei id receive korsi .. sheta pass kore diyechi

    res.json({ message: "Post deleted successfully." }); // ekta response diye dilam

    // ekhon amra front end e gia eta initiate korte pari
    // prothom e amader ke API e jete hobe .. shekhane amader ke api call implement korte hobe ..
    // erpor amra actions/posts.js e jabo .. and shekhane amra amader action
    // creator ke create korbo ...
    // action create korar por amra ki kori ?  amra amra reducer create kori ...
    // reducer done hoye gele amra ekhon front end component e jabo ..  amra action ta dispatch korbo ... useDispatch use kore ..
    // post.js component ..
    // ekhane amader action ta import korte hobe ... ar jehetu ekhane reducer er setup kora nai ..
};

export const likePost = async (req, res) => {
    // this is our likePost Controller .. now we have to modify it so that the users can only like the post once ..
    const { id } = req.params; // jei post er like count barabo ... tar id ta niye ashlam ..

    // first of all we have to see if a user is even authenticated .. jehetu amra likePost controller e hit korar
    // age auth middleware e hit korsilam .. shekhane kintu amader user er userId populate hoyechilo .. jeta amra
    // req.userId er maddhome access korte parsi .. tar mane holo request er userId thakle sheta authenticate bujha jabe
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    // ei id ta valid kina sheta check korbo mane jei post e like dicchi shei post ta database e ase kina .. sheta
    // check korsi ..
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id); // jei post er like count barabo age shei post ta id er maddhome
    // khuje ber korte hobe ... // mane ekhane amra actual post ta pabo ..

    // User jeno 1 ta like er beshi na dite pare .. ejonno logic likhbo ekhane
    // ekhon amra check korbo user er id ki already post er like section e ase kina ..
    const index = post.likes.findIndex((id) => id === String(req.userId)); // parameter hishebe post e jei person
    // ra like diyeche tader id pabo .. prottekta id er shathe user er id er match kore dekhbo ..

    if (index === -1) {
        // only if his id is not in  here .. means .. if he wants to like the post ..
        post.likes.push(req.userId);
    } else {
        // dislike that post .. cause already liked .. // we are going to remove his id from likes array
        post.likes = post.likes.filter((id) => id !== String(req.userId));
        // eta amader shob gula like er array return korbe .. user er like chara ..
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
        id,
        ///{ likeCount: post.likeCount + 1 }, // 2nd parameter e update ta object akare pass kore dibo ...
        post, // 1 tar beshi like jeno na dite pare .. tar logic lekhar porer obostha ...
        { new: true }
    );
    // one more thing we have to do .. is add the actual likes to each post.. that is going to be in the post
    // message model .....likeCount ke likes banaite hobe .. type hobe number er jaygay [String] ar default hobe
    // empty String, 0 er jaygay ...
    // finally we will be able to go to the front end part and see if we can make the calls to the sign in and the
    // signup routes and controllers ..
    // this is the thing with back-end .. if you work with back-end .. most likely you have to write a lot of things
    // and not visually see something.. thats just how it is with the back-end .. but now we are going to move back
    // to the front-end .. since we are building a full stack app .. and we will be able to see the logic that ..
    // we implemented on the back-end ... lets go to front-end
    /**
     * front-end -> inside of action .. more specifically auth actions .. we said that we need to log in the user
     * but at the time we didn't have the actual endpoints on the back-ends on the back .. that we needed to contact
     * now we do have them so that is our next step ..
     * to log in or to sign up the user .. for that we are going to create API endpoints ...like we did for all of
     * our actions with the posts.. now we need to create these only for the authentication .. before we start with
     * that we are first going to do some updates to our current setup..
     */

    res.json(updatedPost); // json response diye dilam..

    // ekhon amra front-end part e jabo .. as always .. amra api call add korbo first e ...
    // er pore action folder e gia post er jonno like action function create korbo ...
    // finally amra reducer e jabo ... shekhane logic add korbo jemon
    // post er id ar action payload er id same hoile post er like count barse ...
    // action payload mane updated ta return korbo .. ar same na hoile .. like bare nai
    // regular post tai return korbo

    // er por component e gia action ta dispatch kore felbo .. jekono button er onClick e ...

    // same kotha gula update function er khetreo projojjo
};

export const getPostsBySearch = async (req, res) => {
    // async function

    // now we want to retrieve that data from req.query.. remember amra params nia kotha bolsilam ..
    // params ar query duita alada jinish ..Query -> /posts?page=1 in this case we have a query .. where
    // page variable is equal to 1 .. but .. if we have something known as params .. in that case .. our
    // route would look like this .. /posts/:id in here you would be able to put your specific id ..
    // like /posts/3 .. in that case the populated variable id would be equal to 3 ...
    // usually we use query .. if you want to well query some data .. like search and we use params if we
    // want to get some specific resource .. like posts ..
    const { searchQuery, tags } = req.query;
    console.log(
        "🙄🙄searchQuery, tags from getPostsBySearch Controller",
        searchQuery,
        tags
    );
    try {
        // now lets convert our title into a reqular expression
        const title = new RegExp(searchQuery, "i"); // i stands for ignore case ..
        // amra jinish ta ke regular expression e convert kore nilam karon ete mongo db ar mongoose er jonno easy
        // hoy database e search korar jonno

        let isSearchQueryAvailable = [];
        if (searchQuery?.length > 0) {
            isSearchQueryAvailable = [{ title }];
        }

        if (tags?.length > 0) {
            isSearchQueryAvailable = [
                ...isSearchQueryAvailable,
                { tags: { $in: tags.split(",") } },
            ];
        }

        // lets search the database for posts ..
        const posts = await PostMessage.find({
            // $or: [{ title }, { ...isSearchQueryAvailable }],
            $or: [...isSearchQueryAvailable],
        }); // find() er moddhe amader ke query likhte hobe ..
        // that or stands for either find me the title or find me the tags ..
        // but keep in mind .. there is an array of tags .. so inside ..of there .. we are going to open another
        // object .. and we are gonna say $in -> is there a tag in this specific array of tags .. that matches
        // our query .. .. in there .. we can say $in ... mane comma dia divide kora String gula ke amra abar
        // Array te nia gelam .. means is one of the tags ... in the array of tags .. equal to our tags...
        // if thats the case .. then we want to display those posts..

        //finally once we have the posts .. we have to say res.json() and in there .. we will have an object ..
        // where data is going to be posts and we are sending that back to our front-end.....
        console.log("🙄🙄posts", posts);
        res.json({ data: posts });
        // now lets go back to our action creator .. and check if we are receiving the data
    } catch (err) {
        // error hoileo front-end e pathabo ..
        res.status(404).json({ message: err.message });
        console.log(err);
    }
};

export const commentPost = async (req, res) => {
    // jei post er jonno comment kora hocche .. tar id ta params thekei ashbe ..
    const { id } = req.params;
    // jei comment kora hobe .. sheta request er body hishebe ashbe ..
    const { value } = req.body;

    const post = await PostMessage.findById(id); // post ta Database theke ber kore niye ashlam id dia ..

    post.comments.push(value); // post er ekta comments nam e ekta field add korlam .. tar moddhe value ta push
    // kore dilam

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
        new: true,
    }); // database er moddhe update kore dilam

    res.json(updatedPost); // respons send korlam
};
