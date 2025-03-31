import "./auth.css"
import {useRef} from "react";
import {useFocusTrap} from "../../../utils/useFocusTrap";

export default function Register({onClose, changeMode}) {

    const modalRef = useRef(null)
    useFocusTrap(modalRef, true, onClose) // Passes true to isOpen due to this modal only being open when it is rendered

    return (
        <div className={"auth-background"}
             ref={modalRef}
             onClick={(c) => {
                 if (c.target === modalRef.current) {
                     onClose()
                 }
             }}>
            <div className="authform">
                <button id={"auth-close-button"} onClick={onClose}>
                    <img alt={"X"} src={"icons/close-sharp.svg"}/>
                </button>
                <h1 className={"auth-h1"}>
                    Sign Up
                </h1>
                <form action="http://localhost:8080/login" method="POST">
                    <section id="credentials">

                        <label htmlFor="name">Full name:
                            <input type="text" id="name" name="name" required/>
                        </label>


                        <label htmlFor="email">Email:
                            <input type="text" id="email" name="email" required/>
                        </label>


                        <label htmlFor="password">Password:
                            <input type="password" id="password" name="password" required/>
                        </label>


                    </section>
                    <section id="auth-CTA">
                        <button className="cta-button" type="submit">Sign up</button>
                        {/*TODO: Implement redirect to Signup modal (probably just build component again in react)*/}
                        <button onClick={changeMode} className="cta-button secondary-button" type="submit">Log In instead</button>
                    </section>
                </form>
            </div>
        </div>
    )
}