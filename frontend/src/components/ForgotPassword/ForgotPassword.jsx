import React, { useState,useEffect } from 'react'
import { Button, Typography, button } from "@mui/material";
import "./ForgotPassword.css";
import { useDispatch,useSelector } from 'react-redux';
import { forgotPassword } from '../../Actions/user.action';
import { useAlert } from 'react-alert';

const ForgotPassword = () => {
  const {
    loading,
    error,
    message,
  } = useSelector((state) => state.like);
    const [email , setEmail] = useState("")
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const submitHandler = async(e) =>{
        e.preventDefault();
        await dispatch(forgotPassword(email))
    }

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
    <div className="ForgotPassword">
    <form className="ForgotPasswordForm" onSubmit={submitHandler}>
      <Typography variant="h3" style={{ padding: "2vmax" }}>
        Enter registered Email
      </Typography>
      <input type="email" placeholder="Email" value={email}  onChange={(e) => setEmail(e.target.value)} required />
  


      <button className= "btn" type="submit">Send Token</button>

    </form>
  </div>
  )
}

export default ForgotPassword
