import EmojiKeybord from "../EmojiKeybord";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import React, { useState, useEffect, createRef } from "react";

export default function TextInput(props){
    return(
    // <form className={styles.comments_form}>
    //     {showEmojis &&
    //       <EmojiKeybord
    //         comment={comment}
    //         setComment={setComment}
    //         inputRef={inputRef}
    //       ></EmojiKeybord>
    //     }
    //     <SentimentSatisfiedIcon
    //       onClick={handleShowEmojis}
    //     ></SentimentSatisfiedIcon>
    //     <textarea
    //       ref={inputRef}
    //       className={styles.post_textarea}
    //       type="text"
    //       placeholder="Add a comment..."
    //       value={comment}
    //       onChange={(ev) => setComment(ev.target.value)}
    //     ></textarea>
    //     <button
    //       className={styles.post_btn}
    //       disabled={!comment}
    //       type="submit"
    //       onClick={postComment}
    //     >
    //       {buttonText}
    //     </button>
    //   </form>
      )
}