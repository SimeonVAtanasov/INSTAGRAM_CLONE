import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import SettingsIcon from "@material-ui/icons/Settings";
import styles from "../ProfilePage/ProfilePage.module.scss";
import { v4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import ExplorePost from "../Explore/ExplorePost/ExplorePost.js";
import style from "../Explore/Explore.module.scss";
import StoriesSection from "../StoriesSection";
import StoryUpload from "../StoryUpload";
import { useSelector } from "react-redux";
import firebase from "firebase";


export default function ProfilePage() {

  const [user, setUser] = useState({
    displayName: "",
    photoUrl: "",
    email: "",
    following: [],
    followers: [],
    biography: "",
    uid: "",
  });

  const currentUser = useSelector(state => state.currentUser.user)

  const posts = useSelector((state) => state.posts.posts);
  const filteredPosts = posts.filter(({post}) => post.createdBy === user.uid);

  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [stories, setStories] = useState([]);

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasStories, setHasStories] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    db.collection("users")
      .doc(id)
      .get()
      .then((res) => {
        let data = res.data();

        if (id === currentUser.uid) {
          setIsCurrentUser(true);
          setUser(currentUser)
        } else {
          setIsCurrentUser(false);
          setUser({...data});
        }

        let isFollowedByUser = data.followers.some((element) => element === currentUser.uid);
        if (isFollowedByUser) {
          setIsFollowing(true);
        }
         
        db.collection("stories")
          .where("createdBy", "==", data.uid)
          .onSnapshot((querySnapshot) => {
            let storiesArr = [];

            querySnapshot.forEach((doc) => {
              storiesArr.push(doc.data().imageUrl);
            });

            setStories(storiesArr);

            if (!storiesArr.length) {
              setHasStories(false);
            } else {
              setHasStories(true);
            }
          });
      })
      .catch((err) => console.log(err.message));
  }, [id,  currentUser]);
  
  const handleFollow = () => {
    let userFollowersArr = [...user.followers];
    let clientFollowingArr = [...currentUser.following];
    if (!isFollowing) {
      userFollowersArr.push(currentUser.uid);
      clientFollowingArr.push(id);

      setUser((prevState) => ({ ...prevState, followers: userFollowersArr }));
    } else {
      let followerIndex = userFollowersArr.indexOf(currentUser.uid);
      let followingIndex = clientFollowingArr.indexOf(user.uid);

      userFollowersArr.splice(followerIndex, 1);
      clientFollowingArr.splice(followingIndex, 1);
      setUser((prevState) => ({ ...prevState, followers: userFollowersArr }));
    }
    // this is not the personal profile
    db.collection("users").doc(id).update({
      followers: userFollowersArr,
    });
    // this is the personal profile
    db.collection("users").doc(currentUser.uid).update({
      following: clientFollowingArr,
    });

    // db.collection("notifications").add({
    //   action: "commented your photo",
    //   fromUser: {
    //     displayName: currentUser.displayName,
    //     photoUrl: currentUser.photoUrl,
    //     uid: currentUser.uid,
    //   },
    //   forUser: uid,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      
    // });

    setIsFollowing(!isFollowing);
  };

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
            style={
              hasStories
                ? { background: "linear-gradient(to right, #f9c83f, #b31bb5)" }
                : { background: "#bdbdbd" }
            }
            className={styles.avatarProfile}
            alt={user.displayName || "User"}
            src={user.photoUrl || "/static/images/avatar/1.jpg"}
            onClick={handleOpen}
          />

          {isCurrentUser && (
            <StoryUpload
              user={user}
              text={"Upload story"}
              isPost={false}
              buttonText={"Upload story"}
            />
          )}

        </div>
        <div className={styles.profileInfoWrapper}>
          <h2>
            {user.displayName}
            {isCurrentUser ? (
              <Link to={"/profile/settings/" + user.uid}>
                <span> Edit profile </span>
                <SettingsIcon />
              </Link>
            ) : (
              <button className={styles.follow_button} onClick={handleFollow}>
                {isFollowing ? "Unfollow" : "Follow"}{" "}
              </button>
            )}
          </h2>
          <ul>
            <li>
              <span>{filteredPosts.length || 0}</span> <span>Posts</span>
            </li>
            <li>
              <span>{user.followers.length || 0}</span> <span>Followers</span>
            </li>
            <li>
              <span>{user.following.length || 0} </span> <span>Following</span>
            </li>
          </ul>

          <p>{user.biography}</p>
        </div>
      </header>
      {hasStories && (
        <StoriesSection
          user={user}
          isStoryOpen={isStoryOpen}
          handleClose={handleClose}
          stories={stories}
          setStories={setStories}
        />
      )}

      <main className={style.exploreProfileContainer}>
        {filteredPosts.map((post) => (
          <ExplorePost key={v4()} post={post.post} id={post.id} uid={user.uid} />
        ))}
      </main>
    </>
  );
}
