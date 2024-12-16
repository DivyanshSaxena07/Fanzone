import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import "./Newpost.css";
import { createnewpost } from "../../Actions/post.action";

const Newpost = () => {

  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const { loading, error , message} = useSelector((state) => state.like);
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createnewpost(caption, image , isPrivate));
  };

  useEffect(() =>{
    if (error) {
      alert.error(error.message);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  },[dispatch ,error , message ,alert])
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };
  return (
    <div className="newpost">
      <form className="newpostform" onSubmit={submitHandler}>
        <Typography>New Post</Typography>
        <input type="file" accept="image" onChange={handleImageChange} />

        {image && <img src={image} alt="post" />}

        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
         <div className="privacy-checkbox">
          <label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            Private
          </label>
        </div>
        <Button type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};

export default Newpost;
