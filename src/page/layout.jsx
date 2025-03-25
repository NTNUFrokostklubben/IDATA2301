import {Outlet} from "react-router-dom";
import "./layout.css"
import {useState} from "react";
import {createPortal} from "react-dom";
import Login from "../component/modals/auth/login";
// import {Modal} from "react-native";

export default function Layout() {

    const [showLoginModal,setShowLoginModal] = useState()

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
                        <button className="drop-btn">Courses <img id="triangle-icon" width="12" height="12"
                                                                  src="/icons/triangle-sharp.svg"/></button>
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
                    <div id="cart">
                        <a href=""><img id="cart_img" src="/icons/cart-sharp.svg" alt="shopping cart"/></a>
                    </div>

                </li>

                <li>
                    <div id="login-signup-btn">
                        <button onClick={() => setShowLoginModal(true)} id="login-btn" alt="Log in" href="#">Log in</button>
                        <button className="cta-button" id="signup-btn" alt="Sign up" href="#">Sign up</button>
                    </div>
                </li>
            </nav>
            {
                showLoginModal && createPortal(
                    <Login onClose={() => setShowLoginModal(false)}/>,
                    document.body
                )
            }

            <Outlet/>

        </div>
    )
}