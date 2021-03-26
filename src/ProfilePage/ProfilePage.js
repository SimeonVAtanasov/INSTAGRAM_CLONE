import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { auth, db } from "../firebase";
import SettingsIcon from "@material-ui/icons/Settings";

import styles from "../ProfilePage/ProfilePage.module.scss";



import { Link, useParams } from "react-router-dom";

import ExplorePost from "../ExplorePost/ExplorePost.js";
import style from "../Explore/Explore.module.scss";
import StoriesSection from "../StoriesSection";
import StoryUpload from "../StoryUpload"




export default function ProfilePage() {
  const [user, setUser] = useState({
    displayName: "User",
    photoURL: "/static/images/avatar/1.jpg",
  });
  const [posts, setPosts] = useState([]);
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
        uid: ""
    })
    const [posts, setPosts] = useState([]);

    const { id } = useParams();


    useEffect(() => {
        db.collection("users").doc(id).get()
            .then((res) => {
                let data = res.data();
                setUser({ ...data });
            })
            .catch(err => console.log(err.message))
    }, []);

    useEffect(() => {

  useEffect(() => {
    let user = auth.currentUser;
    if (user) {
      setUser(user);
    }

    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

 

    return (
        <div>
            <header className={styles.profilePage_header}>
                <div>
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
        {user.posts.map(({ id, post }) => (
          <ExplorePost key={id} post={post} id={id} />
        ))}
      </main>
  );
}
