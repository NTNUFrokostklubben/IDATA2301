import {Outlet} from "react-router-dom";
import "./layout.css"
import {useRef, useState} from "react";
import {createPortal} from "react-dom";
import Login from "../component/modals/auth/login";
import Register from "../component/modals/auth/register";
// import {Modal} from "react-native";

export default function Layout() {

    const [showLoginModal, setShowLoginModal] = useState()
    const [showSignupModal, setShowSignupModal] = useState()


    // const modal = () => {
    //     <Modal>
    //
    //     </Modal>
    // }

    return (
        <div>
            {
                showLoginModal && createPortal(
                    <Login changeMode={() => {
                        setShowSignupModal(true)
                        setShowLoginModal(false)
                    }} onClose={() => setShowLoginModal(false)}/>,
                    document.getElementById("auth-modal")
                )
            }
            {
                showSignupModal && createPortal(
                    <Register changeMode={() => {
                        setShowLoginModal(true)
                        setShowSignupModal(false)
                    }} onClose={() => setShowSignupModal(false)}/>,
                    document.getElementById("auth-modal")
                )
            }
            <div id={"auth-modal"}/>

            <Outlet/>

        </div>
    )
}