import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from "firebase/app";

function PostUpload() {
  let user = firebase.auth().currentUser;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

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
          });
      }
    );
  };

  return (
    <div>
      <progress className="progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Write a caption..."
        value={caption}
        onChange={(ev) => setCaption(ev.target.value)}
      ></input>
      <input type="file" onChange={handleChange}></input>
      <Button onClick={handleUpload}>Upload post</Button>
    </div>
  );
}

export default PostUpload;
