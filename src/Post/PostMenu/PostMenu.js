import React, { useEffect, useState } from "react";
import styles from "../PostMenu/PostMenu.module.scss";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { db } from "../../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";

function PostMenu({
  setLikedByNumber,
  postId,
  setOpenModal,
  isLiked,
  setIsLiked,
  setLikedByUsers,
  setShowHeart,
  uid,
  imageUrl,
  likedBy,
  setIsSaved,
  isSaved,
  savedBy,
}) {
  const currentUser = useSelector((state) => state.currentUser.user);

  useEffect(() => {
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .onSnapshot((snap) => {
          let likesArr = snap.data().likedBy;
          let savedPostsArr = snap.data().savedBy;
          console.log(snap.data().savedBy)
          let isSavedByUser = savedPostsArr.some((id) => id === postId);
          let isLikedByUser = likesArr.some((id) => id === currentUser.uid);
          
          setLikedByNumber(likesArr.length);
          if (isLikedByUser) {
            setIsLiked(true);
          }

          if(isSavedByUser){
            setIsSaved(true);
          }
        });
    }
  }, [postId]);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleSave = () => {
    let savedArr = [...savedBy];

    if (!isSaved) {
      savedArr.push(currentUser.uid);
    } else {
      let index = savedArr.indexOf(currentUser.uid);
      savedArr.splice(index, 1);
    }

    db.collection("posts").doc(postId).update({
      savedBy: savedArr,
    });

    setIsSaved(!isSaved);
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

    if (uid !== currentUser.uid && !isLiked) {
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
      {isSaved ? (
        <BookmarkIcon className={styles.icon} onClick={handleSave} />
      ) : (
        <TurnedInNotIcon className={styles.icon} onClick={handleSave} />
      )}
    </div>
  );
}

export default PostMenu;
