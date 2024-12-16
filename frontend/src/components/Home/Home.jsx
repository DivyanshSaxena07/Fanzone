import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { loading, posts, error } = useSelector((state) => state.postOfFollowing);
  const { error: likeError, message } = useSelector((state) => state.like);
  const { users, loading: usersLoading } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, likeError, message, dispatch]);

  return loading === true || usersLoading === true || loading === false || usersLoading === false ? (
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
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                isPrivate={post.isPrivate}
              />
            ))
          ) : (
            <Typography variant="h6">Follow creators to view their post here</Typography>
          )}
        </div>
        <div className="homeRight">
        <Typography variant="h6">More users to follow</Typography>
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
            <Typography variant="h6">No Users Yet</Typography>
          )}
        </div>
      </div>
    </div> ):
     (
    <Loader />
  )
};

export default Home;
