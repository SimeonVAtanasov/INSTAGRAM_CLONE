import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { CircularProgress, Popover, Tooltip, Typography } from '@material-ui/core';
import { db } from '../firebase';
import NotificationBar from "./NotificationBar/NotificationBar.js"
const useStyles = makeStyles((theme) => ({
  paper: {
    border: 'none',
    borderRadius:   "3px",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NotificationsPop({ uid }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIsLoading(true);

    let notificationsQuerry = [];

    db.collection("notifications").where('to', "==", uid)
      .onSnapshot(notifications => {
        notifications.forEach((noti) => {
          notificationsQuerry.push(noti.data())
        });

        setNotifications(notificationsQuerry);
        console.log(notificationsQuerry);

        setIsLoading(false);
      }
      )


  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Tooltip disableFocusListener disableTouchListener title="Notifications" arrow>
        <FavoriteBorderOutlinedIcon style={{ fontSize: 26 }} onClick={handleClick} />
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography className={classes.typography}>
          <div className={classes.paper}>
            {isLoading ? <CircularProgress /> : notifications ? <ul style={{ maxHeight: "364px" }} >{notifications.map((noti) => <NotificationBar action={noti.action} when={noti.when} uid={noti.from.userId} from={noti.from}  targetPhoto={noti.targetPhoto} />)}</ul> : <h4>Нямате известия</h4>}
          </div>
        </Typography>
      </Popover>
    </div >
  );
}