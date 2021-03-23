import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "../firebase";
import firebase from "firebase/app";

function Post({ postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
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
    })
    setComment('');
  }

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        ></Avatar>
        <h3>{username}</h3>
      </div>

      <img className="post_image" src={imageUrl} alt="post"></img>
      <h4 className="post_description">
        <strong> {username} </strong> {caption}
      </h4>
      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.comment}
          </p>
        ))}
      </div>

      <form>
        <input
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
        ></input>
        <button
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >Post</button>
      </form>
    </div>
  );
}

export default Post;
