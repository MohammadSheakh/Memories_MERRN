import { makeStyles } from "@material-ui/core/styles";

// we call that as a function and provided a callback function .. that instantly returns an object ..
export default makeStyles(() => ({
    ul: {
        justifyContent: "space-around",
    },
}));
