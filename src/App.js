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
import ChatRoom from "./ChatRoom/ChatRoom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // should be false
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let changeStatusLoggedIn = () => { setIsLoggedIn(prevState => !prevState) };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const id = user.uid
        db.collection("users").doc(id).get()
          .then((res) => {
            let data = res.data();
            setUser({ ...data });
            setIsLoggedIn(true);
            setIsLoading(false);
          })
      }
      else {
        <Redirect to="/login" />
        setIsLoading(false)
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

  if (isLoading) {

    return (<img src={"./LoadingIMG.png"} style={{ marginLeft: "25%" }} alt={"logo"} />)
  } else {
    return (


      (<Router id="router">

        {isLoggedIn && <>
          <NavBar onLogout={changeStatusLoggedIn} user={user} />
        </>}
        <div>
          <Switch>
            <Route exact path="/">
              {isLoggedIn ? <Home posts={posts} user={user} /> : <Login />}
            </Route>
            <Route path="/inbox">
              <ChatRoom />
            </Route>

            <Route path="/explore">
              <Explore posts={posts} />
            </Route>

            <Route exact path={`/profile/:id`}>
              <ProfilePage />
            </Route>

            <Route path={"/profile/settings/:id"}>
              <SettingsPage userData={user} />
            </Route>

            <Route exact path="/login">
              {!isLoggedIn && <Login />}
            </Route>

          </Switch>
        </div>
      </Router>)




    );
  }


}

export default App;
