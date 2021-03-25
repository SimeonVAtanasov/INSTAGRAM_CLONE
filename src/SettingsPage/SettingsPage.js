import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Avatar, Box, Button, OutlinedInput, TextareaAutosize, TextField } from '@material-ui/core';
import { auth } from '../firebase';
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

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));



export default function SettingsPage() {


    const classes = useStyles();


    const [user, setUser] = useState({});
    const [displayNameText, setDisplayNameText] = useState(user.displayName);

    useEffect(() => {
        let user = auth.currentUser;
        setUser(user)
        setDisplayNameText(user.displayName)
    }, [])

    useEffect(() => {
        let user = auth.currentUser;

        user.updateProfile({ displayName: user.displayName })

    }, [user.displayName])

    const handleDisplayNameChange = (e) => {
        setDisplayNameText(e.target.value)
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" className={styles.mainContent}>

                <Button variant="contained" color="primary">
                    Запази
                    </Button>

                <Box className={styles.settingsWrapper}>

                    <Box className={styles.headerSettings}>
                        <Avatar
                            className={styles.avatarSettings}
                            alt={user.displayName}
                            src={user ? user.photoURL : "/static/images/avatar/1.jpg"}
                        />
                        <Box className={styles.header}>
                            <Box className={styles.nameWrapper}>
                                <h2>{user.displayName}</h2>
                                <SettingsMenu />
                            </Box>

                            <PostUpload text={"Промени снимката на профила"} isPost={false} />

                        </Box>
                    </Box>


                    <Box>
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


                    <Box>
                        <aside>Биография:</aside>
                        <TextareaAutosize
                            cols={50}
                            rowsMax={4}
                            aria-label="maximum height"
                            placeholder="Maximum 4 rows"
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua."
                        />

                    </Box>

                </Box>


            </Container>
        </>
    )
}
