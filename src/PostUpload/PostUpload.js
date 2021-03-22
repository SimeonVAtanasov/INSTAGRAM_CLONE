import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from "firebase/app";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import "../ProfileSection/ProfileSection.css";


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex", 
    flexDirection: "column",
    outline: "none",
  },
}));

function PostUpload() {
  let user = firebase.auth().currentUser;
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleChange = (ev) => {
    if (ev.target.files[0]) {
      setImage(ev.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadImage = storage.ref(`images/${image.name}`).put(image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        //progress update
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        //complete
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: user.displayName,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
            handleClose();
          }
          );
           
      
         
      }
    );
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <progress className="progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Write a caption..."
        value={caption}
        onChange={(ev) => setCaption(ev.target.value)}
      ></input>
      <input type="file" onChange={handleChange}></input>
      <Button onClick={() => {
          handleUpload();
        
      }}>Upload post</Button>
    </div>
  );

  return (
    <div>
      <button className = "new_post_btn" type="button" onClick={handleOpen}>
       New post
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default PostUpload;
