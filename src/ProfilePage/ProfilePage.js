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

  const [posts, setPosts] = useState([]);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [user, setUser] = useState({
    displayName: "",
    photoUrl: "",
    email: "",
    following: [],
    followers: [],
    biography: "",
    uid: "",
    notifications: []
  })
  const { id } = useParams();

  useEffect(() => {
    db.collection("users").doc(id).get()
      .then((res) => {
        let data = res.data();
        setUser({ ...data });

        db.collection("posts").where("createdBy", "==", data.uid)
          .onSnapshot((querySnapshot) => {
            let posts = [];

            querySnapshot.forEach((doc) => {
              posts.push(doc.data())
            });

            setPosts(posts);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });


      })
      .catch(err => console.log(err.message))


  }, [id]);

  const handleOpen = () => {
    setIsStoryOpen(true);
  };

  const handleClose = () => {
    setIsStoryOpen(false);
  };

  return (
    <>
      <header className={styles.profilePage_header}>
        <div className={styles.avatar_container}>
          <Avatar
            className={styles.avatarProfile}
            alt={user.displayName}
            src={user.photoUrl || "/static/images/avatar/1.jpg"}
            onClick={handleOpen}
          />
          <StoryUpload ></StoryUpload>
        </div>
        <div className={styles.profileInfoWrapper}>

          <h2>
            {user.displayName}
            <Link to={"/profile/settings/" + user.uid}>
              <SettingsIcon />
            </Link>
          </h2>
          <ul >
            <li>{posts.length || 0} публикации</li>
            <li>{user.followers.length || 0}  последователи</li>
            <li>{user.following.length || 0}  последвани</li>
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
        {posts.map(post => (


          <ExplorePost key={v4()} post={post} />
        ))}
      </main>
    </>

  );
}
