import { Link, Redirect } from "react-router-dom";
import Logo from "../Logo/Logo.js";
import Input from "../Input/Input.js";
import styles from "../Input/Input.module.css";

import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import { Avatar } from "@material-ui/core";
import "./NavBar.css"

import { auth } from "../firebase";

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



export default function NavBar({onLogout}) {

  let user = auth.currentUser;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    auth.signOut()
    .then(()=>{
      onLogout(false);
      <Redirect to="/"/>
    })
    .catch((err)=> alert(err.message))
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

              <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  <Avatar
                    id="nav_avatar"
                    alt={user.displayName}
                    src="/static/images/avatar/1.jpg"
                  ></Avatar>
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link to="profile">

                    <MenuItem onClick={handleClose}>Профил</MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}>Настройки</MenuItem>
                  <MenuItem onClick={handleLogout}>Изход</MenuItem>
                </Menu>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}