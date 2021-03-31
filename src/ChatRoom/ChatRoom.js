import { TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { auth, db } from '../firebase';
import stylesB from "./ChatRoom.module.scss"
import MessageForm from "./MessageForm/MessageForm"
import Comment from '../Post/Comment/Comment';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';

export default function ChatRoom(props) {
    const [currentUser, setCurrentUser] = useState(props.currentUser);
    const [conversations, setConversations] = useState([]);
    const [convoId, setConvoId] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        db.collection("chatRooms")
            .where("users", "array-contains", currentUser.uid)
            .onSnapshot(snap => {
                let conversations = [];
                snap.forEach(conversation => conversations.push(conversation.data()));
                setConversations(conversations)
                setConvoId(conversations[0].convoId)
            })
        db.collection("users")
            .get()
            .then((querySnapshot) => {
                let fetchedUsers = [];
                querySnapshot.forEach((doc) => {
                    fetchedUsers.push(doc.data());
                    setUsers(fetchedUsers)
                });

            })

    }, [])


    const handleInput = (ev) => {
        ev.preventDefault();
        setFilteredUsers([]);

        let text = ev.target.value;
        setSearchInput(text)
        if (text) {
            let filteredUsers = users.filter(user => user.displayName.toLowerCase().split(' ').join("").includes(text))
            setFilteredUsers(filteredUsers);
        }
    }

    const createNewChatRoom = (receiver) => {
        let convoQuerry = conversations.filter(convo => convo.users.includes(receiver.uid));
        let isCreated = Boolean(convoQuerry.length);
        // console.log("🚀 ~ file: ChatRoom.js ~ line 55 ~ createNewChatRoom ~ isCreated", isCreated)

        if (isCreated) {
            setConvoId(convoQuerry[0].convoId)
        } else {
            let id = v4();
            db.collection("chatRooms").doc(id).set(
                {
                    convoName: `${currentUser.displayName.split(' ')[0]} & ${receiver.displayName.split(' ')[0]}`,
                    convoId: id,
                    users: [currentUser.uid, receiver.uid],
                })
        }

    }
    return (
        <section className={stylesB.chatRoom}>
            <div className={stylesB.convoBox}>
                <form >
                    <TextField
                        className={stylesB.searchInput}
                        id="outlined-basic"
                        label="До: "
                        variant="outlined"
                        value={searchInput}
                        onInput={(ev) => { handleInput(ev) }}
                    />

                    <div className={stylesB.suggestions}>
                        {filteredUsers.map(user => 
                            <Comment
                                username={user.displayName}
                                userPhoto={user.photoUrl}
                                key={v4()}
                                onClick={() => { createNewChatRoom(user) }}
                            />
                        )
                        }
                            
                    </div>

                </form>
                <div className={stylesB.convoBoxBottom}>
                    {conversations.map(convo =>
                        <div className={stylesB.singleConvo}>
                            <QuestionAnswerOutlinedIcon />
                            <h3
                                className={stylesB.convoName}
                                key={v4()}
                                onClick={() => {
                                    setConvoId(convo.convoId);
                                    setSearchInput("");
                                }}>
                                {convo.convoName}
                            </h3>
                        </div>)}
                </div>
            </div>

            <main className={stylesB.contentBox}>


                <MessageForm
                    convoId={convoId}
                    uid={currentUser.uid}
                    buttonText={"Send"}
                ></MessageForm>

            </main>



        </section>
    )
}