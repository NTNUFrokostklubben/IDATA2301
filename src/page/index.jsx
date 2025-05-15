import React, { useState, useEffect } from "react";
import "./Index.css";
import Search from "./search/search";
import {Link, Route} from "react-router-dom";
import {CourseCard, CourseCardSkeleton} from "../component/card/courseCard";
import Register from "../component/modals/auth/register";
import {createPortal} from "react-dom";
import {AsyncApiRequest} from "../utils/requests";
import {CourseWithPrice} from "../utils/Classes/commonClasses";
import {getCourses, getProviders} from "../utils/commonRequests";
import {Skeleton} from "@mui/material";
import {getAuthenticatedUser} from "../utils/authentication/authentication";
import {useNavigate} from "react-router-dom";

export default function Index() {

    const [showSignupModal, setShowSignupModal] = useState()
    const [courseShown, setCourseShown] = useState(calcSceneStart(0));
    const [courseIndex, setCourseIndex] = useState(0);
    const [courseCards, setCourseCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [providers, setProviders] = useState([]);
    const [overflow, setOverflow] = useState(false);
    const navigate = useNavigate();

    /**
     * Use to resize the course shown based on window size
     */

    useEffect(() => {
        const handleResize = () => {
            setCourseShown(calcSceneStart());
            if (courseCards !== null){
                calcCardsShown();
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    /**
     * Call on calcCardsShown when change in courseCards and loading
     */
    useEffect(() => {
        if (!loading){
            calcCardsShown();
        }
    },[courseCards, loading]);

    /**
     * Fetches provides and courses from the backend using an API call.
     */
    useEffect(() => {
        const fetchData = async () => {
            try{
                await new Promise(r => setTimeout(r, 150));
                await Promise.all([
                    fetchProviders(),
                    fetchCourses(),
                ])
                setLoading(false);

            } catch (err) {
                throw new Error("Error fetching course cards: ", err);
            }
        }
        fetchData();
    }, []);

    /**
     * Fetches provides from the backend using an API call.
     */
    async function fetchProviders() {
        try {
            const data = await getProviders();
            const sliced = data.slice(0, 10)
            setProviders(sliced);
        } catch (err) {
            throw new Error("Error fetching providers: ", err);
        }
    }

    /**
     * Smooth things out when resizing.
     */
    useEffect(() => {
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                calcCardsShown();
            }, 150);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [courseCards]);

    /**
     * Fetches all courseCards from the API
     */
    async function fetchCourses() {
        try {
            const data = await AsyncApiRequest("GET", "/courses/courseCard", null)
                .then(response => response.json());
            const courseCards = data.map((courseCard) => new CourseWithPrice(courseCard.course,
                courseCard.minDiscountedPrice, courseCard.closestDate, courseCard.rating, courseCard.numberOfRatings));
            setCourseCards(courseCards);

        } catch (err) {
            throw new Error("Error fetching course cards: ", err);
        }
    }

    /**
     * Calculates the amount of cards that can be shown based on how many fit on screen.
     *
     * @returns {number} The amount of course card that can be shown
     */
    function calcSceneStart() {
        let courseCardsShown;

        if (window.matchMedia("(max-width: 1250px)").matches) {
            courseCardsShown = 2;
        } else if (window.matchMedia("(max-width: 1600px)").matches) {
            courseCardsShown = 3;
        } else if (window.matchMedia("(max-width: 1900px)").matches) {
            courseCardsShown = 4;
        } else if (window.matchMedia("(max-width: 2350px)").matches) {
            courseCardsShown = 5;
        } else if (window.matchMedia("(max-width: 3000px)").matches) {
            courseCardsShown = 5;
        } else {
            courseCardsShown = 6;
        }
        return courseCardsShown;
    }

    /**
     * Calculates the amount of cards that can be shown based on how many fit and how many we have
     */
    function calcCardsShown(){
        const sceneStart = calcSceneStart();
        const adjustedShown = Math.min(sceneStart, courseCards.length || sceneStart);
        setCourseShown(adjustedShown);
        setOverflow(courseCards.length > adjustedShown);

        if (courseIndex > courseCards.length - adjustedShown) {
            setCourseIndex(0);
        }
    }

    /**
     * This function is called when the component mounts.
     * It checks if the user is logged in and updates the UI accordingly.
     */
    useEffect(() => {
        // Check if the user is logged in
        const user = getAuthenticatedUser();
        const signedOutElements = document.querySelectorAll(".index-signed-out");
        const signedInElements = document.querySelectorAll(".index-signed-in");
        if (!user) {
            // Show login and signup buttons
            signedOutElements.forEach(element => element.style.display = "flex");
            signedInElements.forEach(element => element.style.display = "none");
        } else {
            // If logged in, show the logout button and user icon
            signedOutElements.forEach(element => element.style.display = "none");
            signedInElements.forEach(element => element.style.display = "flex");
        }
    }, []);

    /**
     * Different slides in the photo gallery.
     */
    const [slideIndex, setSlideIndex] = useState(0);
    const slides = [
        "home-school",
        "online",
        "person-programming",
        "student-online",
        "teacher-explaining-math",
        "teacher-planning"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const goToSearch = () => {
        navigate("/search");
    }

    const goToAboutUs = () => {
        navigate("/aboutUs");
    }

    return (
        <div id={"index"}>
            <section id="index-hero-section">
                <div id="index-hero">

                    <div id="index-hero-main-box">
                        <div id="index-hero-main-text">
                            <p>
                                Learniverse offers courses that give you the competence you need to succeed in the
                                workplace and beyond!
                            </p>
                        </div>

                        <div className="index-signed-out">
                            <button onClick={() => setShowSignupModal(true)}
                                    className="cta-button index-first-btn">
                                <p>Try for free!</p>
                            </button>
                        </div>
                        <div className="index-signed-in">
                            <button onClick={goToSearch} className="cta-button index-first-btn">
                                <p>Discover our Courses</p>
                            </button>
                        </div>

                    </div>

                    <div id="index-hero-main-image">
                        <img id="index-hero-image" src=" /images/hero_woman_original.png"
                             alt="a person working on a ipad"/>
                    </div>

                </div>
            </section>

            <div id="index-course-background">
                <section id="index-course-content">
                    <div className="title-and-subtitle">
                        <h2 className="section-heading">Preview some of our courses!</h2>
                        <h5 className="section-subheading">
                            At Learniverse Connect, we believe education should be flexible, practical, and inspiring
                        </h5>
                    </div>

                <section id="index-course-cards-section">

                    {overflow ?
                        <section className="index-arrow">
                            <button id="index-arrow-left-btn"
                                    onClick={() =>
                                        setCourseIndex((prevIndex) =>
                                            (prevIndex - 1 + courseCards.length) % courseCards.length)}>
                                <img className="filter-cta" id="index-arrow-icon"
                                     src="/icons/arrow-back-circle-sharp.svg" alt="Arrow Left"/>
                            </button>
                        </section>
                        : null
                    }


                    {loading ?
                        <section id="index-collection-cards">
                            {Array.from({length: courseShown}).map((_, index) => (
                                <CourseCardSkeleton key={index}/>
                            ))}
                        </section>
                        :
                        <section id="index-collection-cards">
                            {(() => {
                                const visibleCards = [];
                                const endIndex = courseIndex + courseShown;

                                if (endIndex <= courseCards.length) {
                                    visibleCards.push(...courseCards.slice(courseIndex, endIndex));
                                } else {
                                    visibleCards.push(...courseCards.slice(courseIndex));
                                    if (overflow) {
                                        visibleCards.push(...courseCards.slice(0, endIndex % courseCards.length));
                                    }
                                }

                                return visibleCards.map((courseCard) => (
                                    <CourseCard key={courseCard.id} {...courseCard} />
                                ));
                            })()}
                        </section>
                    }

                    {overflow ?
                        <section className="index-arrow">
                            <button id="index-arrow-right-btn"
                                    onClick={() => setCourseIndex((prevIndex) =>
                                        (prevIndex + 1 + courseCards.length) % courseCards.length)}>
                                <img className="filter-cta" id="index-arrow-icon" src="/icons/arrow-forward-circle-sharp.svg"
                                     alt="Arrow Right"/>
                            </button>
                        </section>
                        : null
                    }


                </section>
                </section>
            </div>
            <div id="index-collaborators-background">
                <section id="index-collaborators-section">
                    <div className="title-and-subtitle">
                        <h2 className="section-heading">Collaborators</h2>
                        <h5 className="section-subheading">Proud collaborator with over 200+ companies and
                            organizations</h5>
                    </div>
                    {loading ?
                        <div>
                            <Skeleton variant="rectangular" height="15rem" width="100%" />
                        </div>
                        :
                        <div id="index-collaborator-logos">

                            {providers.map((provider) => (
                                <div className="index-logo" id={"index-logo" + provider.id} key={provider.id}>
                                    <img src={provider.logoLink} alt={provider.name}/>
                                </div>
                            ))}
                        </div>
                    }
                </section>
            </div>


            <section id="index-testimonial">
                <div id="index-testimonial_box">
                    <img id="index-testimonial_photo" src="/images/testimonial.jpg" alt="testimonial"/>
                    <div id="index-testimonial_text">
                        <h3>Elena Martinez - Project Coordinator</h3>
                        &nbsp;
                        <p>
                            “Learniverse completely changed how I approach learning. The courses were hands-on,
                            the instructors were engaging, and the flexibility let me fit everything around my
                            full-time job. I earned a certification that helped me land a promotion—worth every
                            minute.”
                        </p>
                    </div>
                </div>
            </section>

            <section id="index-hero2">
                <div id="index-hero2-box">
                    {/* The SVG Background and Pattern is by SVGBackgrounds.com*/}
                    {/* Url: "https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/"*/}

                    <div id="index-slideshow-container">
                        {slides.map((slide, index) => (
                            <div key={index} className="index-mySlides index-fade"
                                 style={{display: index === slideIndex ? "block" : "none"}}>

                                {/*TODO style this and change the size on them*/}
                                <picture>
                                    <source srcSet={"/images/carusel/"+ slide + ".webp"} type="image/webp"/>
                                    <img  height={"200rem"} src={"/images/carusel/" + slide + ".jpg"} alt="carusel image"/>
                                </picture>
                            </div>
                        ))}
                    </div>

                    <div id="index-hero2-textbox">
                        <div>
                            <h3>Learn new skills with Learniverse</h3>
                            <p id="index-hero2-discription"> Join thousands of learners transforming their careers through expert-led online
                                courses. Learniverse helps you grow — anytime, anywhere.</p>
                        </div>
                        <div id="index-hero2-button">
                            <div className="index-signed-out">
                                <button onClick={() => setShowSignupModal(true)} className="cta-button"
                                        id="index-join-for-free">
                                    <img className="filter-white" id="index-join" src=" /icons/person-add-sharp.svg"
                                         alt="Join"/> &nbsp;
                                    <p>Join for free!</p>
                                </button>
                            </div>
                            <div className="index-signed-in">
                                <button onClick={goToAboutUs} className="cta-button index-first-btn">
                                    <p> About us</p>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {
                showSignupModal && createPortal(
                    <Register changeMode={() => {
                        setShowSignupModal(false)
                    }} onClose={() => setShowSignupModal(false)}/>,
                    document.getElementById("auth-modal")
                )
            }
            <div id={"auth-modal"}/>

        </div>

    )
} 