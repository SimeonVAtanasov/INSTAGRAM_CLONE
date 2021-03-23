import React from "react";
import "./ProfileSection.css";
import Avatar from '@material-ui/core/Avatar';
import firebase from "firebase/app";
import PostUpload from "../PostUpload/PostUpload";


export default function ProfileSection() {

  let user = firebase.auth().currentUser;
  if (user) {
    return (
      <div className="profile_section">
        <div className="profile_section_header">
          <div className = "user_details">
            <Avatar
            className="profile_section_avatar"
            alt={user.displayName.toUpperCase()}
            src="/static/images/avatar/1.jpg"
          ></Avatar>
          <span> {user.displayName}</span>
          </div>
          
          <PostUpload></PostUpload>
        </div>
      </div>
    );
  } else {
    return(<></>) 
  }
}
