import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import CommentsForm from "../CommentsForm/CommentsForm.js";
import styles from "../Post.module.scss";

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
    width: "70%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #dbdbdb",
    outline: "none",
    objectFit: "contain",
    display: "flex",
  },
}));

export default function PostModal({
  openModal,
  setOpenModal,
  postId,
  username,
  caption,
  imageUrl,
  likes,
  time,
  userPhoto,
  uid,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setOpenModal(false);
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
            ></Avatar>
          </Link>

          <h3>{username}</h3>
        </div>
        <div className={styles.post_modal_description_container}>
          <Link to={`/profile/${uid}`}>
            <Avatar
              className={styles.modal_avatar}
              alt={username}
              src={userPhoto || "/static/images/avatar/1.jpg"}
              data-id={uid}
            ></Avatar>
          </Link>
          <h3 className={styles.post_modal_description}>
            <strong className={styles.username}> {username} </strong> {caption}
          </h3>
        </div>
        <div className={styles.modal_comments_form}>
          <CommentsForm
            postId={postId}
            time={time}
          ></CommentsForm>
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
