import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'
import styles from "./NotificationBar.module.scss"
export default function NofificationBar(props) {
    console.log(styles);
    return (
        <li className={styles.notificationWrapper}>
            <div className={styles.blockNotification}>
                <span className={styles.notificationAvatar}>
                    <Link to={`/profile/${props.from.userId}`}>
                        <Avatar alt={props.from.username} src={props.from.userPhoto} />
                    </Link>
                </span>
                <strong className={styles.nameStyle}>
                    {props.from.username}
                </strong>
            </div>
            <div className={styles.blockNotification}>
                <span>
                    {props.action}
                </span>
                <ReactTimeAgo className={styles.date} date={props.when.toDate()} locale="en-US" />
            </div>
            <div>
                <img alt="targetPhoto" src={props.targetPhoto} width={40}/>
            </div>
        </li>
    )
}