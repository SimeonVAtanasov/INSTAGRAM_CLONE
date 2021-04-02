import EmojiKeybord from "../EmojiKeybord";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import React, { useState, createRef } from "react";
import { Button, TextareaAutosize, TextField } from "@material-ui/core";

export default function TextInput(props) {
    const inputRef = createRef();
    const [showEmojis, setShowEmojis] = useState(false);
    const [message, setMessage] = useState("");


    const styles = props.styles;
    const handleShowEmojis = () => {
        inputRef.current.focus();
        setShowEmojis(!showEmojis);
    };

    const onSubmit = (e) => {
        if (e.keyCode == 13 && e.shiftKey === false) {
            e.preventDefault();
            props.send(message);
            setMessage('');
        }
    }
    return (
        <form className={props.styles.comments_form}>
            {showEmojis &&
                <EmojiKeybord
                    comment={message}
                    setComment={setMessage}
                    inputRef={inputRef}
                ></EmojiKeybord>
            }
            <SentimentSatisfiedIcon
                onClick={handleShowEmojis}
            ></SentimentSatisfiedIcon>
            <TextareaAutosize
                // maxLength={40}
                rowsMax={3}
                ref={inputRef}
                className={styles.post_textarea}
                type="text"
                placeholder={props.placeholder}
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
                onKeyDown={onSubmit}
            ></TextareaAutosize>
            <Button
                className={props.styles.post_btn}
                disabled={!message}
                type="submit"
                // onClick={props.sendMessage}
                onClick={(e) => {
                    e.preventDefault();
                    props.send(message)
                    setMessage('');
                }
                }

            >
                {props.buttonText}
            </Button>
        </form >
    )
}