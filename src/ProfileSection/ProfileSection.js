import React, { useState,   useEffect } from "react";
import "./ProfileSection.css";
import Avatar from '@material-ui/core/Avatar';
import PostUpload from "../PostUpload/PostUpload";
import { auth, db } from "../firebase";


export default function ProfileSection({user}) {

  if (user) {
    return (
      <div className="profile_section">
        <div className="profile_section_header">
          <div className="user_details">
            <Avatar
              className="profile_section_avatar"
              alt={user.displayName}
              src={ user.photoUrl || "/static/images/avatar/1.jpg" }
            ></Avatar>
            <span> {user.displayName}</span>
          </div>

          <PostUpload text={"New Post"} isPost={true} user={user} />
        </div>
      </div>
    );
  } else {
    return (<></>)
  }
}
