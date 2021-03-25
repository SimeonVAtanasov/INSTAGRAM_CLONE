import React from "react";


function Comment({username,text}) {
  return (
    <React.Fragment>
      <p>
        <strong>{username}</strong> {text}
      </p>
    </React.Fragment>
  );
}

export default Comment;
