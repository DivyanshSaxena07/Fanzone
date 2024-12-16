import { useEffect, useState } from "react";
import React from "react";
import "./Register.css";
import { Avatar, Button, Typography, button } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { RegisterUser } from "../../Actions/user.action";
const Register = () => {
  const { loading, error } = useSelector((state) => state.user);
  const {
    error: deleteError,
    message: deleteMessage,
    loading: deleteLoading,
  } = useSelector((state) => state.userProfile);


  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setavatar] = useState("");
  const [rate, setrate] = useState("");
  const [dob, setdob] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const RegisterHandler = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(name, email, password, avatar , rate,dob));
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
  }, [dispatch, alert, error]);

  useEffect(() => {
    if (deleteError) {
      console.log("deleteError:", deleteError);
      alert.error(deleteError);
    }
    if (deleteMessage) {
      console.log("deletemessage:", deleteMessage);
      alert.success(deleteMessage);
    }
  }, [dispatch]);
  return (
    <div className="Register">
      <form className="RegisterForm" onSubmit={RegisterHandler}>
        <Typography variant="h3" style={{ padding: "0vmax" }}>
          Social Media
        </Typography>
        <Avatar
          src={avatar}
          alt="user"
          sx={{ margin: "1vmax", height: "7vmax", width: "7vmax" }}
        />

        <input type="file" accept="image/" onChange={handleAvatarChange} />
        <input
          className="RegisterInput"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
        <input
          className="RegisterInput"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="RegisterInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="RegisterInput"
          type="number"
          placeholder="Enter your monthly charges"
          value={rate}
          onChange={(e) => setrate(e.target.value)}
          required
        />
        <input
          className="RegisterInput"
          type="date"
          placeholder="Enter your Date of Birth"
          value={dob}
          onChange={(e) => setdob(e.target.value)}
          required
        />

        {loading ? (
          <CircularProgress />
        ) : (
          <button className="btn" type="submit">
            Register
          </button>
        )}

        <Link to="/">
          <Typography>
            Already have an account ? <span>Login</span>
          </Typography>
        </Link>
      </form>
    </div>
  );
};

export default Register;
