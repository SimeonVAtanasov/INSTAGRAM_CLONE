import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";


function Post({username, caption, imageUrl}) {
  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          //   => alt will later be  {username}
          src="/static/images/avatar/1.jpg"
        ></Avatar>
        <h3>{username}</h3>
      </div>

      <img
        className="post_image"
        src= {imageUrl}
        alt="post"
      ></img>
      <h4 className="post_description">
        <strong> {username} </strong> {caption}
      </h4>
    </div>
  );
}

export default Post;
