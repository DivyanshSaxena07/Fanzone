import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../Actions/post.action";
import { useAlert } from "react-alert";


import Loader from "../Loader/Loader";
import "./Home.css";
import User from "../User/User";
import Post from "../Post/Post";
import { getAllUsers, getFollowingPosts } from "../../Actions/user.action";
import { Typography } from "@mui/material";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const{error:likeError,message} = useSelector((state) => state.like);

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );
  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch({type:"clearErrors"});

    }
    if(likeError){
      alert.error(error)
      dispatch({type:"clearErrors"});

    }
    if(message){
      alert.success(message)
      dispatch({type:"clearMessage"});
    }
  },[alert,error,message])
  return loading === true || usersLoading ===true ? (
    <Loader />
  ) : (
    <div>
      <div className="home">
        <div className="homeLeft">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post._id}
                postImage={post.image.url}
                caption={post.caption}
                postId={post._id}
                likes={post.likes}
                comments={post.coments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                //  isDelete={true}
                //  isAccount={true}
                // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8erlxnV21Ik8TCbas4X0isAfPxxWEDZsxZw&s
              />
            ))
          ) : (
            <Typography variant="h6" No Posts Yet></Typography>
          )}
        </div>
        <div className="homeRight">
          {users && users.length > 0 ? (
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))
          ) : (
            <Typography variant="h6" No user Yet></Typography>
          )}
        </div>
      </div>
    </div>
  );
};
{
  /* <Post
postImage="data:image/jpeg;base64,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"
caption="My post"
ownerName="Divyansh"
/> */
}
export default Home;
