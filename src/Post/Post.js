import React, { useState, useEffect, createRef } from "react";
import { Avatar } from "@material-ui/core";
import { db } from "../firebase";
import firebase from "firebase/app";
import Comment from "../Comment/Comment";
import styles from "./Post.module.scss";
import EmojiKeybord from "../EmojiKeybord";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import PostMenu from "../PostMenu/PostMenu";
import ReactTimeAgo from 'react-time-ago'
import { Link } from "react-router-dom";

function Post({ postId, username, caption, imageUrl, likes, time, userPhoto, uid }) {
  const inputRef = createRef();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [likedByNumber, setLikedByNumber] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleShowEmojis = () => {
    inputRef.current.focus();
    setShowEmojis(!showEmojis);
  };

  useEffect(() => {
    let unsubscribe;
    //if a post id was passed through, access the post collection, go inside the comments collection,
    //  listen for the specific post and all the common changes within it
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (ev) => {
    ev.preventDefault();
    let user = firebase.auth().currentUser;
    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),

    });
    setComment("");
  };

  return (
    <div className={styles.post}>
      <div className={styles.post_header}>
        <Link to={`/profile/${uid}`}>
          <Avatar
            className={styles.post_avatar}
            alt={username}
            src={userPhoto || "/static/images/avatar/1.jpg"}
            // data-id={uid}
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
      ></PostMenu>
      <div className={styles.liked_by}>

        <span>
          <strong>{likes}  </strong> likes
          </span>

      </div>
      <h4 className={styles.post_description}>
        <strong> {username} </strong> {caption}
      </h4>
      <div className={styles.post_comments}>
        {comments.map(({ id, comment }) => (
          <Comment
            key={id}
            username={comment.username}
            text={comment.comment}
          ></Comment>
        ))}
        {showEmojis ? (
          <EmojiKeybord
            comment={comment}
            setComment={setComment}
            inputRef={inputRef}
          ></EmojiKeybord>
        ) : null}
      </div>

      {/* <ReactTimeAgo date={createdAt.toDate()} locale="en-US"/> */}

      <form className={styles.comments_form}>
        <SentimentSatisfiedIcon
          onClick={handleShowEmojis}
        ></SentimentSatisfiedIcon>
        <textarea
          ref={inputRef}
          className={styles.post_textarea}
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
        ></textarea>
        <button
          className={styles.post_btn}
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
