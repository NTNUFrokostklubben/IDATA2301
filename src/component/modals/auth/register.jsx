import "./auth.css"
import {useRef} from "react";
import {useFocusTrap} from "../../../utils/useFocusTrap";
import {sendAuthenticationRequest} from "../../../utils/authentication/authentication";
import {AsyncApiRequest} from "../../../utils/requests";
import {SignupEntity} from "../../../utils/Classes/commonClasses";

export default function Register({onClose, changeMode}) {

    const modalRef = useRef(null)
    useFocusTrap(modalRef, true, onClose) // Passes true to isOpen due to this modal only being open when it is rendered

    function submitForm(event){
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const signup = new SignupEntity(name, password, email);
        postSignup(signup).then(alert("Successfully signed up new user"));
        console.log("Submitting form");
    }

    async function postSignup(signup) {
        try {
            const p = await AsyncApiRequest("POST", "/signup", signup);
        } catch (e) {
            throw e
        }
    }

    return (
        <div className={"auth-background"}
             ref={modalRef}
             onClick={(c) => {
                 if (c.target === modalRef.current) {
                     onClose()
                 }
             }}>
            <div className="authform">
                <button id={"auth-close-button"} className={"secondary-button"} onClick={onClose}>
                    <img alt={"X"} src={"icons/close-sharp.svg"}/>
                </button>
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


                    </section>
                    <section id="auth-CTA">
                        <button className="cta-button" type="submit" onClick={submitForm}>Sign up</button>
                        {/*TODO: Implement redirect to Signup modal (probably just build component again in react)*/}
                        <button onClick={changeMode} className="cta-button secondary-button" type="button">Log In instead</button>
                    </section>
                </form>
            </div>
        </div>
    )
}