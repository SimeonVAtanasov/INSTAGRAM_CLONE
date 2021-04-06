import { Avatar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import styles from "./NotificationBar.module.scss";

export default function NofificationBar(props) {
  return (
    <li className={styles.notificationWrapper}>
      <div className={styles.details}>
        <div className={styles.blockNotification}>
          <span className={styles.notificationAvatar}>
            <Link to={`/profile/${props.userId}`}>
              <Avatar alt={props.userName} src={props.userPhoto} />
              <strong className={styles.nameStyle}>{props.userName}</strong>
            </Link>
          </span>
        </div>
        <div className={styles.blockNotification}>
          <span>{props.action}</span>
          <ReactTimeAgo
            className={styles.date}
            date={props.timestamp.toDate()}
            locale="en-US"
          />
        </div>
      </div>
      {props.action !== "followed you" && (
        <div>
          {props.targetPhoto && <img alt="targetPhoto" src={props.targetPhoto} width={40} />}
        </div>
      )}
    </li>
  );
}
