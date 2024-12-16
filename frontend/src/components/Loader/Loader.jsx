import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import { CircularProgress} from "@mui/material";

import "./Loader.css"

const Loader = () => {
  return (
   <div className = "loading"><CircularProgress sx={{
   
    color:"rgb(84, 22, 1)"
  }}
   /></div> 
  );
};
export default Loader;