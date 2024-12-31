import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography, Dialog, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import "./Post.css";
import User from "../User/User";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import {
  getFollowingPosts,
  getMyPosts,
  userPosts,
} from "../../Actions/user.action";
import { useAlert } from "react-alert";
import {
  addCommntOnPost,
  deletePost,
  likePost,
  updateCaption,
} from "../../Actions/post.action";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isPrivate,
  isDelete = false,
  isAccount = false,
}) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [Liked, setLiked] = useState(false);
  const [Deleted, setDeleted] = useState(false);
  const [LikeUsers, setLikeUsers] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const [CaptionValue, setCaptionValue] = useState("");
  const [CommentToggle, setCommentToggle] = useState(false);
  const [updateCaptionToggle, setupdateCaptionToggle] = useState(false);

  const [views, setViews] = useState(0); // State to track views
  const [hasIncremented, setHasIncremented] = useState(false); // To prevent multiple increments

  const postRef = useRef(null);

  const handleLike = async () => {
    setLiked(!Liked);
    await dispatch(likePost(postId));
    if (isAccount) {
      await dispatch(getMyPosts());
      await dispatch(userPosts(params.id));
    } else {
      await dispatch(userPosts(params.id));
      await dispatch(getFollowingPosts());
    }
  };
  const deletePostHandler = async () => {
    if (isAccount) {
      await dispatch(deletePost(postId));
      await dispatch(getMyPosts());
    } else {
      await dispatch(getFollowingPosts());
    }
  };
  const updateCaptionHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateCaption(postId, CaptionValue));
    await dispatch(getMyPosts());
  };
  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommntOnPost(postId, CommentValue));
    await dispatch(getFollowingPosts());
    await dispatch(getMyPosts());
  };

  //====================================to count views =========================================

  useEffect(() => {
    const fetchViews = async () => {
      try {
        console.log("postRef.current:", postRef.current);

        const { data } = await axios.get(`/api/v1/post/${postId}/views`);
        console.log("Views fetched:", data.views); // Debugging log
        setViews(data.views);
      } catch (error) {
        console.log("Error fetching views:=====", error);
      }
    };

    const incrementViews = async () => {
      try {
        await axios.put(`/api/v1/post/${postId}/view`);
        console.log("views are increamenting-----------------")
        fetchViews(); // Update the views count after incrementing
      } catch (error) {
        console.log("Error updating post views:", error);
      }
    };

    const handleScroll = () => {
      console.log("this is handle scroll");
      if (!postRef.current) return; // Exit if `postRef` is null

      if (!postRef.current || hasIncremented) {
         console.log("scroll is not running");
      }

      const rect = postRef.current.getBoundingClientRect();
      console.log(`Bounding rect: ${JSON.stringify(rect)}`);
      const isVisible = rect.bottom > 0 && rect.top < window.innerHeight

      if (isVisible &!hasIncremented) {
        console.log("Post is visible, incrementing views");
        incrementViews();
        setHasIncremented(true);
      }
      else if (!isVisible && hasIncremented) {
        setHasIncremented(false);
      }
    
    };
    // Fetch views initially
    fetchViews();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //         console.log("Post is visible, incrementing views");

    //         incrementViews();
    //         observer.unobserve(entry.target);
    //       }
    //     });
    //   },
    //   { threshold: 0.5 }
    // );

    // if (postRef.current) {
    //   observer.observe(postRef.current);
    // }

    // fetchViews();

    // return () => {
    //   if (postRef.current) {
    //     observer.unobserve(postRef.current);
    //   }
    // };
  }, [postId,hasIncremented]);

  useEffect(() => {
    if (user && user._id) {
      likes.forEach((item) => {
        if (item._id === user._id) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
    } else {
      console.log("this is else");
    }
  }, [user, likes]);

  return (
    <div className="post" ref={postRef}>
      <div className="postHeader">
        <Typography>{isPrivate ? "Private" : "Public"}</Typography>
        {isAccount ? (
          <button>
            <MoreVert
              onClick={() => setupdateCaptionToggle(!updateCaptionToggle)}
            />
          </button>
        ) : null}
      </div>

      <Dialog
        open={updateCaptionToggle}
        onClose={() => setupdateCaptionToggle(!updateCaptionToggle)}
      >
        <div className="DialogBox">
          <Typography>Comments</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={CaptionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Update your caption"
              required
              className="text"
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
        </div>
      </Dialog>

      <img src={postImage} alt="Post" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="user"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={400}
          color="rgba(22,22,22,10)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>

        <Button
          onClick={() => setLikeUsers(!LikeUsers)}
          disabled={likes.length <= 0}
        >
          <Typography>{likes.length} likes</Typography>
        </Button>
      </div>
      <div className="postFooter">
        <button onClick={handleLike}>
          {Liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </button>

        <button onClick={() => setCommentToggle(!CommentToggle)}>
          <ChatBubbleOutline></ChatBubbleOutline>
        </button>
        {isAccount ? (
          <button onClick={deletePostHandler}>
            <DeleteOutline></DeleteOutline>
          </button>
        ) : null}
      </div>

      <Typography>{views} views</Typography>

      <Dialog open={LikeUsers} onClose={() => setLikeUsers(!LikeUsers)}>
        <div className="DialogBox">
          <Typography sx={{ paddingBottom: "2vmax" }}>Liked By</Typography>
          {likes.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))}
        </div>
      </Dialog>
      <Dialog
        open={CommentToggle}
        onClose={() => setCommentToggle(!CommentToggle)}
      >
        <div className="DialogBox">
          <Typography>Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={CommentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Add your comment"
              required
              className="text"
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard
                key={comment._id}
                userId={comment.user._id}
                name={comment.user.name}
                avatar={comment.user.avatar.url}
                comment={comment.comment}
                commentId={comment._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No Comments Yet</Typography>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
