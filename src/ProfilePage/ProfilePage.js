import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import SettingsIcon from '@material-ui/icons/Settings';

import styles from "../ProfilePage/ProfilePage.module.scss"
import { Link } from "react-router-dom";
import ExplorePost from "../ExplorePost/ExplorePost.js";
import style from "../Explore/Explore.module.scss"

export default function ProfilePage() {

    const [user, setUser] = useState({ displayName: "User", photoURL: "/static/images/avatar/1.jpg" })
    const [posts, setPosts] = useState([]);


    useEffect(() => {

        let user = auth.currentUser;
        if (user) {
            setUser(user);

        }

        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    post: doc.data(),
                }))
            );
        });

    }, []);


    return (
        <div>
            <header className={styles.profilePage_header}>
                <div><Avatar className={styles.avatarProfile} alt={user.displayName}
                    src={user.photoURL}></Avatar></div>
                <div className={styles.profileInfoWrapper}>

                    <h2>
                        {user.displayName}
                        <Link to={"/"}>
                            <SettingsIcon />
                        </Link>
                    </h2>
                    <ul >
                        <li>423 публикации</li>
                        <li>42342  последователи</li>
                        <li>324  последвани</li>
                    </ul>

                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </p>

                </div>

            </header>
            <main className={style.exploreProfileContainer}>
                {posts.map(({ id, post }) => (
                    <ExplorePost key={id} post={post} id={id} />
                ))}
            </main>
        </div>
    );
}