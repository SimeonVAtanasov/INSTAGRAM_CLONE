import React, { useState } from 'react';
import Logo from "../Logo/Logo.js";
import Input from "../Input/Input.js";
// import { debounce } from "../utils/debounce.js"
import './Login.css';
import PasswordField from "../PasswordField/PasswordField.js";
import { auth, db } from "../firebase.js";
import styles from "../Logo/Logo.module.css";

import Button from '@material-ui/core/Button';

export default function Login() {

  const [isShowingReg, setIsShowingReg] = useState(false);

  const email = useFormInput("");
  const password = useFormInput("");
  const fullName = useFormInput("");

  let registerUser = (ev) => {

    ev.preventDefault();
    if (fullName.value !== "") {
      auth.createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          db.collection("users")
            .doc(userCredential.user.uid)
            .set({
              uid: userCredential.user.uid,
              displayName: fullName.value,
              photoUrl: "/static/images/avatar/1.jpg",
              email: email.value,
              following: 0,
              followers: 0,
              posts: [],
              stories: [],
              biography: "",
              notifications: [{user:"Nevena", action: "liked   your photo",  timestamp:"hour ago"}]
            });


          setIsShowingReg(false)
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Failed Fullname field is required")
    }


  }

  let logUser = (ev) => {
    ev.preventDefault();
    auth.signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {

      })
      .catch((error) => {
        alert(error.message);
      });
  }


  let changeView = (ev) => {
    ev.preventDefault()
    if (isShowingReg) {
      setIsShowingReg(false);
      return
    }
    setIsShowingReg(true);
  }

  return (
    <>
      <main className="mainContainer">

        <section>
          <img id='loginCarousel' src={"loginCarousel.png"} alt="loginCarousel" width="455px" height="600px" />
        </section>
        <section id="boxes">
          <div>

            <Logo className={styles.loginLogo} width={"200px"} />

            <form>
              <div>
                <Input type={"email"} text="Имейл" onInput={email.onchange} value={email.value} />
              </div>

              {isShowingReg &&

                <div>
                  <Input required onInput={fullName.onchange} value={fullName.value} type={"text"} text="Пълно име" />
                </div>

              }

              <div>
                <PasswordField onInput={password.onchange} value={password.value} />
              </div>


              {!isShowingReg ?
                <Button variant="contained" color="primary" type="submit" onClick={(ev) => { logUser(ev); }}>Вход</Button>
                :
                <Button variant="contained" color="primary" type="submit" onClick={(ev) => { registerUser(ev) }}>Регистрирай ме и влез!</Button>}

              {!isShowingReg ? <p>Нямате акаунт?</p> : <p>Имате акаунт?</p>}

              <Button variant="contained" color="primary" onClick={(ev) => { changeView(ev) }}>{isShowingReg ? "Вход" : "Регистрация"}</Button>

            </form>
          </div>
        </section>

      </main>
    </>
  )

}

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);


  function handleChange(ev) {
    setValue(ev.target.value)
  }

  return {
    value,
    onchange: handleChange

  };
}