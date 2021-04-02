import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'
import styles from "./NotificationBar.module.scss"
export default function NofificationBar(props) {
    return (
        <li className={styles.notificationWrapper}>
            <div className={styles.blockNotification}>
                <span className={styles.notificationAvatar}>
                    <Link to={`/profile/${props.fromUser.uid}`}>
                        <Avatar alt={props.fromUser.displayName} src={props.fromUser.photoUrl} />
                    </Link>
                </span>
                <strong className={styles.nameStyle}>
                    {props.fromUser.displayName}
                </strong>
            </div>
            <div className={styles.blockNotification}>
                <span>
                    {props.action}
                </span>
                <ReactTimeAgo className={styles.date} date={props.timestamp.toDate()} locale="en-US" />
            </div>
            <div>
                <img alt="targetPhoto" src={props.target} width={40}/>
            </div>
        </li>
    )
}