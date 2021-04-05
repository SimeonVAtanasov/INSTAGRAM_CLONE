import React, { useState, useEffect} from "react";
import styles from "../../Post/Post.module.scss";
import Comment from "../Comment/Comment";
import { db } from "../../AppService/firebase";
import ReactTimeAgo from "react-time-ago";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import TextInput from "../../TextInput/TextInput";
import stylesB from "../../TextInput/postTextInputStyles.module.scss";
import {useSelector} from "react-redux";

export default function CommentsForm({
  postId,
  time,
  uid,
  openModal,
  setOpenModal,
  buttonText,
  imageUrl,
}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isPost, setIsPost] = useState(true);

  const currentUser = useSelector(state => state.currentUser.user);

  const postComment = (str) => {
    db.collection("comments").add({
      forPost: postId,
      fromUser: {
        username: currentUser.displayName,
        userPhoto: currentUser.photoUrl,
        uid: currentUser.uid,
      },
      comment: str,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    if (uid !== currentUser.uid) {
      db.collection("notifications").add({
        action: "commented your photo",
        fromUser: {
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoUrl,
          uid: currentUser.uid,
        },
        forUser: uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        target: imageUrl,
        postId: postId,
      });
    }

    setComment("");
  };

  const handleShowComments = () => {
    setOpenModal(true);
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
        {comments.length === 1 && !openModal && (
          <p className={styles.view_comments_text} onClick={handleShowComments}>
            {" "}
            View {comments.length} comment{" "}
          </p>
        )}
        {comments.length > 0 && !openModal && comments.length !== 1 && (
          <p className={styles.view_comments_text} onClick={handleShowComments}>
            {" "}
            View all {comments.length} comments{" "}
          </p>
        )}

        {!openModal &&
          isPost &&
          comments
            .slice(0, 3)
            .map((comment) => (
              <Comment
                key={uuidv4()}
                comment={comment.comment}
                username={comment.fromUser.username}
                userPhoto={comment.fromUser.userPhoto}
                time={comment.timestamp}
                uid={comment.fromUser.uid}
              />
            ))}

        {openModal &&
          comments.map((comment) => (
            <Comment
              key={uuidv4()}
              comment={comment.comment}
              username={comment.fromUser.username}
              userPhoto={comment.fromUser.userPhoto}
              time={comment.timestamp}
              uid={comment.fromUser.uid}
            />
          ))}
      </div>

      {time && (
        <div className={styles.time}>
          <ReactTimeAgo
          
          date={time.toDate()}
          locale="en-US"
        />
        </div>
        
      )}

      <TextInput
        placeholder={"Add comment ..."}
        buttonText={buttonText}
        send={postComment}
        styles={stylesB}
      />
    </React.Fragment>
  );
}
