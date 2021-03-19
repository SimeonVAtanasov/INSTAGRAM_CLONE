import React, {useState, useEffect} from "react"; 
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import {db} from "./firebase";

function App() {

  const [posts, setPosts] = useState([]); 

  useEffect(()=>{
    db.collection("posts").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc =>({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])
  
  return (
    <Router>
      <header className="app_header">
        <nav>
          <ul className="mainNav">
            <li id="logo">
              <Link to="/">
                <img
                  className="header_image"
                  src={"logoHeader.png"}
                  alt="instagram"
                />
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
        <Route exact path="/">
          <Home posts = {posts} />
        </Route>
      </Switch>
    </Router>
  );
}

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//       {posts.map(post => (<Post username = {post.username} caption = {post.caption} imageUrl = {post.mageUrl} ></Post>))}
     
//     </div>
//   );
// }

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
