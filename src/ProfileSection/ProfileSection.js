import React from "react";
import "./ProfileSection.css";
import { Avatar } from "@material-ui/core";
import firebase from "firebase/app";

export default function ProfileSection() {
  let user = firebase.auth().currentUser;
  if (user) {
    return (
      <div>
        <div className="profile_section_header">
          <Avatar
            className="post_avatar"
            alt={user.displayName.toUpperCase()}
            src="/static/images/avatar/1.jpg"
          ></Avatar>
          <span> {user.displayName}</span>
          <button>New post</button>
        </div>
      </div>
    );
  } else {
    return(<div></div>) 
  }
}
