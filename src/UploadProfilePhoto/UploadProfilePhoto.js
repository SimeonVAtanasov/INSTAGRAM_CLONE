import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import "../ProfileSection/ProfileSection.css";
import { Input } from '@material-ui/core';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import LinearProgress from "../Components/LinearProgress";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserUpdated } from "../AppService/CurrentUser.actions";
import { useParams } from "react-router";
import { db, storage } from "../AppService/firebase";

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
    maxHeight: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    outline: "none",
    justifyContent: "center",
    fontFamily: 'Snell-Roundhand, Handlee-Regular',
    fontWeight: "600"
  },
}));


function PostUpload(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("Choose a picture");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [file, setFilie] = useState(null);
  const currentUser = useSelector(state => state.currentUser.user)
  const [isUploadButtonDisabled, setIsUploadButtonDisabled] = useState(true)

  const { id } = useParams();

  const handleOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (ev) => {
    if (ev.target.files[0]) {
      setImage(ev.target.files[0]);
      setLabel("Change picture");
      setFilie(URL.createObjectURL(ev.target.files[0]))
      setIsUploadButtonDisabled(false)
    }
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
        uploadImage.snapshot.ref.getDownloadURL()
          .then((url) => {
            console.log(id);
            db.collection("users").doc(id).update({ photoUrl: url })
              .then(function () {
                setProgress(0);
                setCaption("");
                setImage(null);
                handleClose();
                setLabel("Choose a picture");
                setFilie(null);
                dispatch(
                  fetchCurrentUserUpdated({ ...currentUser, photoUrl: url })
                )
              }).catch(function (error) {
                console.log("tuka");
                alert(error.message);
              });

              setIsUploadButtonDisabled(true);
          }
          );
      }
    );
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>

      <div className="modal">
        <h1 className="new_post_header">{props.text}</h1>
        <LinearProgress progress={progress} className="progress" value={progress} />

        <input type="file" onChange={handleChange} id="file" accept="image/*"></input>
        <label htmlFor="file" className="upload_label">
          <ImageSearchIcon></ImageSearchIcon>{label}</label>

        {props.isPost && <Input
          type="text"
          placeholder="Write a caption..."
          value={caption}
          onInput={(ev) => setCaption(ev.target.value)}
        ></Input>}


        <img src={file} alt={caption} />
        <Button
          disabled={isUploadButtonDisabled}
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => {
            handleUpload();
          }}
        >Upload photo</Button>
      </div>

    </div >
  );

  return (
    <div>
      <button className="new_post_btn" type="button" onClick={handleOpen}>
        <div id="insideText">{props.text}</div>
        <AddCircleOutlineIcon />
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
