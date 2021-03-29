import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import styles from "./Post.module.scss";
import EmojiKeybord from "../EmojiKeybord";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";

import ReactTimeAgo from 'react-time-ago'
import PostMenu from "../Post/PostMenu/PostMenu.js";
import { Link } from "react-router-dom";
import CommentsForm from "../Post/CommentsForm/CommentsForm.js";
import PostModal from "./PostModal";

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
  const [isLiked, setIsLiked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.post}>
      <div className={styles.post_header}>
        <Link to={`/profile/${uid}`}>
          <Avatar
            className={styles.post_avatar}
            alt={username}
            src={userPhoto || "/static/images/avatar/1.jpg"}
          ></Avatar>
        </Link>

        <h3>{username}</h3>
      </div>

      <img className={styles.post_image} src={imageUrl} alt="post"></img>
      <PostMenu
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        likedByNumber={likedByNumber}
        setLikedByNumber={setLikedByNumber}
        postId={postId}
        openModal={openModal}
        setOpenModal={setOpenModal}
      ></PostMenu>
      <div className={styles.liked_by}>
        <span>
          <strong>{likedByNumber} </strong> likes
        </span>
      </div>
      <h4 className={styles.post_description}>
        <strong> {username} </strong> {caption}
      </h4>

      <CommentsForm postId={postId} time={time} uid={uid} buttonText={"Публикуване"} openModal={openModal} setOpenModal={setOpenModal}></CommentsForm>

      <PostModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        imageUrl={imageUrl}
        username={username}
        userPhoto={userPhoto}
        caption={caption}
        time={time}
        postId={postId}
      ></PostModal>
    </div>
  );
}

export default Post;
