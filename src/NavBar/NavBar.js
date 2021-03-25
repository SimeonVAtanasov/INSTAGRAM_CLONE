import { Link, Redirect } from "react-router-dom";
import Logo from "../Logo/Logo.js";
import Input from "../Input/Input.js";
import styles from "../Input/Input.module.css";

import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import { Avatar } from "@material-ui/core";
import "./NavBar.scss"

import { auth } from "../firebase";

import React, { useState, useEffect } from 'react';



export default function NavBar({ onLogout }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    let user = auth.currentUser;
    setUser(user)

  }, [])


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
              <Link to="/"><HomeOutlinedIcon style={{ fontSize: 32 }} /></Link>
            </li>
            <li>
              <Link to="/inbox"><SendOutlinedIcon style={{ fontSize: 26 }} /></Link>
            </li>
            <li>
              <Link to="/explore"><ExploreOutlinedIcon style={{ fontSize: 26 }} /></Link>
            </li>
            <li>
              <Link to="/notifications"><FavoriteBorderOutlinedIcon style={{ fontSize: 26 }} /></Link>
            </li>
            <li>
              <div className={"profile_nav"}>
                <Avatar
                  id="nav_avatar"
                  alt={user.displayName}
                  src={user ? user.photoURL : "/static/images/avatar/1.jpg"}
                ></Avatar>
              </div>

              <div className="options">
                <Link to={"/profile/" + user.displayName}>
                  <p >Профил</p>
                </Link>

                <Link to={`/profile/${user.displayName}/settings`}>
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