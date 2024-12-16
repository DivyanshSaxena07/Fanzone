import { useEffect, useState } from "react";
import React from "react";
import "./UpdatePassword.css";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import {  Typography  } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../Actions/user.action";
const UpdatePassword = () => {
    const alert = useAlert();

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const {
    loading,
    error,
    message,
  } = useSelector((state) => state.like);

  const dispatch = useDispatch();
  const UpdatePasswordHandler = async(e) => {
    e.preventDefault();
    await dispatch(updatePassword(oldPassword, newPassword));
  };
  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }

  }, [dispatch, alert,error,message]);

  return (
    <div className="UpdatePassword">
      <form className="UpdatePasswordForm" onSubmit={UpdatePasswordHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Update Password
        </Typography>
        <input
          type="password"
          placeholder="old password"
          value={oldPassword}
          onChange={(e) => setoldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setnewPassword(e.target.value)}
        />

        <button className="btn" type="submit">
          UpdatePassword
        </button>
        <Link to="/forgot/password">
          <Typography>Forgot Password</Typography>
        </Link>
      </form>
    </div>
  );
};

export default UpdatePassword;
