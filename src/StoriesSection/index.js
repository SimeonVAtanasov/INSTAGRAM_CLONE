import React, { useState, useEffect } from "react";
import styles from "./Story.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Avatar } from "@material-ui/core";
import Stories from "react-insta-stories";


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
    flexDirection: "column",
    width: 369,
    display: "flex",
    alignItems: "center",
    outline: "none",
    position: "absolute",
    padding: theme.spacing(2, 4, 3),
    boxShadow: theme.shadows[5],
  },
}));

function StoriesSection({ isStoryOpen, handleClose, user, stories, setStories }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
 

  // const stories = [
  //   "https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop",
  //   "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
  //   "https://images.theconversation.com/files/319375/original/file-20200309-118956-1cqvm6j.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop",
  // ];


 

  const Close = () => {
    handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={styles.title}>
        <Avatar
          className={styles.avatar_story}
          alt={user.displayName}
          src={user.photoURL}
        ></Avatar>
        <span>{user.displayName}</span>
      </div>

      <Stories
          // key={id}
          stories = {stories}
          defaultInterval={3500}
          width={432}
          height={600}
        />
      
    </div>
  );

  return (
    <div>
      <Modal
        open={isStoryOpen}
        onClose={Close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default StoriesSection;
