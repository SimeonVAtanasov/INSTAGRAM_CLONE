import React, { useState, useCallback } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from "firebase/app";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import "../ProfileSection/ProfileSection.css";
import { Input } from "@material-ui/core";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import LinearProgress from "../LinearProgress";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { v4 as uuidv4, v4 } from "uuid";

import Webcam from "react-webcam";

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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    outline: "none",
    justifyContent: "center",
    fontFamily: "Snell Roundhand, cursive",
    fontWeight: "600",
  },
}));

function StoryUpload(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("Choose a picture");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [file, setFilie] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);

    const capture = useCallback(async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      blob.name = v4();

      setImage(blob);
      setFilie(imageSrc);
      setIsCameraOpen(false);
    }, [webcamRef]);
    return (
      <>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <button onClick={capture}>Capture photo</button>
      </>
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCameraOpen(false);
  };

  const handleChange = (ev) => {
    if (ev.target.files[0]) {
      setImage(ev.target.files[0]);
      setLabel("Change picture");
      setFilie(URL.createObjectURL(ev.target.files[0]));
    }
  };

  const handleCameraOpen = () => {
    setFilie(null);
    setIsCameraOpen(!isCameraOpen);
  };

  const handleUpload = () => {
    const uploadImage = storage.ref(`images/${Date.now()}`).put(image);

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
        uploadImage.snapshot.ref.getDownloadURL().then((url) => {
          if (props.isPost) {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: props.user.displayName,
              createdBy: props.user.uid,
              userPhoto: props.user.photoUrl,
              likedBy: [],
            });
          } else {
            db.collection("stories").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
              username: props.user.displayName,
              createdBy: props.user.uid,
              userPhoto: props.user.photoUrl,
            });
          }

          // This  line should adds to  a collection in current user's doc
          // db.collection("users").doc(props.user.uid).update({posts:[{

          //   caption: caption,
          //   imageUrl: url,
          //   username: props.user.displayName,
          //   userPhoto: props.user.photoUrl,
          //   uid: props.user.uid,
          //   likes: 0
          // }]})
          setProgress(0);
          setCaption("");
          setImage(null);
          handleClose();
          setLabel("Choose a picture");
          setFilie(null);
          setIsCameraOpen(false);
        });
      }
    );
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className={"modal"}>
        <h1 className="new_post_header">{props.text}</h1>

        <LinearProgress
          progress={progress}
          className="progress"
          value={progress}
        />

        <input type="file" onChange={handleChange} id="file"></input>
        <label htmlFor="file" className="upload_label">
          <ImageSearchIcon></ImageSearchIcon>
          {label}
        </label>

        <h2 className="new_post_header">Or</h2>

        <button className="upload_label" onClick={handleCameraOpen}>
          <CameraAltIcon></CameraAltIcon>
          Take a picture
        </button>

        {isCameraOpen && <WebcamCapture></WebcamCapture>}

        {props.isPost && (
          <Input
            type="text"
            placeholder="Write a caption..."
            value={caption}
            onInput={(ev) => setCaption(ev.target.value)}
          ></Input>
        )}

        <img src={file} alt={caption} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => {
            handleUpload();
          }}
        >
          Upload Photo
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <button className="new_post_btn" type="button" onClick={handleOpen}>
        {props.buttonText}
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

export default StoryUpload;
