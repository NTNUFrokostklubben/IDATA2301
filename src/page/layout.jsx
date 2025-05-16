import {Link, Outlet, useNavigate, useSearchParams} from "react-router-dom";
import "./layout.css"
import React, {useEffect} from "react";
import {useRef, useState} from "react";
import {createPortal} from "react-dom";
import Login from "../component/modals/auth/login";
import Register from "../component/modals/auth/register";
import Index from "./index";
import {deleteAuthorizationCookies, getAuthenticatedUser, isAdmin} from "../utils/authentication/authentication";
import {AsyncApiRequest} from "../utils/requests";
import ScrollRoute from "../component/routing/scrollRoute";
import {useDispatch, useSelector} from "react-redux";
import {clearCourseObject, clearUserObject} from "../dataSlice";
import LearniverseLogo from "../component/icons/learniverseLogo";
import {deleteUserRedux} from "../utils/commonRequests";
// import {Modal} from "react-native";

export default function Layout() {

    const [showLoginModal, setShowLoginModal] = useState();
    const [showSignupModal, setShowSignupModal] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const user = useSelector((state) => state.data.user)
    const searchValue = searchParams.get("search");
    const [userPicture, setUserPicture] = useState(String);
    const navigate = useNavigate();


    /**
     * This function is called when the component mounts.
     * It checks if the user is logged in and updates the UI accordingly.
     */
    useEffect(() => {
        // Check if the user is logged in
        const user = getAuthenticatedUser();
        const signedOutElements = document.querySelectorAll(".signed-out");
        const signedInElements = document.querySelectorAll(".signed-in");
        const adminElements = document.querySelectorAll(".nav-admin");
        const userElements = document.querySelectorAll(".nav-user");
        if (!user) {
            // Show login and signup buttons
            signedOutElements.forEach(element => element.style.display = "flex");
            signedInElements.forEach(element => element.style.display = "none");
        } else {
            // If logged in, show the logout button and user icon
            signedOutElements.forEach(element => element.style.display = "none");
            signedInElements.forEach(element => element.style.display = "flex");

            if(isAdmin(user)){
                adminElements.forEach(element => element.style.display = "flex");
                userElements.forEach(element => element.style.display = "none");
            } else{
                adminElements.forEach(element => element.style.display = "none");
                userElements.forEach(element => element.style.display = "flex");
            }
            fetchUserProfilePic();
        }
    }, []);


    /**
     * Fetches the user profile picture link
     */
    async function fetchUserProfilePic() {
        if (user) setUserPicture(user.profilePicture)
    }

    /**
     * Fetches the user profile picture link
     */
    useEffect(() => {
        if (user) setUserPicture(user.profilePicture)
    }, [user]);

    /**
     * Navigates to the search page.
     */
    function goToSearchPage() {
        navigate("/search");
    }

    /**
     * Navigates to the user page.
     */
    function goToUserPage(){
        navigate(`/userpage`);
    }

    /**
     * Navigates to the admin page.
     */
    function goToAdminPage() {
        navigate(`/admin`);
    }

    /**
     * Logs out the user by deleting the authentication cookies and redirecting to the index page.
     */
    function logout() {
        // Clear the authentication cookies
        deleteAuthorizationCookies();
        deleteUserRedux().then(() =>{
            console.log(user);
            window.location.reload();
        })
        // Redirect to the login page
        navigate("/");
        // Reload the page to update the UI

    }

    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Tienne:wght@400;700;900&display=swap"
                  rel="stylesheet"/>
            <menu id="menu-navbar">
                <div className="navbar-container">
                    <li id="logo-image">
                        <Link to={"/"}><img id="logo-icon" src="/logo.svg" alt="Learniverse Logo"/></Link>
                    </li>
                    <li>
                        <div className="dropdown" id="courses-dropdown">
                            <button className="drop-btn"><b>Courses</b> &nbsp;
                                <img id="triangle-icon" width="12" height="12" src="/icons/triangle-sharp.svg"
                                     alt={""}/>
                            </button>
                            <div className="dropdown-content">
                                <Link to={"/search?search="}>All courses</Link>
                                <hr/>
                                <Link to={"/search?categories=it"}>Information Technologies</Link>
                                <Link to={"/search?categories=dm"}>Digital Marketing</Link>
                                <Link to={"/search?categories=be"}>Business and Entrepreneurship</Link>
                                <Link to={"/search?categories=dsa"}>Data Science and Analytics</Link>

                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="search-container">
                            <form onSubmit={goToSearchPage} id="form_search" role="search">
                                <button type="submit" id="search_btn">
                                    <img id="searchIcon" src="/icons/search-sharp.svg" alt="search icon"/>
                                </button>
                                <input type="text" placeholder="Search..." defaultValue={searchValue} name="search"/>

                            </form>
                        </div>
                    </li>
                    <li>
                        <div id="user-login-signup-container">
                            <div id="login-signup-1">

                                <div className="signed-in">

                                    <div className="nav-user">
                                        <img className="nav-user-image" src={userPicture} alt="User profile"
                                             onClick={() => goToUserPage()}/>
                                    </div>

                                    <div className="nav-admin">
                                        <div className="dropdown" id="ls-dropdown">
                                            <button className="admin-drop-down">
                                                <img className="nav-user-image" src={userPicture} alt="User profile"/>
                                            </button>
                                            <div className="dropdown-content">
                                                <a onClick={() => goToUserPage()}> Userpage </a>
                                                <a onClick={() => goToAdminPage()}> Admin </a>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={() => logout()} className="cta-button" id="logout-btn"
                                            alt="Log out" href="#">
                                        <b>Log out</b>
                                    </button>

                                </div>

                                <div className="signed-out">
                                    <button onClick={() => {
                                        setShowLoginModal(true)
                                        setShowSignupModal(false)
                                    }} id="login-btn"
                                            className="secondary-button" alt="Log in" href="#">
                                        <b>Log in</b>
                                    </button>
                                    <button onClick={() => {
                                        setShowSignupModal(true)
                                        setShowLoginModal(false)
                                    }} className="cta-button" id="signup-btn"
                                            alt="Sign up" href="#">
                                        <b>Sign up</b>
                                    </button>
                                </div>
                            </div>

                            <div id="login-signup-2">
                                <div className="signed-in">
                                    <div className="dropdown" id="ls-dropdown">
                                        <div className="nav-user">
                                            <button className="login-signup-drop-down">
                                                <img className="menu-icon" src="/icons/menu-sharp.svg" alt="menu"/>
                                            </button>
                                            <div className="dropdown-content">
                                                <a onClick={() => goToUserPage()}>Userpage</a>
                                                <a onClick={() => logout()}>Log Out</a>
                                            </div>
                                        </div>
                                        <div className="nav-admin">
                                            <button className="login-signup-drop-down">
                                                <img className="menu-icon" src="/icons/menu-sharp.svg" alt="menu"/>
                                            </button>
                                            <div className="dropdown-content">
                                                <a onClick={() => goToUserPage()}>Userpage</a>
                                                <a onClick={() => goToAdminPage()}>Admin</a>
                                                <a onClick={() => logout()}>Log Out</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="signed-out">
                                    <div className="dropdown" id="ls-dropdown">
                                        <button className="login-signup-drop-down">
                                            <img className="menu-icon" src="/icons/menu-sharp.svg" alt="menu"/>
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
                </div>
            </menu>

            <div className={"page-content"}>
                <ScrollRoute><Outlet/></ScrollRoute>
            </div>

            {/* Footer */}
            <footer>
                <LearniverseLogo fill={"#FFFFFF"} />

                <div id="footer-textbox">

                    <div className="textFooter" id="contact-us">
                        <h3>Contact us:</h3>

                        <p>Address: &nbsp;
                            <a href="https://maps.app.goo.gl/R53VDUQx8n6gL9tx8"
                               target="_blank">
                                Larsgårdsvegen 2, 6009 Ålesund
                            </a>
                        </p>
                        <p>Phone number: +47 735 95 000</p>
                        <p>Email: <a href="mailto:support@learniverse.no">support@learniverse.no</a></p>
                    </div>

                    <div className="textFooter" id="legal">

                        <h3>Legal</h3>
                        <p>
                            This website is a result of a university group project, performed in the course
                            <a href={"https://www.ntnu.edu/studies/courses/IDATA2301#tab=omEmnet"}> IDATA2301 </a>
                            Web technologies, at <a href={"https://www.ntnu.no/"}>NTNU</a>. All the information
                            provided here is a result of imagination. Any resemblance with real companies or
                            products is a coincidence.
                        </p>
                    </div>

                </div>
            </footer>
            {
                showLoginModal && createPortal(
                    <Login
                        changeMode={() => {
                            setShowSignupModal(true)
                            setShowLoginModal(false)
                        }}
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