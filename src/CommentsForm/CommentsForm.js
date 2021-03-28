import React, { useState, useEffect, createRef } from "react";
import styles from "../Post/Post.module.scss";
import EmojiKeybord from "../EmojiKeybord";
import Comment from "../Comment/Comment";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import firebase from "firebase/app";
import { db } from "../firebase";
import ReactTimeAgo from "react-time-ago";
import { v4 as uuidv4 } from "uuid";

function CommentsForm({ postId, time, uid }) {
  const inputRef = createRef();
  const [showEmojis, setShowEmojis] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const [showAllComments, setShowAllComments]=useState(false);

  const handleShowEmojis = () => {
    inputRef.current.focus();
    setShowEmojis(!showEmojis);
  };

  const postComment = (ev) => {
    ev.preventDefault();
    let userCredential = firebase.auth().currentUser;
    db.collection("users")
      .doc(userCredential.uid)
      .get()
      .then((userData) => {
        setUser(userData.data());

        db.collection("comments").add({
          forPost: postId,
          fromUser: {
            username: user.displayName,
            userPhoto: user.photoUrl,
          },
          comment: comment,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment("");
      });
  };

  useEffect(() => {
    //if a post id was passed through, access the post collection, go inside the comments collection,
    //  listen for the specific post and all the common changes within it

    if (postId) {
      db.collection("comments")
        .where("forPost", "==", postId)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          let commentsArr = [];
          snapshot.forEach((doc) => {
            commentsArr.push(doc.data());
          });
          setComments(commentsArr);
        });
    }
  }, [postId]);

  return (
    <React.Fragment>
      <div className={styles.post_comments}>
       
     
        {comments.map( comment  => 

          <Comment
            key={uuidv4()}
            comment = {comment.comment}
            username = {comment.fromUser.username}
            userPhoto = {comment.fromUser.userPhoto}
            time = {comment.timestamp}
            uid = {uid}
          ></Comment>
        )}
       
      </div>

      {time && (
        <ReactTimeAgo
          className={styles.time}
          date={time.toDate()}
          locale="en-US"
        />
      )}

      <form className={styles.comments_form}>
      {showEmojis ? (
          <EmojiKeybord
            comment={comment}
            setComment={setComment}
            inputRef={inputRef}
          ></EmojiKeybord>
        ) : null}
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
