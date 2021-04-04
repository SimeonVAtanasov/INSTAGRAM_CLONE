import React, { useState } from "react";
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
    padding: theme.spacing(0, 4, 0),
    boxShadow: theme.shadows[5],
  },
}));

function StoriesSection(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);


  const Close = () => {
    props.handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={styles.title}>
        <Avatar
          className={styles.avatar_story}
          alt={props.user.displayName}
          src={props.user.photoUrl}
        />
        <span>{props.user.displayName}</span>
      </div>

      <Stories
        stories={props.stories}
        defaultInterval={3500}
        width={432}
        height={700}
        loop= "true"
      />

    </div>
  );

  return (
    <div>
      <Modal
        open={props.isStoryOpen}
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
