import { useState,useEffect } from "react";
import React  from "react";
import "./Login.css";
import { Button, Typography, button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { loginUser } from "../../Actions/user.action";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    error: deleteError,
    message: deleteMessage,
    loading: deleteLoading,
  } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch()
  const alert = useAlert();

  const loginHandler = (e) => {;
    e.preventDefault();
    dispatch(loginUser(email,password))
  };
  useEffect(() => {
    if (deleteError) {
      console.log("deleteError:", deleteError);
      alert.error(deleteError);
    }
    if (deleteMessage) {
      console.log("deletemessage:", deleteMessage);
      alert.success(deleteMessage);
    }
    
  }, [deleteError,deleteMessage]);


  return (
    <div className="Login">
      <form className="LoginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Media
        </Typography>
        <input type="email" placeholder="Email" value={email}  onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password</Typography>
        </Link>

        <button className= "btn" type="submit">Login</button>

        <Link to="/Register">
          <Typography>Don't have an Account ? <span>SignUp</span></Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
