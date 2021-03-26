import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { auth, db } from "../firebase";
import SettingsIcon from "@material-ui/icons/Settings";

import styles from "../ProfilePage/ProfilePage.module.scss";

import { v4 as uuidv4, v4 } from 'uuid';


import { Link, useParams } from "react-router-dom";

import ExplorePost from "../ExplorePost/ExplorePost.js";
import style from "../Explore/Explore.module.scss";
import StoriesSection from "../StoriesSection";
import StoryUpload from "../StoryUpload"




export default function ProfilePage() {

  //   const [stories, setStories] = useState([]);
  const [isStoryOpen, setIsStoryOpen] = useState(false);


  const handleOpen = () => {
    setIsStoryOpen(true);
  };

  const handleClose = () => {
    setIsStoryOpen(false);
  };

  const [user, setUser] = useState({
    displayName: "",
    photoUrl: "",
    email: "",
    following: 0,
    followers: 0,
    posts: [],
    stories: [],
    biography: "",
    uid: "",
    notifications: []
  })
  // const [posts, setPosts] = useState([]);

  const { id } = useParams();


  useEffect(() => {
    db.collection("users").doc(id).get()
      .then((res) => {
        let data = res.data();
        setUser({ ...data });
      })
      .catch(err => console.log(err.message))
  }, []);


  // useEffect(() => {

  //   db.collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       setPosts(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           post: doc.data(),
  //         }))
  //       );
  //     });
  // }, []);



  return (
    <div>
      <header className={styles.profilePage_header}>
        <div width={150} heigth={150}className={styles.avatarContainer}>
          <Avatar
            className={styles.avatarProfile}
            alt={user.displayName}
            src={user.photoUrl || "/static/images/avatar/1.jpg"}
            onClick={handleOpen}
          />
          <StoryUpload></StoryUpload>
        </div>
        <div className={styles.profileInfoWrapper}>

          <h2>
            {user.displayName}
            <Link to={"/profile/settings/" + user.uid}>
              <SettingsIcon />
            </Link>
          </h2>
          <ul >
            <li>{user.posts.length || 0} публикации</li>
            <li>{user.followers || 0}  последователи</li>
            <li>{user.following || 0}  последвани</li>
          </ul>

          <p>
            {user.biography}
          </p>


        </div>

      </header>
      {isStoryOpen && (
        <StoriesSection
          user={user}
          isStoryOpen={isStoryOpen}
          handleClose={handleClose}
        ></StoriesSection>
      )}

      <main className={style.exploreProfileContainer}>
        {user.posts.map(post => (
        
       
          <ExplorePost key={v4()} post={post} id={id} />
        ))}
      </main>
    </div>

  );
}
