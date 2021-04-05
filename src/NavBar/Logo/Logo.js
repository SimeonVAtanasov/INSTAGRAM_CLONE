import React from "react";

function Logo(props) {
  return (
    <img
      className={props.className}
      src={
        "https://firebasestorage.googleapis.com/v0/b/instagram-4c584.appspot.com/o/images%2FlogoHeader.png?alt=media&token=53c828a3-179a-4a6c-b1e7-236028bc36d6"
      }
      alt="instagram"
      width={props.width}
    />
  );
}

export default Logo;
