import React, { useEffect, useState } from "react";
import styles from "../PostMenu/PostMenu.module.scss";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { db } from "../../firebase";
import firebase from "firebase/app";
import {useSelector} from "react-redux";


function PostMenu({
  setLikedByNumber,
  postId,
  setOpenModal,
  isLiked,
  setIsLiked,
  likedByUsers,
  setLikedByUsers,
  setShowHeart,
  uid,
  imageUrl,
}) {


  const [user, setUser] = useState({});


  useEffect(() => {
    let userCredential = firebase.auth().currentUser;
    db.collection("users")
        .doc(userCredential.uid)
        .get()
        .then((userData) => {
            let currentUser = userData.data();
            setUser(currentUser)
        })
}, [uid]);



  useEffect(() => {
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .onSnapshot((snap) => {
          let likesArr = snap.data().likedBy;
          setLikedByNumber(likesArr.length);
          let isLikedByUser = likesArr.some((id) => id === user.uid);
          if (isLikedByUser) {
            setIsLiked(true)
          }
        });
    }
  }, [postId]);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleLike = () => {
    console.log(user);
    
    let likedByArr = [];
    if (!isLiked) {
      likedByArr.push(user.uid);
      setLikedByUsers(likedByArr);
    } else {
      let index = likedByArr.indexOf(user.uid);
      likedByUsers.splice(index, 1);
      setLikedByUsers(likedByArr);
    }

    db.collection("posts").doc(postId).update({
      likedBy: likedByArr,
    });


    db.collection("notifications").add({
      action: "liked your photo",
      fromUser: {
          displayName: user.displayName,
          photoUrl: user.photoUrl,
          uid: user.uid, 
      },
      forUser: uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      target:imageUrl,
  });

    
    setIsLiked(!isLiked);
    setShowHeart(false);
  };

  return (
    <div className={styles.card_menu}>
      <div className={styles.interactions}>
        {isLiked ? (
          <FavoriteOutlinedIcon
            onClick={handleLike}
            className={styles.icon}
            style={{ fill: "rgb(237, 73, 86)" }}
          />
        ) : (
          <FavoriteBorderIcon onClick={handleLike} className={styles.icon} />
        )}

        <ModeCommentOutlinedIcon
          className={styles.icon}
          onClick={handleOpen}
        />
        <SendOutlinedIcon className={styles.icon}/>
      </div>
      <TurnedInNotIcon className={styles.icon}/>
    </div>
  );
}

export default PostMenu;
