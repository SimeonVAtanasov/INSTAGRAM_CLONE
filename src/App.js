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

  const [isLoggedIn, setIsLoggedIn] = useState(false); // should be false
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});


  let changeStatusLoggedIn = () => { setIsLoggedIn(prevState => !prevState) };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const id = user.uid
        db.collection("users").doc(id).get()
          .then((res) => {
            let data = res.data();
            setUser({...data});
            setIsLoggedIn(true);
          })
      }
    });
  }, [])
      
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
        <NavBar onLogout={changeStatusLoggedIn}  user={user} />
      </> : <Redirect to="/login" />}
      <div>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Home posts={posts} user={user} /> : <Login />}
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

          <Route exact path={`/profile/:id`}>
            <ProfilePage />
          </Route>

          <Route path={"/profile/settings/:id"}>
            <SettingsPage userData={user} />
          </Route>

          <Route exact path="/login">
            {isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>

        </Switch>
      </div>
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
