// import React, { useState, useEffect } from "react";
import "./ProfileSection.css";
import Avatar from '@material-ui/core/Avatar';

// import firebase from "firebase/app";

import StoryUpload from "../StoryUpload"

// import PostUpload from "../PostUpload/PostUpload";
import { Link } from "react-router-dom";



export default function ProfileSection({ currentUser }) {

  if (currentUser) {
    return (
      <div className="profile_section">
        <div className="profile_section_header">
          <div className="user_details">

            <Link to={`/profile/${currentUser.uid}`}>
              <Avatar
                className="profile_section_avatar"
                alt={currentUser.displayName}
                src={currentUser.photoUrl || "/static/images/avatar/1.jpg"}
              ></Avatar>
            </Link>
            <span> {currentUser.displayName}</span>

          </div>


          {/* <PostUpload></PostUpload>  TO DO  MERGE THE TWO COMPOMENTS*/}
          <StoryUpload user={currentUser} text={"Upload photo"} isPost={true} />

        </div>
      </div>
    );
  } else {
    return (<></>)
  }
}
