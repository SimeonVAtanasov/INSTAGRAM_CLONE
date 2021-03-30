import React, { useState, useEffect, createRef, useRef } from "react";
import stylesB from "./MessageForm.module.scss";
import stylesC  from "../../TextInput/TextInput.module.scss";

import Comment from "../../Post/Comment/Comment";
import { db } from "../../firebase";
import ReactTimeAgo from "react-time-ago";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase"
import TextInput from "../../TextInput/TextInput";

export default function CommentsForm({ convoId, time, uid, buttonText }) {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});


    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const sendMessage = (ev) => {
        ev.preventDefault();

        db.collection("messages").add({
            forConvo: convoId,
            fromUser: {
                username: user.displayName,
                userPhoto: user.photoUrl,
            },
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setMessage("");

    };

    

    useEffect(() => {
        let userCredential = firebase.auth().currentUser;
        db.collection("users")
            .doc(userCredential.uid)
            .get()
            .then((userData) => {
                let currentUser = userData.data();
                setUser(currentUser)
            })
    }, [uid]);

    useEffect(() => {
        if (convoId) {
            db.collection("messages")
                .where("forConvo", "==", convoId)
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    let messagesArr = [];
                    snapshot.forEach((doc) => {
                        messagesArr.push(doc.data());
                    });
                    setMessages(messagesArr);
                    scrollToBottom();
                });
            
        }
    }, [convoId]);

    return (
        <React.Fragment>
            <div className={stylesB.messageWrapper}>
                {
                    messages.map((message) => (
                        <Comment
                            key={uuidv4()}
                            comment={message.text}
                            username={message.fromUser.username}
                            userPhoto={message.fromUser.userPhoto}
                            time={message.timestamp}
                            uid={uid}
                        ></Comment>
                    ))}

                <div ref={messagesEndRef} >

                </div>
            </div>

            <TextInput
                placeholder={"Write message ..."}
                buttonText={buttonText}
                buttonOnClick={sendMessage}
                text={message}
                setText={setMessage}
                styles={stylesC}
            />
        </React.Fragment>
    );
}
