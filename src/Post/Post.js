import React, { useState, useEffect, createRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "../firebase";
import firebase from "firebase/app";
import Comment from "../Comment/Comment";
import Picker from "emoji-picker-react";
// import styles from "./Post.module.scss"

function Post({ postId, username, caption, imageUrl }) {
  const inputRef = createRef();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [cursorPosition, setCursorPosition] = useState();

  const onEmojiClick = (ev, emojiObject) => {
    setChosenEmoji(emojiObject);
    const ref = inputRef.current;
    ref.focus();
    const start = comment.substring(0, ref.selectionStart);
    const end = comment.substring(ref.selectionStart);
    const text = start + emojiObject.emoji + end;
    setComment(text);
    setCursorPosition(start.length + emojiObject.emoji.length);
  };

  // useEffect(() => {
  //   inputRef.current.selectedEnd = cursorPosition;
  // },[inputRef,cursorPosition]);

  useEffect(() => {
    let unsubscribe;
    //if a post id was passed through access the post collection, go inside the comments collection,
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
        <Avatar
          className={styles.post_avatar}
          alt={username}
          src="/static/images/avatar/1.jpg"
        ></Avatar>
        <h3>{username}</h3>
      </div>

      <img className= {styles.post_image} src={imageUrl} alt="post"></img>
      <h4 className= {styles.post_description}>
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
      </div>

      <form className={styles.comments_form}>
      
        <Picker onEmojiClick={onEmojiClick} />

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
