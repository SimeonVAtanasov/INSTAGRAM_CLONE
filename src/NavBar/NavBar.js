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
export default function NavBar() {
  return (<>

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
            <Link to="profile"><Avatar
              className="post_avatar"
              alt={"User"}
              //   => alt will later be  {username}
              src="/static/images/avatar/1.jpg"
            ></Avatar></Link>
          </li>
        </ul>
      </nav>
    </header>
  </>);
}