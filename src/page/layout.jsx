import {Outlet} from "react-router-dom";
import "./layout.css"
import React from "react";
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
            <nav id="menu-navbar">
                <li id="logo-image">
                    <img id="logo-icon" src="logo.svg" alt="Learniverse Logo"/>
                </li>
                <li>
                    <div className="dropdown">
                        <button className="drop-btn"> Courses &nbsp;
                            <img id="triangle-icon" width="12" height="12" src="/icons/triangle-sharp.svg" alt={""}/>
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Course 1</a>
                            <a href="#">Course 2</a>
                            <a href="#">Course 3</a>
                            <a href="#">Course 4</a>
                            <a href="#">Course 5</a>
                            <a href="#">Course 6</a>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="search-container">
                        <form id="form_search" role="search">
                            <button type="submit" id="search_btn">
                                <img id="searchIcon" width="20" height="20" src="/icons/search-sharp.svg"
                                     alt="search icon"/>
                            </button>
                            <input type="text" placeholder="Search.." name="search"/>
                        </form>
                    </div>
                </li>
                <li>
                    <div id="login-signup-btn">
                        <button onClick={() => setShowLoginModal(true)} id="login-btn" className={"secondary-button"} alt="Log in" href="#">
                            <h5>Log in</h5>
                        </button>
                        <button onClick={() => setShowSignupModal(true)} className="cta-button" id="signup-btn"
                                alt="Sign up" href="#">
                                <h5>Sign up</h5>
                        </button>    
                    </div>
                </li>
            </nav>
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