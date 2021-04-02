import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import styles from "./Post.module.scss";
import PostMenu from "../Post/PostMenu/PostMenu.js";
import { Link } from "react-router-dom";
import CommentsForm from "../Post/CommentsForm/CommentsForm.js";
import PostModal from "./PostModal";
import FavoriteIcon from "@material-ui/icons/Favorite";
import firebase from "firebase/app";
import { db } from "../firebase";
import {useSelector} from "react-redux"; 

function Post({
  postId,
  username,
  caption,
  imageUrl,
  likedBy,
  time,
  userPhoto,
  uid,
}) {
  let likesCount = likedBy.length;

  const [likedByNumber, setLikedByNumber] = useState(likesCount);
  const [likedByUsers, setLikedByUsers] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const userCredential = firebase.auth().currentUser;
  const posts = useSelector((state) => state.posts.posts);


  const handleShowHeart = () => {
    let likedByArr = [];
    if (!isLiked) {
      likedByArr.push(userCredential.uid);
      setLikedByUsers(likedByArr);

      db.collection("posts").doc(postId).update({
        likedBy: likedByArr,
      });

      setIsLiked(true);
    }

    setShowHeart(!showHeart);
  };

  return (
    <div className={styles.post}>
      <div className={styles.post_header}>
        <Link to={`/profile/${uid}`}>
          <Avatar
            className={styles.post_avatar}
            alt={username}
            src={userPhoto || "/static/images/avatar/1.jpg"}
          />

          <h3>{username}</h3>
        </Link>
      </div>

      <div
        className={styles.post_image_container}
        onDoubleClick={() => {
          handleShowHeart();
        }}
      >
        <img className={styles.post_image} src={imageUrl} alt="post"></img>

        {showHeart && <FavoriteIcon className={styles.heart}/>}
      </div>

      <PostMenu
        setLikedByNumber={setLikedByNumber}
        postId={postId}
        setOpenModal={setOpenModal}
        likedByUsers={likedByUsers}
        setLikedByUsers={setLikedByUsers}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        setShowHeart={setShowHeart}
        uid={uid}
        imageUrl= {imageUrl}
      />
      <div className={styles.liked_by}>
        <span>
          <strong>{likedByNumber} </strong> likes
        </span>
      </div>
      <h4 className={styles.post_description}>
        <strong> {username} </strong> {caption}
      </h4>

      <CommentsForm
        postId={postId}
        time={time}
        uid={uid}
        buttonText={"Post"}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <PostModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        imageUrl={imageUrl}
        username={username}
        userPhoto={userPhoto}
        caption={caption}
        time={time}
        postId={postId}
        uid={uid}
      />
    </div>
  );
}

export default Post;
