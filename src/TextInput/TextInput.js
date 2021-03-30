import EmojiKeybord from "../EmojiKeybord";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import React, { useState, createRef } from "react";

export default function TextInput(props) {
    const inputRef = createRef();
    const [showEmojis, setShowEmojis] = useState(false);


    const styles = props.styles;
    const handleShowEmojis = () => {
        inputRef.current.focus();
        setShowEmojis(!showEmojis);
    };

    return (
        <form className={props.styles.comments_form}>
            {showEmojis &&
                <EmojiKeybord
                    comment={props.text}
                    setComment={props.setText}
                    inputRef={inputRef}
                ></EmojiKeybord>
            }
            <SentimentSatisfiedIcon
                onClick={handleShowEmojis}
            ></SentimentSatisfiedIcon>
            <textarea
                ref={inputRef}
                className={styles.post_textarea}
                type="text"
                placeholder={props.placeholder}
                value={props.text}
                onChange={(ev) => props.setText(ev.target.value)}
            ></textarea>
            <button
                className={props.styles.post_btn}
                disabled={!props.text}
                type="submit"
                onClick={props.buttonOnClick}
            >
                {props.buttonText}
            </button>
        </form>
    )
}