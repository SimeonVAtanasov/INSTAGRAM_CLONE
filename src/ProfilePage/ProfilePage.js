import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import SettingsIcon from "@material-ui/icons/Settings";
import styles from "../ProfilePage/ProfilePage.module.scss";
import { v4 as uuidv4, v4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import ExplorePost from "../Explore/ExplorePost/ExplorePost.js";
import style from "../Explore/Explore.module.scss";
import StoriesSection from "../StoriesSection";
import StoryUpload from "../StoryUpload";
import firebase from "firebase/app";

// TO DO REFACTOR AGAIN WORK FLOW INTETUPTED
export default function ProfilePage(props) {

  // const browsingUser = firebase.auth().currentUser;

  const [user, setUser] = useState({
    displayName: "",
    photoUrl: "",
    email: "",
    following: [],
    followers: [],
    biography: "",
    uid: "",
  });

  // let followingCount = user.following.length;
  // let followersCount = user.followers.length;
  const [currentUser, setCurrentUser] = useState(props.currentUser)
  const [posts, setPosts] = useState([]);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [stories, setStories] = useState([]);

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // const [followedByNumber, setFollowedByNumber] = useState(followersCount);
  // const [followingNumber, setFollowingNumber] = useState(followingCount);

  const [hasStories, setHasStories] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    db.collection("users")
      .doc(id)
      .get()
      .then((res) => {
        let data = res.data();
        // setUser({ ...data });
        setUser(data);

        if (user.uid === currentUser.uid) {
          setIsCurrentUser(true);
        } else {
          setIsCurrentUser(false);
        }
        let isFollowedByUser = data.followers.some(
          (id) => id === currentUser.uid
        );
        if (isFollowedByUser) {
          setIsFollowing(true);
        }

        db.collection("posts")
          .where("createdBy", "==", data.uid)
          .onSnapshot((querySnapshot) => {
            let posts = [];

            querySnapshot.forEach((doc) => {
              posts.push(doc.data());
            });

            setPosts(posts);
          });
        // .catch((error) => {
        //   console.log("Error getting documents: ", error);
        // });

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

        // db.collection("users")
        //   .doc(id)
        //   .onSnapshot((snap) => {
        //     let followers = snap.data().followers;
        //     let following = snap.data().following
        // setFollowedByNumber(followers.length);
        // setFollowingNumber(following.length);

        // });
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  useEffect(() => {
    db.collection("users")
      .doc(id)
      .onSnapshot(user => {
        setCurrentUser(user.data())

        
      })
  }, [user.uid, currentUser]);

  const handleFollow = () => {
    let userFollowersArr = [...user.followers];
    let clientFollowingArr = [...currentUser.following];
    if (!isFollowing) {

      userFollowersArr.push(currentUser.uid);
      clientFollowingArr.push(user.uid);

      setUser(prevState => ({ ...prevState, followers: userFollowersArr }))

    } else {

      let followerIndex = userFollowersArr.indexOf(currentUser.uid);
      let followingIndex = clientFollowingArr.indexOf(user.uid);

      userFollowersArr.splice(followerIndex, 1);
      clientFollowingArr.splice(followingIndex, 1);

    }
    // this is not the personal profile
    db.collection("users").doc(id).update({
      followers: userFollowersArr,
    });
    //  this is the personal profile
    db.collection("users").doc(currentUser.uid).update({
      following: clientFollowingArr,
    });

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
            style={hasStories ? { background: "linear-gradient(to right, #f9c83f, #b31bb5)" } : { background: "none" }}
            className={styles.avatarProfile}
            alt={user.displayName}
            src={user.photoUrl || "/static/images/avatar/1.jpg"}
            onClick={handleOpen}
          />


          <StoryUpload
            user={user}
            text={"Upload story"}
            isPost={false}
            buttonText={"Upload story"}
          ></StoryUpload>
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
            <li><span>{posts.length || 0}</span>  <span>Posts</span></li>
            <li><span>{user.followers.length || 0}</span> <span>Followers</span></li>
            <li><span>{user.following.length || 0} </span> <span>Following</span></li>
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
        ></StoriesSection>
      )}

      <main className={style.exploreProfileContainer}>
        {posts.map((post) => (
          <ExplorePost key={v4()} post={post} />
        ))}
      </main>
    </>
  );
}
