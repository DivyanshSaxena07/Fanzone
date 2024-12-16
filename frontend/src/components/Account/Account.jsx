import React, { useEffect, useState } from "react";
import "./Account.css";
import { CircularProgress } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  deleteProfile,
  getMyPosts,
  logoutUser,
} from "../../Actions/user.action";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { Link } from "react-router-dom";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: likeLoading,
  } = useSelector((state) => state.like);
  const {
    error: deleteError,
    message: deleteMessage,
    loading: deleteLoading,
  } = useSelector((state) => state.userProfile);
  const [followersToggles, setfollowersToggles] = useState(false);
  const [followingToggles, setfollowingToggles] = useState(false);
  const [deleteToggles, setdeleteToggles] = useState(false);

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    alert.success("Logged out Successfully");
  };

  const handleFollower = () => {
    setfollowersToggles(!followersToggles);
  };

  const handleFollowing = () => {
    setfollowingToggles(!followingToggles);
  };
  const handleDeleteProfile = () => {
    setdeleteToggles(!deleteToggles);
  };
  const DeleteProfileHandler = async () => {
    await dispatch(deleteProfile());
    dispatch(logoutUser());
  };
  

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
    dispatch(getMyPosts())
  }, [error, likeError, message, dispatch]);
  return (
    <div className="account">
      <div className="accountleft">
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
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">No Posts Yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          sx={{
            height: "8vmax",
            width: "8vmax",
          }}
          src={user.avatar.url}
        ></Avatar>
        <Typography variant="h5">{user.name}</Typography>
        <div>
          <button onClick={handleFollower}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>Followers</Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>

        <div>
          <button onClick={handleFollowing}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>

        <div>
          <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>Posts</Typography>

          <Typography>{user.post.length}</Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>Rate</Typography>
              <Typography>₹{user.rate}/month</Typography>
        </div>
        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>
        <Button
          variant="contained"
          onClick={logoutHandler}
          style={{
            backgroundColor: "rgb(255, 5, 5)",
            borderRadius: "25px",
            margin: "2vmax",
            color: "white",
          }}
        >
          LogOut
        </Button>

        <Button
          onClick={handleDeleteProfile}
          variant="text"
          style={{ color: "red ", margin: "2vmax" }}
        >
          Delete Profile
        </Button>

        <Dialog
          sx={{ height: "auto", overflow: "hidden" }}
          open={deleteToggles}
          onClose={() => setdeleteToggles(!deleteToggles)}
        >
          <Typography
            sx={{
              margin: "auto 2vmax",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            }}
          >
            Once you delete your profile ,you will never get it back
          </Typography>
        
           
            <Button
              
              onClick={DeleteProfileHandler}
              variant="text"
              style={{ color: "red ", margin: "1vmax" }}
            >
              OK, Delete my profile
            </Button>
          
        </Dialog>

        <Dialog
          open={followersToggles}
          onClose={() => setfollowersToggles(!followersToggles)}
        >
          <div className="DialogBox">
            <Typography sx={{ paddingBottom: "2vmax" }}>Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggles}
          onClose={() => setfollowingToggles(!followingToggles)}
        >
          <div className="DialogBox">
            <Typography sx={{ paddingBottom: "2vmax" }}>Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((following) => (
                <User
                  key={following._id}
                  userId={following._id}
                  name={following.name}
                  avatar={following.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You are not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;

