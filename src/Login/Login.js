import React, { useState } from 'react';

import Logo from "../Logo/Logo.js";
import Input from "../Input/Input.js";
// import { debounce } from "../utils/debounce.js"
import './Login.css';
import PasswordField from "../PasswordField/PasswordField.js";
import { auth } from "../firebase.js";
import styles from "../Logo/Logo.module.css";



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
        // console.log("🚀 ~ file: Login.js ~ line 70 ~ .then ~ user", user)
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
                <Input text="Имейл" onInput={email.onchange} value={email.value} />
              </div>

              {registration ? (
                <>
                  <div>
                    <Input onInput={fullName.onchange} value={fullName.value} text="Пълно име" />
                  </div>


                </>
              ) : <></>}

              <div>
                <PasswordField onInput={password.onchange} value={password.value} />
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