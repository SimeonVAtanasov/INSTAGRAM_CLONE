import { TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CommentsForm from '../Post/CommentsForm/CommentsForm';
import styles from "./ChatRoom.module.scss"
export default function ChatRoom() {



    return (
        <section className={styles.chatRoom}>
            <div className={styles.convoBox}>
                <form className={styles}>
                    {/* here you'll search for users */}
                    <TextField className={styles.searchInput} id="outlined-basic" label="До: " variant="outlined" />
                </form>
                <div className={styles.convoBox}>
                    {/* Chat rooms */}
                </div>
            </div>

            <main className={styles.contentBox}>
                <div className={styles.messages}>
                    {/* Here should be the conversation */}
                </div>
                <div className={styles.messageInput}>

                    <CommentsForm />
                </div>
            </main>



        </section>
    )
}