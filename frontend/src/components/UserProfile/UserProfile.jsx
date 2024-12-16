import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { CircularProgress } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  followUser,
  loadUser,
  userPosts,
  userProfile,
} from "../../Actions/user.action";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import User from "../User/User";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { Link, useParams } from "react-router-dom";
const UserProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const { user: me } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userProfile);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    loading: followLoading,
    error: followError,
    message: followMessage,
  } = useSelector((state) => state.followUser);

  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);

  const [followersToggles, setfollowersToggles] = useState(false);
  const [followingToggles, setfollowingToggles] = useState(false);
  const [followed, setfollowed] = useState(false);

  const handleFollower = () => {
    setfollowersToggles(!followersToggles);
  };
  const handleFollowing = () => {
    setfollowingToggles(!followingToggles);
  };
  const followUserHandler = async () => {
    await dispatch(followUser(params.id));
    await dispatch(userProfile(params.id));
    dispatch(loadUser());
    setfollowed(!followed);
  };

  useEffect(() => {
    dispatch(userPosts(params.id));
    dispatch(userProfile(params.id));
  }, [dispatch, followed]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }
    if (followMessage) {
      alert.success(followMessage);
      dispatch({ type: "clearMessage" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, followMessage, followError, dispatch]);

  useEffect(() => {
    if (user && me && user.following) {
      const isFollowing = user.followers.some(
        (follower) => follower._id === me._id
      );
      setfollowed(isFollowing);
    }
  }, [me, user]);

  return (
    <div className="UserProfile">
      <div className="UserProfileleft">
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
              isUserProfile={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">
            Follow user to see their all post
          </Typography>
        )}
      </div>
      <div className="UserProfileright">
        {!user ? (
          <Typography>no data</Typography>
        ) : (
          <>
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
                <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Followers
                </Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>

            <div>
              <button onClick={handleFollowing}>
                <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Following
                </Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>

            <div>
              <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                Posts
              </Typography>
              <Typography>{user.post.length}</Typography>
              <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                Rate
              </Typography>
              <Typography>₹{user.rate}/month</Typography>
            </div>
            {me && user && me._id === user._id ? null : (
              <Button
                onClick={followUserHandler}
                variant="text"
                sx={{
                  backgroundColor: followed
                    ? "rgb(254, 170, 113)"
                    : "rgb(38, 21, 3)",

                  color: followed ? "black" : "white",

                  margin: "1vmax",

                  "&:hover": {
                    backgroundColor: followed
                      ? "rgb(255, 166, 93)"
                      : "rgb(68, 31, 0)",
                    color: followed ? "rgb(31, 14, 0)" : "rgba(255, 255, 255)",
                  },
                }}
              >
                {followed ? "UnFollow" : "Follow"}
              </Button>
            )}
          </>
        )}

        <Dialog
          open={followersToggles}
          onClose={() => setfollowersToggles(!followersToggles)}
          
          maxWidth="sm"
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
              <Typography style={{ margin: "2vmax auto" }}>
                No one is following you
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
              <Typography style={{ margin: "2vmax auto" }}>
                Not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
