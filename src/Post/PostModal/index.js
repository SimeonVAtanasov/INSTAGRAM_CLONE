import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import CommentsForm from "../CommentsForm/CommentsForm.js";
import styles from "../Post.module.scss";
import { subscribeToRealTimeEvents } from "../Posts.actions";
import { useDispatch } from "react-redux";
import { db } from "../../AppService/firebase";
import { useSelector } from "react-redux";
import PostMenu from "../PostMenu/PostMenu.js";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "960px",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #dbdbdb",
    outline: "none",
    objectFit: "contain",
    display: "flex",
    maxHeight: "600px",
    borderRadius: "3px",
  },
}));

export default function PostModal({
  openModal,
  setOpenModal,
  postId,
  username,
  caption,
  imageUrl,
  time,
  userPhoto,
  uid,
  setLikedByNumber,
  likedByUsers,
  setLikedByUsers,
  setIsLiked,
  setShowHeart,
  likedBy,
  setIsSaved,
  isSaved,
  savedBy,
  isLiked,
}) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.uid === uid) {
      setIsCurrentUser(true);
    }
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDelete = (ev) => {
    ev.preventDefault();

    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        dispatch(subscribeToRealTimeEvents());
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={styles.modal_image_container}>
        <img className={styles.modal_image} src={imageUrl} alt="post"></img>
      </div>
      <aside>
        <div className={styles.modal_header}>
          <Link to={`/profile/${uid}`}>
            <Avatar
              className={styles.modal_avatar}
              alt={username}
              src={userPhoto || "/static/images/avatar/1.jpg"}
            />
            <h3 className={styles.post_modal_description}>
              <strong className={styles.username}> {username} </strong>{" "}
            </h3>
          </Link>
          {isCurrentUser ? (
            <button onClick={handleDelete} className={styles.deleteBtn}>
              Delete post
            </button>
          ) : (
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
              imageUrl={imageUrl}
              likedBy={likedBy}
              setIsSaved={setIsSaved}
              isSaved={isSaved}
              savedBy={savedBy}
              openModal={openModal}
            />
          )}
        </div>
        <div className={styles.post_modal_description_container}>
          <strong>{username.split(" ")[0]}</strong> <span>{caption}</span>
        </div>
        <div className={styles.modal_comments_form}>
          <CommentsForm
            uid={uid}
            postId={postId}
            time={time}
            openModal={openModal}
            setOpenModal={setOpenModal}
            buttonText={"Post"}
          />
        </div>
      </aside>
    </div>
  );

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={styles.modal}
      >
        {body}
      </Modal>
    </div>
  );
}
