import { useEffect, useState } from "react";
import React from "react";
import "./ResetPassword.css";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";

import {  Typography  } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Actions/user.action";
const ResetPassword = () => {

    const params = useParams()
    const dispatch = useDispatch()
    console.log(params)
    const [Password, setPassword] = useState("");

const ResetPasswordHandler =(e) =>{
    e.preventDefault()
    dispatch(resetPassword(params.token,Password))
    console.log("reset");
}

  return (
    <div className="ResetPassword">
    <form className="ResetPasswordForm" onSubmit={ResetPasswordHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        Reset Password
      </Typography>
      <input
        type="password"
        placeholder="old password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />


      <button className="btn" type="submit">
        ResetPassword
      </button>
      <Link to="/forgot/password">
        <Typography>Send Token Again</Typography>
      </Link>
    </form>
  </div>
  )
}

export default ResetPassword
