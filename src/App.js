import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { subscribeToRealTimeEvents } from "./Post/Posts.actions"
import { getCurrentUser } from "./CurrentUser.actions";

function App() {

  const dispatch = useDispatch();
  // const posts = useSelector(state => state.posts.posts);
  const currentUser = useSelector(state => state.currentUser)

  const [isLoggedIn, setIsLoggedIn] = useState(false); // should be false

  const [isLoading, setIsLoading] = useState(true);

  let changeStatusLoggedIn = () => { setIsLoggedIn(prevState => !prevState) };

  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getCurrentUser(user));
        setIsLoggedIn(true)
        setIsLoading(false)
      } else {
        <Redirect to="/login" />
        setIsLoading(false)
      }
    });
  }, [])

  useEffect(() => {
    dispatch(subscribeToRealTimeEvents());
  }, []);

  if (isLoading) {

    return (<img src={"./LoadingIMG.png"} style={{ marginLeft: "25%" }} alt={"logo"} />)
  } else {
    return (


      (<Router id="router">

        {isLoggedIn && <>
          <NavBar onLogout={changeStatusLoggedIn}  />
        </>}
        <div>
          <Switch>
            <Route exact path="/">
              {isLoggedIn ? <Home  /> : <Login />}
            </Route>
            <Route path="/inbox">
              <ChatRoom  />
            </Route>

            <Route path="/explore">
              <Explore/>
            </Route>

            <Route exact path={`/profile/:id`}>
              <ProfilePage  />
            </Route>

            <Route path={"/profile/settings/:id"}>
              <SettingsPage currentUser={currentUser} />
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
