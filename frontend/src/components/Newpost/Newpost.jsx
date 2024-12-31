import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import "./Newpost.css";
import { createnewpost } from "../../Actions/post.action";

const Newpost = () => {

  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [preview, setpreview] = useState(null);
  const [fileType, setFileType] = useState(""); // Track file type
  const [caption, setCaption] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const { loading, error , message} = useSelector((state) => state.like);
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createnewpost(caption,file,isPrivate,fileType));
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
  
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const Reader = new FileReader();
  //   const fileExtension = file.type.split("/")[0];

  //   if (fileExtension === "image" || fileExtension === "video") {
  //     setFileType(fileExtension);
  //     Reader.onload = () => {
  //       if (Reader.readyState === 2) {
  //         setFile(Reader.result);
  //       }
  //     };
  //     Reader.readAsDataURL(file);
  //   }
  //   else {
  //     alert.error("Please upload an image or video file");
  //   }
  // };
// --------------------------------------------------------
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const fileExtension = file.type.split("/")[0];
  
  //   if (fileExtension === "image" || fileExtension === "video") {
  //     setFileType(fileExtension);
  //     setFile(file); // Directly set the File object
  //     const previewURL = URL.createObjectURL(file);
  //     setFile(file); // ill be used for the previewThis previewURL w
  //   } else {
  //     alert.error("Please upload an image or video file");
  //   }
  // };
  // ---------------------------------------------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.split("/")[0];
  
    if (fileType === "image" || fileType === "video") {
      setFileType(fileType);
      setFile(file);
      const previewURL = URL.createObjectURL(file);
      setpreview(previewURL);
      
    } else {
      alert.error("Please upload a valid image or video file.");
    }
  };
  

  return (
    <div className="newpost">
      <form className="newpostform" onSubmit={submitHandler}>
        <Typography>New Post</Typography>
        <input type="file" accept="image/*, video/*" onChange={handleImageChange} />

        {preview && fileType === "image" && <img src={preview} alt="post" />}
        {preview && fileType === "video" && (
          <video controls src={preview} alt="post" style={{ maxWidth: "100%" }} />
        )}

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
