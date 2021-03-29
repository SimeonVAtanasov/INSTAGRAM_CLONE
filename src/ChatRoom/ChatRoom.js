import { TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { db } from '../firebase';
import stylesB from "./ChatRoom.module.scss"
import MessageForm from "./MessageForm/MessageForm"

export default function ChatRoom() {
    const [converstaions, setConversations] = useState([]);
    const [convoId, setConvoId] = useState('');
    const [users, setUsers] = useState([]);
    const [searchUsersInput, setSearchUsersInput] = useState("");
    useEffect(() => {
        db.collection("chatRooms")
            .where("users", "array-contains", "yI7uZCourOVAqWt1EIFTEJlrnim1")
            .onSnapshot(snap => {
                let conversations = [];
                snap.forEach(conversation => conversations.push(conversation.data()));
                setConversations(conversations)

            })
    }, [])
    useEffect(() => { }, [users])

    return (
        <section className={stylesB.chatRoom}>
            <div className={stylesB.convoBox}>
                <form className={stylesB}>
                    {/* here you'll search for users */}
                    {/* <TextField className={stylesB.searchInput} id="outlined-basic" label="До: " variant="outlined" />
                    <Autocomplete /> */}

                    {/* <Autocomplete
                        id="searchUsers"
                        options={users}
                        getOptionLabel={(user) => user.displayname}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="До:" variant="outlined" />}
                    /> */}
                </form>
                <div className={stylesB.convoBox}>
                    {converstaions.map(convo => <h3 key={v4()} onClick={() => { setConvoId(convo.convoId) }}>{convo.convoId}</h3>)}
                </div>
            </div>

            <main className={stylesB.contentBox}>


                <MessageForm
                    convoId={convoId}
                    uid={"yI7uZCourOVAqWt1EIFTEJlrnim1"}
                    buttonText={"Send"}
                ></MessageForm>

            </main>



        </section>
    )
}