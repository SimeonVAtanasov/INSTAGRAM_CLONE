import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import { db } from "./firebase";
import Logo from "./Logo/Logo.js";
import Login from "./Login/Login.js";

function App() {
  let isLoggedIn = false;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  if (isLoggedIn) {
    return (

      <Router>

        <header className="app_header">
          <nav>
            <ul className="mainNav">
              <li id="logo">
                <Link to="/">
                  <Logo />
                </Link>

              </li>
              <li id="inputMain">
                <form>
                  <input />
                </form>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/inbox">Inbox</Link>
              </li>
              <li>
                <Link to="/explore">Explore</Link>
              </li>
              <li>
                <Link to="/notifications">Notifications</Link>
              </li>
              <li>
                <Link to="profile">Profile</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route path="/inbox">
            <Inbox />
          </Route>

          <Route path="/explore">
            <Explore />
          </Route>

          <Route path="/notifications">
            <Notifications />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route exact path="/login">
            {!isLoggedIn ? <Login /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/">
            <Home posts={posts} />
          </Route>
        </Switch>
      </Router>
    );
  } else {
    return (<Login />);
  }
}


function Inbox() {
  return <h2>Inbox</h2>;
}


function Explore() {
  return <h2>Explore</h2>;
}

function Notifications() {
  return <h2>Notifications</h2>;
}

function Profile() {
  return <h2>Profile</h2>;
}
export default App;
