import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBvtkTPX___kJGMZMmbN88HtqxMcuWTstw",
    authDomain: "instagram-4c584.firebaseapp.com",
    projectId: "instagram-4c584",
    storageBucket: "instagram-4c584.appspot.com",
    messagingSenderId: "443559249182",
    appId: "1:443559249182:web:2ae2ae14ed6731abed750f",
    measurementId: "G-T0VZTBR8Z1"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}