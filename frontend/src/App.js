// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useEffect } from "react";
import { darkScrollbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/user.action";
import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import Search from "./components/Search/Search";
import Newpost from "./components/Newpost/Newpost";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UserProfile from "./components/UserProfile/UserProfile";
import Funds from "./components/Funds/Funds";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Router>
      {isAuthenticated && <Header />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Login />}
        ></Route>
        <Route
          path="/Register"
          element={isAuthenticated ? <Account /> : <Register />}
        ></Route>
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        ></Route>
        <Route
          path="/newpost"
          element={isAuthenticated ? <Newpost /> : <Login />}
        ></Route>
        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        ></Route>
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        ></Route>

        <Route path="/forgot/password" element={<ForgotPassword />}></Route>
        
        <Route path="/password/reset/:token" element={<ResetPassword/>}></Route>

        <Route path="/user/:id" element={<UserProfile/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/addfunds" element={<Funds/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
