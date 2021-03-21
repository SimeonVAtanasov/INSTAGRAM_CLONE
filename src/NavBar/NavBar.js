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

export default function NavBar() {

  let user = auth.currentUser;

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
              <Link to="profile">
                <Avatar
                  id="nav_avatar"
                  alt={user.username.toUpperCase()}
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