import React, { useRef } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Avatar, Box, Button, TextareaAutosize } from '@material-ui/core';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from "./SettingsPage.module.scss"
import PostUpload from '../UploadProfilePhoto/UploadProfilePhoto';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsMenu from './SettingsMenu/SettingsMenu'; //  Do not delete
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserUpdated } from '../CurrentUser.actions';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));


export default function SettingsPage() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const currentUser = useSelector(state => state.currentUser.user)
   
    const [displayNameText, setDisplayNameText] = useState("");
    const [biography, setBiography] = useState("");


    let { id } = useParams();

    useEffect(() => {
        setDisplayNameText(currentUser.displayName)
        setBiography(currentUser.biography)
    }, [currentUser])


    const handleDisplayNameChange = (e) => {
        setDisplayNameText(e.target.value)
    }

    const handleBiographyChange = (e) => {
        setBiography(e.target.value)
    }


    //  REFACTOR !!!
    const handleSaveChanges = () => {
        if (displayNameText.length !== 0 && id) {
            console.log("going");
            dispatch(fetchCurrentUserUpdated({ ...currentUser, displayName: displayNameText }))
            db.collection("users").doc(id).update({ displayName: displayNameText })
               
        }

        if (biography.length  !== 0 && id) {
            db.collection("users").doc(id).update({ biography: biography }).then(() => console.log("yes"))
                .then(() => {
                    dispatch(fetchCurrentUserUpdated({ ...currentUser, biography: biography }))
                })
        }

    }




    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" className={styles.mainContent}>

                <Box className={styles.settingsWrapper}>

                    <Box className={`${styles.headerSettings} ${styles.settingsWrapperDiv}`}>
                        <Avatar
                            className={styles.avatarSettings}
                            alt={currentUser.displayName}
                            src={currentUser.photoUrl || "/static/images/avatar/1.jpg"}
                        />
                        <Box className={styles.header}>
                            <Box className={styles.nameWrapper}>
                                <h2>{currentUser.displayName}</h2>
                                {/* <SettingsMenu /> */}
                            </Box>

                            <PostUpload text={"Change your profile picture"} isPost={false} />

                        </Box>
                    </Box>


                    <Box className={styles.settingsWrapperDiv}>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="input-with-icon-adornment">Change your name</InputLabel>
                            <Input
                                value={displayNameText}
                                onInput={(e) => { handleDisplayNameChange(e) }}
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                    </Box>


                    <Box className={styles.settingsWrapperDiv}>
                        <aside>Bio:</aside>
                        <TextareaAutosize
                            maxLength={180}
                            cols={50}
                            rowsMax={4}
                            aria-label="user biography"
                            placeholder="Write your  biography"
                            value={biography}
                            onInput={handleBiographyChange}
                        />

                    </Box>

                    <Box className={styles.settingsWrapperDiv}>


                        <Button onClick={handleSaveChanges} variant="contained" color="primary">
                            Запази
                        </Button>
                    </Box>

                </Box>


            </Container>
        </>
    )
}
