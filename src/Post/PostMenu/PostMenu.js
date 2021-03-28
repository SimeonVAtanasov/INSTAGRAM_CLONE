import React, { useEffect, useState } from "react";
import styles from "../PostMenu/PostMenu.module.scss";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { db } from "../../firebase";
import firebase from "firebase/app";
import PostModal from "../PostModal"

function PostMenu({
  isLiked,
  setIsLiked,
  likedByNumber,
  setLikedByNumber,
  postId,
  openModal,
  setOpenModal
}) {




  const handleOpen = () => {
    setOpenModal(true);
  };


  const handleLike = () => {
    if (!isLiked) {
      setLikedByNumber(++likedByNumber);
    } else {
      setLikedByNumber(--likedByNumber);
    }

    db.collection("posts").doc(postId).update({
      likes: likedByNumber,
    });
    setIsLiked(!isLiked);
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
        ></ModeCommentOutlinedIcon>
        <SendOutlinedIcon className={styles.icon}></SendOutlinedIcon>
      </div>
      <TurnedInNotIcon className={styles.icon}></TurnedInNotIcon>

      
    </div>
  );
}

export default PostMenu;
