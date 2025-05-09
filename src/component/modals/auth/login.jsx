import "./auth.css"
import {useContext, useEffect, useRef, useState} from "react";
import { useFocusTrap } from "../../../utils/useFocusTrap";
import {redirect, useNavigate} from "react-router-dom";
import {sendAuthenticationRequest} from "../../../utils/authentication/authentication";
import {showFormErrorLogin} from "../../../utils/tools"
import {useDispatch} from "react-redux";
import {clearCourseObject, setUserObject} from "../../../dataSlice";
import {AsyncApiRequest} from "../../../utils/requests";


export default function Login({ onClose, changeMode, closable=true }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    async function addUserToRedux(email){

        const userDto = await AsyncApiRequest("GET", `/userDto/${email}`, null)
            .then(response => response.json())
        console.log(userDto)
        dispatch(setUserObject(userDto));
    }

    function submitForm(event){
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        console.log("Submitting form");
        sendAuthenticationRequest(email, password, onLoginSuccess, showFormErrorLogin);
    }
    /**
     * This function is called when login is successful
     */
    function onLoginSuccess(userData) {
        console.log("Successfully logged in for user: ", userData.email);
        addUserToRedux(userData.email).then(() => {
            window.location.reload()
        }
        )
       // TODO - maybe find an other way to do this
        onClose();
    }

    const modalRef = useRef(null)
    useFocusTrap(modalRef, true, onClose) // Passes true to isOpen due to this modal only being open when it is rendered


    return (
        <div className={"auth-background"}
        ref={modalRef}
        onClick={((c) => {
            if ( closable &&  c.target === modalRef.current) {
                onClose()
            }

        })}>
            <div className="authform">
                { closable &&
                <button id={"auth-close-button"} className={"secondary-button"} onClick={onClose}>
                    <img alt={"X"} src={"/icons/close-sharp.svg"} />
                </button>
                }
                <h2 className={"auth-h2"}>
                    Log In
                </h2>
                <form>
                    <section id="credentials">

                        <label htmlFor="email">Email:
                            <input type="text"
                                   id="email"
                                   name="email"
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