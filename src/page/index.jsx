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

export default function Index() {

    const [showSignupModal, setShowSignupModal] = useState()
    const [courseShown, setCourseShown] = useState(calcSceneStart(0));
    const [courseIndex, setCourseIndex] = useState(0);
    const [courseCards, setCourseCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [providers, setProviders] = useState([]);
    const [overflow, setOverflow] = useState(false);

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
                await new Promise(r => setTimeout(r, 500));
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
     * Different slides in the photo gallery.
     */
    const [slideIndex, setSlideIndex] = useState(0);
    const slides = [
        "https://picsum.photos/480/320?random=1",
        "https://picsum.photos/480/320?random=2",
        "https://picsum.photos/480/320?random=3",
        "https://picsum.photos/480/320?random=4",
        "https://picsum.photos/480/320?random=5",
        "https://picsum.photos/480/320?random=6",
        "https://picsum.photos/480/320?random=7",
        "https://picsum.photos/480/320?random=8",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id={"index"}>
            <section id="index-hero-section">
                <div className="index-hero">

                    <div className="index-hero-main-box">
                        <div className="index-hero-main-text">
                            <p>
                                Learniverse offers courses that give you the competence you need to succeed in the
                                workplace
                                and beyond!
                            </p>
                        </div>
                        <button onClick={() => setShowSignupModal(true)} className="cta-button" id="index-free-btn">
                            <p>Try for free!</p>
                        </button>
                    </div>

                    <div id="index-hero-main-image">
                        <img id="index-hero-image" src=" /images/hero_woman_original.png"
                             alt="a person working on a ipad"/>
                    </div>

                </div>
            </section>

            <div id={"index-course-background"}>
                <section id="index-course-content">
                    <div className="title-and-subtitle">
                        <h2 className="section-heading">Lorem ipsum dolor sit amet</h2>
                        <h3 className="section-subheading">Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut
                            labore et dolore magna aliqua.</h3>
                    </div>

                <section id="index-course-cards-section">

                    {overflow ?
                        <section className="index-arrow">
                            <button id="index-arrow-left-btn"
                                    onClick={() => setCourseIndex((prevIndex) => (prevIndex - 1 + courseCards.length) % courseCards.length)}>
                                <img className={"index-arrow-icon"} src="/icons/arrow-back-circle-sharp.svg"
                                     alt="Arrow Left"/>
                            </button>
                        </section>
                        : null
                    }


                    {loading ?
                        <section id={"index-collection-cards"}>
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
                                <img className={"index-arrow-icon"} src="/icons/arrow-forward-circle-sharp.svg"
                                     alt="Arrow Right"/>
                            </button>
                        </section>
                        : null
                    }


                </section>
                </section>
            </div>
            <div id={"index-collaborators-background"}>
                <section id="index-collaborators-section">
                    <div className="title-and-subtitle">
                        <h2 className="section-heading">Collaborators</h2>
                        <h3 className="section-subheading">Proud collaborator with over 200+ companies and
                            organizations</h3>
                    </div>
                    {loading ?
                        <div className="index-collaborator-logos-skeleton">
                            <Skeleton variant="rectangular" height="15rem" width="100%" />
                        </div>
                        :
                        <div id="index-collaborator-logos">

                            {providers.map((provider) => (
                                <div className={"index-logo"} id={"index-logo" + provider.id} key={provider.id}>
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
                        <h3>Navn Navnesen Namsos</h3>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem
                            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo.</p>
                    </div>
                </div>
            </section>

            <section id="index-hero2">
                <div id="index-hero2-box">
                    {/* The SVG Background and Pattern is by SVGBackgrounds.com*/}
                    {/* Url: "https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/"*/}

                    <div className="index-slideshow-container">
                        {slides.map((slide, index) => (
                            <div key={index} className="index-mySlides index-fade"
                                style={{display: index === slideIndex ? "block" : "none"}}>

                                <img className={"index-slideshow-img"} src={slide} alt={`Slide ${index + 1}`}/>
                            </div>
                        ))}
                    </div>

                    <div id="index-hero2-textbox">
                        <div className="index-hero2-title-subtitle">
                            <h3>Learn new skills with Learniverse</h3>
                            <h6> xx% of learners learn something, which do this and this! Become one of the today</h6>
                        </div>
                        <div id="index-hero2-button">
                            <button onClick={() => setShowSignupModal(true)} className="cta-button"
                                    id="index-join-for-free">
                                <img className="filter-white" id="index-join" src=" /icons/person-add-sharp.svg"
                                     alt="Join"/> &nbsp;
                                <p>Join for free!</p>
                            </button>
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