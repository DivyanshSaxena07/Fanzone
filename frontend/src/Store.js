// import { Store } from "@mui/icons-material"
import {configureStore} from "@reduxjs/toolkit"
import { allUsersReducer, postOfFollowingReducer, userPostsReducer, userReducer,userProfileReducer, followUserReducer } from "./Reducers/User.reducer";
import { likeReducer, mypostsReducer } from "./Reducers/Post.reducer";
const store = configureStore( {
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
        myPosts:mypostsReducer,
        userPosts:userPostsReducer,
        userProfile:userProfileReducer,
        followUser:followUserReducer
    },

});

export default store;