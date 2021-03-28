import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { CircularProgress, Tooltip } from '@material-ui/core';
import { db } from '../firebase';


const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NotificationsPop({ uid }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

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

  return (
    <div>
      <Tooltip disableFocusListener disableTouchListener title="Notifications" arrow>
        <FavoriteBorderOutlinedIcon style={{ fontSize: 26 }} onClick={handleClick} />
      </Tooltip>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
          arrow: {
            enabled: true,
            // element: arrowRef,
          },
        }}>
        <div className={classes.paper}>
          {isLoading ? <CircularProgress /> : notifications.length ? <ul>notifications.map(noti => <h4>ku4e</h4>)</ul> : <h4>Нямате известия</h4>}
        </div>
      </Popper>
    </div>
  );
}