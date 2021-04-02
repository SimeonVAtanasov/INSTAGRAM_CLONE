import React, { useEffect, useState } from "react";
import styles from "../PostMenu/PostMenu.module.scss";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { db } from "../../firebase";
import firebase from "firebase/app";


function PostMenu({
  setLikedByNumber,
  postId,
  setOpenModal,
  isLiked,
  setIsLiked,
  likedByUsers,
  setLikedByUsers,
  setShowHeart
}) {

  const userCredential = firebase.auth().currentUser;

  useEffect(() => {
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .onSnapshot((snap) => {
          let likesArr = snap.data().likedBy;
          setLikedByNumber(likesArr.length);
          let isLikedByUser = likesArr.some((id) => id === userCredential.uid);
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
    let likedByArr = [];
    if (!isLiked) {
      likedByArr.push(userCredential.uid);
      setLikedByUsers(likedByArr);
    } else {
      let index = likedByArr.indexOf(userCredential.uid);
      likedByUsers.splice(index, 1);
      setLikedByUsers(likedByArr);
    }

    db.collection("posts").doc(postId).update({
      likedBy: likedByArr,
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
