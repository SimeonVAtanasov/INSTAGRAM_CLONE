import React, { useState, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import {
  CircularProgress,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { db } from "../firebase";
import NotificationBar from "./NotificationBar/NotificationBar.js";
import { v4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    border: "none",
    borderRadius: "3px",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center",
  },

  text: {
    display: "flex",
    justifyContent: "center",
    width: "276px",
  },
}));

export default function NotificationsPop({ uid }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIsLoading(true);
    let notificationsQuerry = [];

    db.collection("notifications")
      .where("forUser", "==", uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((notifications) => {
        console.log(notifications);
        notifications.forEach((noti) => {
          notificationsQuerry.push(noti.data());
        });

        setNotifications(notificationsQuerry);
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <Tooltip
        disableFocusListener
        disableTouchListener
        title="Notifications"
        arrow
      >
        <FavoriteBorderOutlinedIcon
          style={{ fontSize: 26 }}
          onClick={handleClick}
        />
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography component="div">
          <div className={classes.paper}>
            {isLoading ? (
              <CircularProgress />
            ) : notifications.length ? (
              <ul style={{ maxHeight: "364px" }}>
                {notifications.map((noti) => (
                  <NotificationBar
                    action={noti.action}
                    timestamp={noti.timestamp}
                    userId={noti.fromUser.uid}
                    userName={noti.fromUser.displayName}
                    userPhoto={noti.fromUser.photoUrl}
                    targetPhoto={noti.target}
                    key={v4()}
                    forUser={noti.forUser}
                    postId={noti.postId}
                  />
                ))}
              </ul>
            ) : (
              <h6 className={classes.text}>No notifications available</h6>
            )}
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
