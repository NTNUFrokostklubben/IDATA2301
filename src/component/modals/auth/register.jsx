import "./auth.css"
import {useRef} from "react";
import {useFocusTrap} from "../../../utils/useFocusTrap";
import {sendAuthenticationRequest, sendSignupRequest} from "../../../utils/authentication/authentication";
import {showFormErrorSignup} from "../../../utils/tools";

export default function Register({onClose, changeMode, closable=true }) {

    const modalRef = useRef(null)
    useFocusTrap(modalRef, true, onClose) // Passes true to isOpen due to this modal only being open when it is rendered

    function submitForm(event){
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        sendSignupRequest(name, email, password,
            (userData) => onSignupSuccess(userData, password), // pass password
            showFormErrorSignup
        );
        console.log("Submitting form");
    }

    function onSignupSuccess(userData, password) {
        console.log("Successfully signed up for user: ", userData.username);
        sendAuthenticationRequest(userData.username, password, onSigninSuccess, showFormErrorSignup);
        window.location.reload();
        onClose();
    }

    /**
     * This function is called when login is successful
     */
    function onSigninSuccess(userData) {
        console.log("Successfully logged in for user: ", userData.username);
        onClose();
    }

    return (
        <div className={"auth-background"}
             ref={modalRef}
             onClick={(c) => {
                 if (closable && c.target === modalRef.current) {
                     onClose()
                 }
             }}>
            <div className="authform">
                { closable &&
                    <button id={"auth-close-button"} className={"secondary-button"} onClick={onClose}>
                    <img alt={"X"} src={"/icons/close-sharp.svg"}/>
                </button>
                }
                <h2 className={"auth-h2"}>
                    Sign Up
                </h2>
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

                        <p id="result-message" className="hidden"></p>
                    </section>
                    <section id="auth-CTA">
                    <button className="cta-button" type="submit" onClick={submitForm}>Sign up</button>
                        {/*TODO: Implement redirect to Signup modal (probably just build component again in react)*/}
                        <button onClick={changeMode} className="cta-button secondary-button" type="button">Log in instead</button>
                    </section>
                </form>
            </div>
        </div>
    )
}