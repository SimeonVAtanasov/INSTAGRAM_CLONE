import React from "react";

function Logo(props) {
  return (
    <img
      className={props.className}
      src={
        "https://firebasestorage.googleapis.com/v0/b/instagram-4c584.appspot.com/o/300.png?alt=media&token=e7a71f54-e047-49ae-a8c6-2c1db300fe3f"
      }
      alt="instagram"
      width={props.width}
    />
  );
}

export default Logo;
