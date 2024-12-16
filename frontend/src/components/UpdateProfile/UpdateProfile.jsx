import { useEffect, useState } from "react";
import React from "react";
import "./UpdateProfile.css";
import { Avatar, Button, Typography, button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { loadUser, updateProfile } from "../../Actions/user.action";

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [email, setEmail] = useState("");
  const [name, setname] = useState(user.name);
  const [avatar, setavatar] = useState("");
  const [avatarPre, setavatarPre] = useState(user.avatar.url);
  const [password, setpassword] = useState(user.password);
  const dispatch = useDispatch();
  const alert = useAlert();

  const UpdateProfileHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email, avatar));
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setavatar(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      alert.error(updateError.message);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, alert, updateError,error]);
  return (
    <div className="UpdateProfile">
      <form className="UpdateProfileForm" onSubmit={UpdateProfileHandler}>
        <Typography variant="h3" style={{ padding: "0vmax" }}>
          Social Media
        </Typography>
        <Avatar
          src={avatarPre}
          alt="user"
          sx={{ margin: "1vmax", height: "7vmax", width: "7vmax" }}
        />

        <input type="file" accept="image/" onChange={handleAvatarChange} />
        <input
          className="UpdateProfileInput"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          
        />
        <input
          className="UpdateProfileInput"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />

        <button className="btn" type="submit">
          Done
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
