import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import {
  Badge,
  CircularProgress,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import NotificationBar from "./NotificationBar/NotificationBar.js";
import { v4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../AppService/firebase.js";
import { useSelector } from "react-redux";

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

export default function NotificationsPop() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [invisible, setInvisible] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0);
  const currentUser = useSelector((state) => state.currentUser.user);


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


  useEffect(() => {
    if (!notifications.length) {
      db.collection("notifications")
        .where("forUser", "==", currentUser.uid)
        .orderBy("timestamp", "desc")
        .onSnapshot((notifications) => {
          let notificationsQuerry = [];
          notifications.forEach((noti) => {
            notificationsQuerry.push(noti.data());
          });
          setNotifications(notificationsQuerry);
          setNotificationCount(notifications.size)
        })
    }

    setInvisible(false);


  }, [notificationCount, currentUser])
  const handleClick = (event) => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false) }, 600)
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setInvisible(true);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ marginTop: "-8px" }}>
      <Tooltip
        disableFocusListener
        disableTouchListener
        title="Notifications"
        arrow
      >
        <Badge color="secondary" variant="dot" invisible={invisible}>

          <FavoriteBorderOutlinedIcon
            style={{ fontSize: 26, cursor: "pointer" }}
            onClick={handleClick}
          />
        </Badge>

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
