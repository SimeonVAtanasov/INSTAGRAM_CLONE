import React, { useEffect, useState } from "react";
import styles from "../PostMenu/PostMenu.module.scss";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { db } from "../../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";

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
  likedBy 
}) {
  const currentUser = useSelector((state) => state.currentUser.user);

  useEffect(() => {

    if (postId) {
      db.collection("posts")
        .doc(postId)
        .onSnapshot((snap) => {
          let likesArr = snap.data().likedBy;
          setLikedByNumber(likesArr.length);
          let isLikedByUser = likesArr.some((id) => id === currentUser.uid);
          if (isLikedByUser) {
            setIsLiked(true);
          }
        });
    }
  }, [postId]);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleLike = () => {
    let likedByArr = [...likedBy];
    if (!isLiked) {
      likedByArr.push(currentUser.uid);
      setLikedByUsers(likedByArr);
    } else {
      let index = likedByArr.indexOf(currentUser.uid);
      likedByArr.splice(index, 1);
      setLikedByUsers(likedByArr);
    }

    db.collection("posts").doc(postId).update({
      likedBy: likedByArr,
    });

    if (!currentUser && !isLiked) {
      db.collection("notifications").add({
        action: "liked your photo",
        fromUser: {
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoUrl,
          uid: currentUser.uid,
        },
        forUser: uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        target: imageUrl,
      });
    }

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

        <ModeCommentOutlinedIcon className={styles.icon} onClick={handleOpen} />
        {/* <SendOutlinedIcon className={styles.icon} /> */}
      </div>
      {/* <TurnedInNotIcon className={styles.icon} /> */}
    </div>
  );
}

export default PostMenu;
