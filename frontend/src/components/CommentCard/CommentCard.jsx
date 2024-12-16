import React from "react";
import "./CommentCard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from '../../Actions/user.action';

import { Typography, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleteCommentOnPost } from "../../Actions/post.action";
import { getFollowingPosts } from "../../Actions/user.action";
const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteCommentHandler = async() =>{
   dispatch(deleteCommentOnPost(postId ,commentId))
   if (isAccount) {
    await dispatch(getMyPosts());
  } else {
    await dispatch(getFollowingPosts());
  }
  }
  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "5vmax", fontWeight: "bold" }}>
          {name}
        </Typography>
      </Link>
      <Typography>{comment}</Typography>
      {isAccount ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
