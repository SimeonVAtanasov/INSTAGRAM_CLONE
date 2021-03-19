import Logo from "../Logo/Logo.js";
import './Login.css'
import { Link } from "react-router-dom"

export default function Login() {
  return (
    <>
      <main className="mainContainer">

        <section>
          <img src={"loginCarousel.png"} alt="loginCarousel" width="350px" height="490px" />
        </section>
        <section id="boxes">
          <div>

            <div id='loginLogo'>
              <Logo />
            </div>

            <form>

              <input type="text" />
              <input type="pasword" />

              <button type="submit">Вход</button>

            </form>

          </div>
          <div>
            <p>Нямате акаунт? <a href="#banan" >Регистрация</a> </p>
          </div>
        </section>

      </main>
    </>
  )

}