import "./auth.css"
import {useEffect, useRef, useState} from "react";
import { useFocusTrap } from "../../../utils/useFocusTrap";
import {redirect, useNavigate} from "react-router-dom";
import {sendAuthenticationRequest} from "../../../utils/authentication/authentication";
import {showFormError} from "../../../utils/tools"


export default function Login({ onClose, changeMode, props }) {
    const [error, setError] =useState("");
    const navigate = useNavigate();

    function submitForm(event){
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log("Submitting form");
        sendAuthenticationRequest(username, password, onLoginSuccess, showFormError);
    }
    /**
     * This function is called when login is successful
     */
    function onLoginSuccess(userData) {
        alert("Successfully logged in for user")
        props.setUser(userData);
        navigate("/");
    }

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
                <button id={"auth-close-button"} className={"secondary-button"} onClick={onClose}>
                    <img alt={"X"} src={"icons/close-sharp.svg"} />
                </button>
                <h2 className={"auth-h2"}>
                    Log In
                </h2>
                <form>
                    <section id="credentials">

                        <label htmlFor="username">Email:
                            <input type="text"
                                   id="username"
                                   name="username"
                                   required/>
                        </label>


                        <label htmlFor="password">Password:
                            <input type="password"
                                   id="password"
                                   name="password"
                                   required/>
                        </label>

                    <p id="result-message" className="hidden"></p>

                    </section>
                    <section id="auth-CTA">
                        <button className="cta-button" type="submit" onClick={submitForm}>Log In</button>
                        {/*TODO: Implement redirect to Signup modal (probably just build component again in react)*/}
                        <button onClick={changeMode} className="cta-button secondary-button" type="button">Sign up instead</button>
                    </section>

                </form>
            </div>
        </div>
    )
}