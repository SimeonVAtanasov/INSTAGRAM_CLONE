import React, { useState } from 'react';

import Logo from "../Logo/Logo.js";
import Input from "../Input/Input.js";
import { debounce } from "../utils/debounce.js"
import './Login.css';
import PasswordField from "../PasswordField/PasswordField.js";
import { auth } from "../firebase.js";
import styles from "../Logo/Logo.module.css";



export default function Login(props) {

  const [registration, showReg] = useState(false);

  const [mailInputValue, getEmail] = useState("");

  const [passwordInputValue, getPassword] = useState("");
  const [fullNameInputValue, getFullName] = useState("");

  let onInputEmail = (ev) => {
    getEmail(ev.target.value);
  }

  let onInputPassword = (ev) => {
    getPassword(ev.target.value);
  }

  let onInputFullName = (ev) => {

    getFullName(ev.target.value);
  }


  let registerUser = (ev) => {
    ev.preventDefault();
    auth.createUserWithEmailAndPassword(mailInputValue, passwordInputValue)
      .then((userCredential) => {
        // Signed in 
        let user = userCredential.user;

        user.updateProfile({
          displayName: fullNameInputValue,
        }).then(() => console.log(user.displayName))

        // console.log("🚀 ~ file: Login.js ~ line 49 ~ .then ~ user", user);
        // getEmail("");
        // getPassword("")
        showReg(false)
      })
      .catch((error) => {
        alert(error.message);
      });



  }

  let logUser = (ev) => {
    ev.preventDefault();
    auth.signInWithEmailAndPassword(mailInputValue, passwordInputValue)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("🚀 ~ file: Login.js ~ line 70 ~ .then ~ user", user)
        props.changeStatus();
        // ...
      })
      .catch((error) => {
        alert(error.message);
      });
  }


  let changeView = (ev) => {
    ev.preventDefault()
    if (registration) {
      showReg(false);
      return
    }
    showReg(true);
  }

  return (
    <>
      <main className="mainContainer">

        <section>
          <img id='loginCarousel' src={"loginCarousel.png"} alt="loginCarousel" width="370px" height="495px" />
        </section>
        <section id="boxes">
          <div>

            <Logo className={styles.loginLogo} width={"140px"} />

            <form>

              <div>
                <Input text="Имейл" onInput={onInputEmail} />
              </div>

              {registration ? (
                <>
                  <div>
                    <Input onInput={onInputFullName} text="Пълно име" />
                  </div>


                </>
              ) : <></>}

              <div>
                <PasswordField onInput={onInputPassword} />
              </div>


              {!registration ? (<button type="submit" onClick={(ev) => { logUser(ev); }}>Вход</button>) : <button type="submit" onClick={(ev) => { registerUser(ev) }}>Регистрирай ме!</button>}

              {!registration ? <p>Нямате акаунт?</p> : <p>Имате акаунт?</p>}

              <button id="registerBtn" onClick={(ev) => { changeView(ev) }}>{registration ? "Вход" : "Регистрация"}</button>

            </form>
          </div>
        </section>

      </main>
    </>
  )

}