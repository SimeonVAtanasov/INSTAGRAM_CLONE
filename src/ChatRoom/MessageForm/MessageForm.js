import React, { useState, useEffect, useRef } from "react";
import stylesB from "./MessageForm.module.scss";
import stylesC from "../../TextInput/TextInput.module.scss";
import Comment from "../../Post/Comment/Comment";
import { db } from "../../AppService/firebase";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import TextInput from "../../TextInput/TextInput";
import { useSelector } from "react-redux";

export default function CommentsForm({ convoId, time, buttonText }) {
  const [messages, setMessages] = useState([]);

  const currentUser = useSelector((state) => state.currentUser.user);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (str) => {

    if (str.length && convoId) {
      db.collection("messages").add({
        forConvo: convoId,
        fromUser: {
          username: currentUser.displayName,
          userPhoto: currentUser.photoUrl,
          uid: currentUser.uid,
        },
        text: str,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

  };

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
      {messages.length ? (
        <div className={stylesB.messageWrapper}>
          {messages.map((message) => (
            <Comment
              key={uuidv4()}
              comment={message.text}
              username={message.fromUser.username}
              userPhoto={message.fromUser.userPhoto}
              time={message.timestamp}
              uid={message.fromUser.uid}
            />
          ))}

          <div ref={messagesEndRef}></div>
        </div>
      ) : (
        <div className={stylesB.message}>
          <span>You don't have any messages.</span>
          <span>~ Send your first message to a friend of yours ~</span>
        </div>
      )}

      <TextInput
        placeholder={"Write message ..."}
        buttonText={buttonText}
        send={sendMessage}
        styles={stylesC}
      />
    </React.Fragment>
  );
}
