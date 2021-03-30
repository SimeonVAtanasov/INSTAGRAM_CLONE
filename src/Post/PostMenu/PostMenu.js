import React, { useEffect, useState } from "react";
import styles from "../PostMenu/PostMenu.module.scss";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { db } from "../../firebase";
import firebase from "firebase/app";
// import PostModal from "./Post/PostModal"

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
  // const [likedBy, setLikedBy] = useState([]);

  // const [isLiked, setIsLiked] = useState(false);

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
        ></ModeCommentOutlinedIcon>
        <SendOutlinedIcon className={styles.icon}></SendOutlinedIcon>
      </div>
      <TurnedInNotIcon className={styles.icon}></TurnedInNotIcon>
    </div>
  );
}

export default PostMenu;
