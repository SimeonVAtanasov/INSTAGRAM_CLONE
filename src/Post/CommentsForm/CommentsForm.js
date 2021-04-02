import React, { useState, useEffect} from "react";
import styles from "../../Post/Post.module.scss";
import Comment from "../Comment/Comment";
import { db } from "../../firebase";
import ReactTimeAgo from "react-time-ago";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase"
import TextInput from "../../TextInput/TextInput";
import stylesB  from "../../TextInput/postTextInputStyles.module.scss";


export default function CommentsForm({ postId, time, uid, openModal, setOpenModal, buttonText }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const [isPost, setIsPost] = useState(true);


  const postComment = (str) => {

    db.collection("comments").add({
      forPost: postId,
      fromUser: {
        username: user.displayName,
        userPhoto: user.photoUrl,
        uid:user.uid,
      },
      comment: str,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");

  };

  const handleShowComments = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    let userCredential = firebase.auth().currentUser;
    db.collection("users")
      .doc(userCredential.uid)
      .get()
      .then((userData) => {
        let currentUser = userData.data();
        setUser(currentUser)
      })

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
        <ReactTimeAgo
          className={styles.time}
          date={time.toDate()}
          locale="en-US"
        />
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


