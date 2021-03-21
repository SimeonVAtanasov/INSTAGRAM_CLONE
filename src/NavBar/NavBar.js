import { Link } from "react-router-dom";
import Logo from "../Logo/Logo.js";
import Input from "../Input/Input.js";
import styles from "../Input/Input.module.css";
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import { Avatar } from "@material-ui/core";
import "./NavBar.css"

import { auth } from "../firebase.js";
import { useState } from "react";

export default function NavBar() {

  const [username, setUsername]= useState("");

  auth.onAuthStateChanged(function(user) {
    if (user) {
    console.log("🚀 ~ file: NavBar.js ~ line 18 ~ firebase.auth ~ user", user)
      setUsername(user.displayName)
      
    } else {
      alert("nolog")
    }
  });

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

            <li >
              <form>
                <Input className={styles.searchInput} title="Търсене" />
              </form>
            </li>
          </ul>
          <ul id="linkNav">

            <li>
              <Link to="/"><HomeOutlinedIcon /></Link>
            </li>
            <li>
              <Link to="/inbox"><SendOutlinedIcon /></Link>
            </li>
            <li>
              <Link to="/explore"><ExploreOutlinedIcon /></Link>
            </li>
            <li>
              <Link to="/notifications"><FavoriteBorderOutlinedIcon /></Link>
            </li>
            <li>
              <Link to="profile">
                <Avatar
                  id="nav_avatar"
                  alt={username}
                  //   => alt will later be  {username}
                  src="/static/images/avatar/1.jpg"
                ></Avatar>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}