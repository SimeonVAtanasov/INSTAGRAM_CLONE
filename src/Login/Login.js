import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Logo from "../Logo/Logo.js";
import Input from "../Input/Input.js";
// import { debounce } from "../utils/debounce.js"
import './Login.css';
import PasswordField from "../PasswordField/PasswordField.js";
import { auth } from "../firebase.js";
import styles from "../Logo/Logo.module.css";

import Button from '@material-ui/core/Button';

export default function Login(props) {

  const [registration, showReg] = useState(false);

  const email = useFormInput("");
  const password = useFormInput("");
  const fullName = useFormInput("");

  let registerUser = (ev) => {
    ev.preventDefault();
    auth.createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in 
        let user = userCredential.user;
        // user.sendEmailVerification();
        user.updateProfile({
          displayName: fullName.value,
        }).then(() => console.log(user.displayName))

        showReg(false)
      })
      .catch((error) => {
        alert(error.message);
      });

  }

  let logUser = (ev) => {
    ev.preventDefault();
    auth.signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        // var user = userCredential.user;
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
          <img id='loginCarousel' src={"loginCarousel.png"} alt="loginCarousel" width="455px" height="600px" />
        </section>
        <section id="boxes">
          <div>

            <Logo className={styles.loginLogo} width={"200px"} />

            <form>
              <div>
                <Input type={"email"} text="Имейл" onInput={email.onchange} value={email.value} />
              </div>

              {registration ? (
                <>
                  <div>
                    <Input onInput={fullName.onchange} value={fullName.value} type={"text"} text="Пълно име" />
                  </div>


                </>
              ) : <></>}

              <div>
                <PasswordField onInput={password.onchange} value={password.value} />
              </div>


              {!registration ? 
                <Button variant="contained" color="primary" type="submit" onClick={(ev) => { logUser(ev); }}>Вход</Button>
                :
                <Button variant="contained" color="primary" type="submit" onClick={(ev) => { registerUser(ev) }}>Регистрирай ме!</Button>}

              {!registration ? <p>Нямате акаунт?</p> : <p>Имате акаунт?</p>}

              <Button variant="contained" color="primary" onClick={(ev) => { changeView(ev) }}>{registration ? "Вход" : "Регистрация"}</Button>

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