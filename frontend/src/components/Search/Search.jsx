import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@mui/icons-material";
import "./Search.css";
import { Button, Typography, button } from "@mui/material";
import User from "../User/User";
import { getAllUsers } from "../../Actions/user.action";

const Search = () => {
  const dispatch = useDispatch();
  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );
  const [search, setsearch] = useState(false);
  const [name, setname] = useState("");

  const SearchHandler = async (e) => {
    e.preventDefault();
    await dispatch(getAllUsers(name));
    setsearch(true);
    // console.log("searching... " + name);
  };
  return (
    <div className="Search">
      <form className="SearchForm" onSubmit={SearchHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Search
        </Typography>
        <input
          type="text"
          placeholder="Write name to search"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        {/* <button className= "btn" type="submit">Search</button> */}
        <Button type="submit" variant="contained" sx ={{backgroundColor:"rgb(252, 142, 83)","&:hover": {
                  backgroundColor:"rgb(252, 111, 35)",
                }}}>
          <SearchOutlined sx ={{color:"white"}}/>
        </Button>

        <div>
         
          {search ? (
            <Typography sx={{ margin: "1vmax auto" }}>
              {name === ""
                ? "Nothing found but these are some users you might like to interact"
                : name + " found"}{" "}
            </Typography>
          ) : null}
        </div>
        
        <div className="users">
         
          {users && users.length > 0 ? (
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))
          ) : (
            <Typography variant="h6">No Users Found</Typography>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
