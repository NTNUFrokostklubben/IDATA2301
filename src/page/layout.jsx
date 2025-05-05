import {Link, Outlet, useNavigate, useSearchParams} from "react-router-dom";
import "./layout.css"
import React, {useEffect} from "react";
import {useRef, useState} from "react";
import {createPortal} from "react-dom";
import Login from "../component/modals/auth/login";
import Register from "../component/modals/auth/register";
import Index from "./index";
import {deleteAuthorizationCookies, getAuthenticatedUser} from "../utils/authentication/authentication";
import {AsyncApiRequest} from "../utils/requests";
// import {Modal} from "react-native";

export default function Layout() {

    const [showLoginModal, setShowLoginModal] = useState();
    const [showSignupModal, setShowSignupModal] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchValue = searchParams.get("search");
    const [userPicture, setUserPicture] = useState([]);
    const navigate = useNavigate();


useEffect(() => {
    // Check if the user is logged in
    const user = getAuthenticatedUser();
    const signedOutElements = document.querySelectorAll(".signed-out");
    const signedInElements = document.querySelectorAll(".signed-in");
    if (!user) {
        // Show login and signup buttons
        signedOutElements.forEach(element => element.style.display = "flex");
        signedInElements.forEach(element => element.style.display = "none");
    } else {
        // If logged in, show the logout button and user icon
        signedOutElements.forEach(element => element.style.display = "none");
        signedInElements.forEach(element => element.style.display = "flex");
        const username = user.username;
        fetchUserProfilePic(username);
    }
}, []);

    /**
     * Fetches the total revenue from the API
     */
    async function fetchUserProfilePic(username) {
        try{
            const fetchApiCall = `/userProfilePicture/${username}`;
            const data = await AsyncApiRequest("GET", {fetchApiCall}, null)
                .then(response => response.json());
            setUserPicture(data);
        } catch (err){
            setUserPicture("/icons/person-sharp.svg");
            console.log("Error fetching total revenue: ", err);
        }
    }


    function goToSearchPage() {
        navigate("/search");
    }

    function goToUserPage(){
        navigate(`/userpage/${1}`);
    }

    // TODO : refactor
    function logout() {
        // Clear the authentication cookies
        deleteAuthorizationCookies();
        // Redirect to the login page
        navigate("/");
        // Reload the page to update the UI
        window.location.reload();
    }

    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Tienne:wght@400;700;900&display=swap"
                  rel="stylesheet"/>
            {/*Navbar*/}
            <nav id="menu-navbar">
                <li id="logo-image">
                    <Link to={"/"}><img id="logo-icon" src="/logo.svg" alt="Learniverse Logo"/></Link>
                </li>
                <li>
                    <div className="dropdown" id={"courses-dropdown"}>
                        <button className="drop-btn"><h5>Courses</h5> &nbsp;
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
                        <form onSubmit={goToSearchPage} id="form_search" role="search">
                            <button type="submit" id="search_btn">
                                <img id="searchIcon" src="/icons/search-sharp.svg" alt="search icon"/>
                            </button>
                            <input type="text" placeholder="search..." defaultValue={searchValue}  name="search"/>
                        </form>
                    </div>
                </li>
                <li>
                    <div id="login-signup-btn">
                        <div id="login-signup-1">
                            <div className={"signed-in"}>
                                <div className={"nav-user"}>
                                    <img className={"nav-user-image"} src={userPicture} alt={"User profile"}
                                         onClick={() => goToUserPage()} />
                                </div>
                                <button onClick={() => logout()} className="cta-button" id="logut-btn"
                                        alt="Log out" href="#">
                                    <h5>Log out</h5>
                                </button>
                            </div>
                            <div className={"signed-out"}>
                                <button onClick={() => setShowLoginModal(true)} id="login-btn"
                                        className={"secondary-button"} alt="Log in" href="#">
                                    <h5>Log in</h5>
                                </button>
                                <button onClick={() => setShowSignupModal(true)} className="cta-button" id="signup-btn"
                                        alt="Sign up" href="#">
                                    <h5>Sign up</h5>
                                </button>
                            </div>
                        </div>

                        <div id="login-signup-2">
                            <div className={"signed-in"}>
                                <div className="dropdown" id="ls-dropdown">
                                    <button className="login-signup-drop-down">
                                        <img id="menu-icon" src="/icons/menu-sharp.svg" alt="menu"/>
                                    </button>
                                    <div className="dropdown-content">
                                        <a onClick={() => goToUserPage()}>Userpage</a>
                                        <a onClick={() => logout()}>Log Out</a>
                                    </div>
                                </div>
                            </div>
                            <div className={"signed-out"}>
                                <div className="dropdown" id="ls-dropdown">
                                    <button className="login-signup-drop-down">
                                        <img id="menu-icon" src="/icons/menu-sharp.svg" alt="menu"/>
                                    </button>
                                    <div className="dropdown-content">
                                        <a onClick={() => setShowLoginModal(true)}>Log in</a>
                                        <a onClick={() => setShowSignupModal(true)}>Sign Up</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </li>
            </nav>

            <Outlet/>

            {/* Footer */}
            <footer>
                <img id="logo-icon" src="/logo.svg" alt="Learniverse Logo"/>

                <div id="footer-textbox">

                    <div className="textFooter" id="contact-us">
                        <h5>Contact us:</h5>
                        <p>Address: 1234 Main Street, Lincoln, NE 685089</p>
                        <p>Phone number: +47 123 45 678</p>
                        <p>Email: learniverse@connect.com</p>
                    </div>

                    <div className="textFooter" id="legal">
                        <h5>Legal</h5>
                        <small>This website is a result of a university group project, performed in the course
                            <a href={"https://www.ntnu.edu/studies/courses/IDATA2301#tab=omEmnet"}> IDATA2301</a>
                            Web technologies, at NTNU. All the information provided here is a result of
                            imagination. Any resemblance with real companies or products is a coincidence.</small>
                    </div>

                </div>
            </footer>
            {
                showLoginModal && createPortal(
                    <Login
                        changeMode={() => {
                        setShowSignupModal(true)
                        setShowLoginModal(false)}}
                        onClose={() => setShowLoginModal(false)}
                    />,
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

        </div>
    )
}