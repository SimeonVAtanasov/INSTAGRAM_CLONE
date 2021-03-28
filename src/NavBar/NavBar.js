import { Link, Redirect } from "react-router-dom";
import Logo from "./Logo/Logo.js";
import Input from "../Login/Input/Input.js";
import styles from "../Login//Input/Input.module.css";

import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import { Avatar, Tooltip } from "@material-ui/core";
import "./NavBar.scss"

import { auth, db } from "../firebase";

import React, { useState, useEffect } from 'react';
import NotificationsPop from "../NotificationsPop/NotificationsPop.js";



export default function NavBar({ onLogout, user }) {

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        onLogout(false);
        <Redirect to="/" />
      })
      .catch((err) => alert(err.message))
  }

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
                <Input className={styles.searchInput} placeholder="Търсене" />
              </form>
            </li>
          </ul>
          <ul id="linkNav">

            <li>
              <Link to="/">
                <Tooltip disableFocusListener disableTouchListener title="Home" arrow>
                  <HomeOutlinedIcon style={{ fontSize: 32 }} />
                </Tooltip>

              </Link>
            </li>
            <li>
              <Link to="/inbox">
                <Tooltip disableFocusListener disableTouchListener title="Inbox" arrow>
                  <SendOutlinedIcon style={{ fontSize: 26 }} />
                </Tooltip>

              </Link>
            </li>
            <li>
              <Link to="/explore">
                <Tooltip disableFocusListener disableTouchListener title="Explore" arrow>
                  <ExploreOutlinedIcon style={{ fontSize: 26 }} />
                </Tooltip>
              </Link>
            </li>
            <li>
              {/* <Link to="/notifications"><FavoriteBorderOutlinedIcon style={{ fontSize: 26 }} /></Link> */}
              <a href="#notifications">
                  <NotificationsPop {...user} />
              </a>
            </li>
            <li>
              <div className={"profile_nav"}>
                <Avatar
                  id="nav_avatar"
                  alt={user.displayName}
                  src={user.photoUrl || "/static/images/avatar/1.jpg"}
                ></Avatar>
              </div>

              <div className="options">
                <Link to={`/profile/${auth.currentUser.uid}`}>
                  <p>Профил</p>
                </Link>

                <Link to={"/profile/settings/" + user.uid}>
                  <p >Настройки</p>
                </Link>

                <p onClick={handleLogout}>Изход</p>
              </div>

            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}