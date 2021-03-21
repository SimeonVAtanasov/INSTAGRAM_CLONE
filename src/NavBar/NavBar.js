import {  Link } from "react-router-dom";
import Logo from "../Logo/Logo.js";
import Input from "../Input/Input.js";
import 'antd/dist/antd.css';
import styles from "../Input/Input.module.css";
import { Avatar } from 'antd';
import {
    HomeOutlined,
    SendOutlined,
    CompassOutlined,
    HeartOutlined,
    UserOutlined
  } from '@ant-design/icons';
import  "./NavBar.css"
export default function NavBar (){
    return  (<>
    
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
                <Link to="/"><HomeOutlined /></Link>
              </li>
              <li>
                <Link to="/inbox"><SendOutlined /></Link>
              </li>
              <li>
                <Link to="/explore"><CompassOutlined /></Link>
              </li>
              <li>
                <Link to="/notifications"><HeartOutlined /></Link>
              </li>
              <li>
                <Link to="profile"><Avatar  shape="circle" size={20} icon={<UserOutlined />}/></Link>
              </li>
            </ul>
          </nav>
        </header>
    </>);
}