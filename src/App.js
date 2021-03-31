import React, { useState, useEffect} from "react";
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
import {fetchPosts} from "./Post/Posts.actions"

function App() {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // should be false
  
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let changeStatusLoggedIn = () => { setIsLoggedIn(prevState => !prevState) };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const id = user.uid
        db.collection("users").doc(id).get()
          .then((res) => {
            let data = res.data();
            setCurrentUser({ ...data });
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
    dispatch(fetchPosts());
  }, []);

  if (isLoading) {

    return (<img src={"./LoadingIMG.png"} style={{ marginLeft: "25%" }} alt={"logo"} />)
  } else {
    return (


      (<Router id="router">

        {isLoggedIn && <>
          <NavBar onLogout={changeStatusLoggedIn} currentUser={currentUser} />
        </>}
        <div>
          <Switch>
            <Route exact path="/">
              {isLoggedIn ? <Home posts={posts} currentUser={currentUser} /> : <Login />}
            </Route>
            <Route path="/inbox">
              <ChatRoom currentUser={currentUser}/>
            </Route>

            <Route path="/explore">
              <Explore posts={posts} />
            </Route>

            <Route exact path={`/profile/:id`}>
              <ProfilePage currentUser={currentUser} />
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
