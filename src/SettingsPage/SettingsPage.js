import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Avatar, Box, Button, OutlinedInput, TextareaAutosize, TextField } from '@material-ui/core';
import { auth, db } from '../firebase';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styles from "./SettingsPage.module.scss"
import PostUpload from '../PostUpload/PostUpload';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));


export default function SettingsPage({ userData }) {

    const classes = useStyles();

    const [user, setUser] = useState(userData);

    const [displayNameText, setDisplayNameText] = useState(user.displayName);
    const [biography, setBiography] = useState(user.biography);

    let { id } = useParams();


    useEffect(() => {
        if (displayNameText) {
            db.collection("users").doc(id).update({ ...user })

            console.log("hi");
        }
    }, [user.displayName])

    useEffect(() => {
        if (biography) {
            db.collection("users").doc(id).update({ ...user }).then(() => console.log("yes"))

            console.log("hi");
        }
    }, [user.biography])

    const handleDisplayNameChange = (e) => {
        setDisplayNameText(e.target.value)
    }

    const handleBiographyChange = (e) => {
        setBiography(e.target.value)
    }

    const handleSaveChanges = () => {
        setUser({ displayName: displayNameText, biography: biography })


        // db.collection("users").doc(id).update({biography}).then(()=> console.log("yes"))
    }




    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" className={styles.mainContent}>

                <Box className={styles.settingsWrapper}>

                    <Box className={`${styles.headerSettings} ${styles.settingsWrapperDiv}`}>
                        <Avatar
                            className={styles.avatarSettings}
                            alt={user.displayName}
                            src={user.photoUrl || "/static/images/avatar/1.jpg"}
                        />
                        <Box className={styles.header}>
                            <Box className={styles.nameWrapper}>
                                <h2>{user.displayName}</h2>
                                <SettingsMenu />
                            </Box>

                            <PostUpload text={"Промени снимката на профила"} isPost={false} />

                        </Box>
                    </Box>


                    <Box className={styles.settingsWrapperDiv}>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="input-with-icon-adornment">Променете името си.</InputLabel>
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
                        <aside>Биография:</aside>
                        <TextareaAutosize
                            cols={50}
                            rowsMax={4}
                            aria-label="maximum height"
                            placeholder="Maximum 4 rows"
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
