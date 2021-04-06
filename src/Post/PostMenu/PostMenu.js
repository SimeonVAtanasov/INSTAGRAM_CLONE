import React, { useEffect } from "react";
import styles from "../PostMenu/PostMenu.module.scss";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { db } from "../../AppService/firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";

function PostMenu({
  postId,
  setOpenModal,
  isLiked,
  setIsLiked,
  setLikedByUsers,
  setShowHeart,
  uid,
  imageUrl,
  setIsSaved,
  isSaved,
  savedBy,
  openModal,
  likedByUsers
}) {

  const currentUser = useSelector((state) => state.currentUser.user);

  useEffect(() => {
    if (postId) {
      db.collection("posts")
        .doc(postId)
        .onSnapshot((snap) => {
          if (snap.exists) {
            let likesArr = snap.data().likedBy;
            let savedPostsArr = snap.data().savedBy;
            let isSavedByUser = savedPostsArr.some(
              (id) => id === currentUser.uid
            );
            let isLikedByUser = likesArr.some((id) => id === currentUser.uid);

            if (isLikedByUser) {
              setIsLiked(true);
            }

            if (isSavedByUser) {
              setIsSaved(true);
            }
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
    let likedByArr = [...likedByUsers];
    if (!likedByUsers.includes(currentUser.uid)) {
      likedByArr.push(currentUser.uid);
      setLikedByUsers(likedByArr);
      db.collection("posts").doc(postId).update({
        likedBy: likedByArr,
      });
    } else {

      
      let arr = likedByUsers.filter(el => el !== currentUser.uid)
      setLikedByUsers([...arr]);
    setShowHeart(false);
 db.collection("posts").doc(postId).update({
      likedBy: arr,
    });
    }

   

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

        {!openModal && (
          <ModeCommentOutlinedIcon
            className={styles.icon}
            onClick={handleOpen}
          />
        )}
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
