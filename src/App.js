import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Home/Home";
import NavBar from "./NavBar/NavBar"
import { db, auth } from "./firebase";
import Login from "./Login/Login.js";
import Explore from "./Explore/Explore";
import ProfilePage from "./ProfilePage/ProfilePage";
import SettingsPage from "./SettingsPage/SettingsPage";

function App() {

  const [isLoggedIn, setStatus] = useState(false); // should be false
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});


  let changeStatusLoggedIn = () => { setStatus(prevState => !prevState) };

  auth.onAuthStateChanged(function (user) {
    if (user) {
      setStatus(true);
      setUser(user);
    }
  });

  useEffect(() => {
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <Router id="router">

      {isLoggedIn ? <>
        <NavBar onLogout={changeStatusLoggedIn} />
      </> : <Redirect to="/login" />}

      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home posts={posts} /> : <Login setStatus={changeStatusLoggedIn} />}
        </Route>
        <Route path="/inbox">
          <Inbox />
        </Route>

        <Route path="/explore">
          <Explore posts={posts} />
        </Route>

        <Route path="/notifications">
          <Notifications />
        </Route>

        <Route  exact path={"/profile/" + user.displayName}>
          <ProfilePage />
        </Route>

        <Route path={"/profile/" + user.displayName + "/settings"}>
          <SettingsPage />
        </Route>

        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>

      </Switch>
    </Router>
  );
}

function Inbox() {
  return <h2>Inbox</h2>;
}



function Notifications() {
  return <h2>Notifications</h2>;
}

export default App;
