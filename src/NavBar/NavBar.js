import { Link, Redirect } from "react-router-dom";
import Logo from "./Logo/Logo.js";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";


import { Avatar, TextField, Tooltip } from "@material-ui/core";
import "./NavBar.scss";

import { auth, db } from "../AppService/firebase";

import React, { useState, useEffect } from "react";
import NotificationsPop from "../NotificationsPop/NotificationsPop.js";
import { makeStyles } from "@material-ui/core/styles";
import { v4 } from "uuid";
import Comment from "../Post/Comment/Comment.js";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
 
  searchInput: {
    "& > *": {
      marginTop: "-7px",
      width: "25ch",
      height: "35px",
      padding: "0",
      position: "relative",
    },
  },

  suggestionBox: {
    height: "auto",
    marginTop: "6px",
    border: "1px solid lightgray",
    borderTop: "none",
    backgroundColor: "white",
    width: "220px",
    borderRadius: "3px",
  },
}));

export default function NavBar({ onLogout }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const classes = useStyles();
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        onLogout(false);
        <Redirect to="/" />;
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        let fetchedUsers = [];
        querySnapshot.forEach((doc) => {
          fetchedUsers.push(doc.data());
          setUsers(fetchedUsers);
        });
      });
  }, []);

  const handleInput = (ev) => {
    ev.preventDefault();
    setFilteredUsers([]);

    let text = ev.target.value;
    setSearchInput(text);
    if (text) {
      let filteredUsers = users.filter((user) =>
        user.displayName
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(text.toLowerCase())
      );
      setFilteredUsers(filteredUsers);
    }
  };
  return (
    <>
      <header className="app_header">
        <nav>
          <ul id="mainNav">
            <li id="logo">
              <Link to="/">
                <Logo width={"100px"} />
              </Link>
            </li>
          </ul>
          <ul id="inputNav">
            <li>
              <form className={classes.searchInput}>
                <TextField
                  className={classes.searchInput}
                  autoComplete= "off"
                  id="filled-basic"
                  label="Search user..."
                  variant="filled"
                  value={searchInput}
                  onInput={(e) => {
                    handleInput(e);
                  }}
                />
                <div className={classes.suggestionBox}>
                  {filteredUsers.map((user) => (
                    <Comment
                      username={user.displayName}
                      userPhoto={user.photoUrl}
                      key={v4()}
                      uid={user.uid}
                      onClick={() => {
                        setSearchInput("");
                        setFilteredUsers([]);
                      }}
                    />
                  ))}
                </div>
              </form>
            </li>
          </ul>
          <ul id="linkNav">
            <li>
              <Link to="/">
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title="Home"
                  arrow
                >
                  <HomeOutlinedIcon style={{ fontSize: 32 }} />
                </Tooltip>
              </Link>
            </li>
            <li>
              <Link to="/inbox">
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title="Inbox"
                  arrow
                >
                  <SendOutlinedIcon style={{ fontSize: 26 }} />
                </Tooltip>
              </Link>
            </li>
            <li>
              <Link to="/explore">
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title="Explore"
                  arrow
                >
                  <ExploreOutlinedIcon style={{ fontSize: 26 }} />
                </Tooltip>
              </Link>
            </li>
            <li>
              <NotificationsPop {...currentUser} />
            </li>
            <li>
              <div className={"profile_nav"}>
                <Avatar
                  id="nav_avatar"
                  alt={currentUser.displayName}
                  src={currentUser.photoUrl || "/static/images/avatar/1.jpg"}
                />
              </div>

              <div className="options">
                <Link to={`/profile/${currentUser.uid}`}>
                  <AccountCircleOutlinedIcon />
                  <p>Profile</p>
                </Link>

                <Link to={"/profile/settings/" + currentUser.uid}>
                  <SettingsOutlinedIcon />
                  <p>Settings</p>
                </Link>
                <Link to={"/login"}>
                  <p onClick={handleLogout}>Log out</p>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
