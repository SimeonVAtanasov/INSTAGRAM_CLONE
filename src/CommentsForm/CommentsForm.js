import React, { useState, useEffect, createRef } from "react";
import styles from "../Post/Post.module.scss";
import EmojiKeybord from "../EmojiKeybord";
import Comment from "../Comment/Comment";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import firebase from "firebase/app";
import { db } from "../firebase";
import ReactTimeAgo from 'react-time-ago'

function CommentsForm({postId, time, username}) {
  const inputRef = createRef();
  const [showEmojis, setShowEmojis] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
 
 
  const handleShowEmojis = () => {
    inputRef.current.focus();
    setShowEmojis(!showEmojis);
  };

  const postComment = (ev) => {
    ev.preventDefault();
    let user = firebase.auth().currentUser;
    console.log(user.displayName)
    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),

    });
    setComment("");
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

  return (
    <React.Fragment>
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

      {
        time &&  <ReactTimeAgo  className={styles.time} date={time.toDate()} locale="en-US"/>
      }

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
    </React.Fragment>
  );
}

export default CommentsForm;
