import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import SettingsIcon from '@material-ui/icons/Settings';

import styles from "../ProfilePage/ProfilePage.module.scss"
import { Link } from "react-router-dom";

export default function ProfilePage() {

    const [user, setUser] = useState({ displayName: "User", photoURL: "/static/images/avatar/1.jpg" })

    useEffect(() => {

        let user = auth.currentUser;
        if (user) {
            setUser(user);

        }

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
                        <li>42342 публикации</li>
                        <li>42342  последователи</li>
                        <li>324  последвани</li>
                    </ul>

                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </p>

                </div>

            </header>
            <main>

            </main>
        </div>
    );
}