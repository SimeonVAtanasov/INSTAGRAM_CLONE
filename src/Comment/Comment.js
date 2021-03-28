import React from "react";


function Comment({comment, username}) {
  return (
    <React.Fragment>
      <p>
        <strong>{username}</strong> {comment}
      </p>
    </React.Fragment>
  );
}

export default Comment;
