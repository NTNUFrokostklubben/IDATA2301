import React, { useState, useEffect } from "react";
import "./Index.css";
import Search from "./search/search";
import {Route} from "react-router-dom";

export default function Index() {

    const [courseShown, setCourseShown] = useState(calcSceneStart());
    const [slideIndex, setSlideIndex] = useState(0);
    const [courseIndex, setCourseIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setCourseShown(calcSceneStart());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    function calcSceneStart() {
        if (window.matchMedia("(max-width: 480px)").matches) {
            return 3;
        } else if (window.matchMedia("(max-width: 1250px)").matches) {
            return 3;
        } else if (window.matchMedia("(max-width: 1600px)").matches) {
            return 4;
        } else if (window.matchMedia("(max-width: 1900px)").matches) {
            return 5;
        } else if (window.matchMedia("(max-width: 2350px)").matches) {
            return 6;
        } else {
            return 7;
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const courses = [
        { id: "index-course1", img: "https://picsum.photos/200/200?random=1", desc: "Course 1", price: "1000 NOK" },
        { id: "index-course2", img: "https://picsum.photos/200/200?random=2", desc: "Course 2", price: "2000 NOK" },
        { id: "index-course3", img: "https://picsum.photos/200/200?random=3", desc: "Course 3", price: "3000 NOK" },
        { id: "index-course4", img: "https://picsum.photos/200/200?random=4", desc: "Course 4", price: "4000 NOK" },
        { id: "index-course5", img: "https://picsum.photos/200/200?random=5", desc: "Course 5", price: "5000 NOK" },
        { id: "index-course6", img: "https://picsum.photos/200/200?random=6", desc: "Course 6", price: "6000 NOK" },
        { id: "index-course7", img: "https://picsum.photos/200/200?random=7", desc: "Course 7", price: "7000 NOK" }
    ];

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

    return (
        <div id={"root"}>
            <section id="index-hero-section">
                <div className="index-hero">

                    <div className="index-hero-main-box">
                        <div className="index-hero-main-text">
                            <h5>
                                Learniverse offers courses that give you the competence you need to succeed in the workplace
                                and beyond!
                            </h5>
                        </div>
                        <button className="cta-button" id="index-free-btn"><p>Try for free!</p></button>
                    </div>

                    <div id="index-hero-main-image">
                        <img id="index-hero-image" src=" /images/hero_woman_original.png"
                             alt="a person working on a ipad"/>
                    </div>

                </div>
            </section>

            <section id="index-course-content">
                <div className="title-and-subtitle">
                    <h2 className="section-heading">Lorem ipsum dolor sit amet</h2>
                    <h5 className="section-subheading">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</h5>
                </div>

                <section id="index-course-cards-section">

                    <section className="index-arrow">
                        <button id="index-arrow-left-btn"
                                onClick={() => setCourseIndex((prevIndex) => (prevIndex - 1 + courses.length) % courses.length)}>
                            <img className={"index-arrow-icon"} src="/icons/arrow-back-circle-sharp.svg" alt="Arrow Left"/>
                        </button>
                    </section>

                    <section id="index-collection-cards">
                        {courses.slice(courseIndex, courseIndex + courseShown - 1).map((course, index) => (
                            <section className="index-card" id={course.id} key={index}>
                                <div className="index-course-card">
                                    <img className="index-course-img" src={course.img} alt=""/>
                                    <h5 className="index-card-desc">{course.desc}</h5>
                                    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.</p>
                                    <p>{course.price}</p>
                                </div>
                            </section>
                        ))}
                        {courseIndex + courseShown - 1 > courses.length && courses.slice(0, (courseIndex + courseShown - 1) % courses.length).map((course, index) => (
                            <section className="index-card" id={course.id} key={index}>
                                <div className="index-course-card">
                                    <img className="index-course-img" src={course.img} alt=""/>
                                    <h5 className="index-card-desc">{course.desc}</h5>
                                    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <p>{course.price}</p>
                                </div>
                            </section>
                        ))}
                    </section>

                    <section className="index-arrow">
                        <button id="index-arrow-right-btn"
                                onClick={() => setCourseIndex((prevIndex) =>
                                                    (prevIndex + 1 + courses.length) % courses.length)}>
                            <img className={"index-arrow-icon"} src="/icons/arrow-forward-circle-sharp.svg"
                                 alt="Arrow Right" style={{ width: "3rem", height: "3rem"}}/>
                        </button>
                    </section>


                </section>
            </section>
            <section id="index-collaborators-section">
                <div className="title-and-subtitle">
                    <h2 className="section-heading">Collaborators</h2>
                    <h5 className="section-subheading">Proud collaborator with over 200+ companies and
                        organizations</h5>
                </div>
                <div id="index-collaborator-logos">

                    <div className="index-logo" id="index-logo1"><img src="https://picsum.photos/250/75?random=1"
                                                                      alt="1"/></div>
                    <div className="index-logo" id="index-logo2"><img src="https://picsum.photos/250/75?random=2"
                                                                      alt="2"/></div>
                    <div className="index-logo" id="index-logo3"><img src="https://picsum.photos/250/75?random=3"
                                                                      alt="3"/></div>
                    <div className="index-logo" id="index-logo4"><img src="https://picsum.photos/250/75?random=4"
                                                                      alt="4"/></div>
                    <div className="index-logo" id="index-logo5"><img src="https://picsum.photos/250/75?random=5"
                                                                      alt="5"/></div>
                    <div className="index-logo" id="index-logo6"><img src="https://picsum.photos/250/75?random=6"
                                                                      alt="6"/></div>
                    <div className="index-logo" id="index-logo7"><img src="https://picsum.photos/250/75?random=7"
                                                                      alt="7"/></div>
                    <div className="index-logo" id="index-logo8"><img src="https://picsum.photos/250/75?random=8"
                                                                      alt="8"/></div>
                    <div className="index-logo-two" id="index-logo-9-10">
                        <div className="index-logo-two-img" id="index-logo9">
                            <img src="https://picsum.photos/75/75?random=9" alt="9"/>
                        </div>
                        <div className="index-logo-two-img" id="index-logo10">
                            <img src="https://picsum.photos/75/75?random=10" alt="10"/>
                        </div>
                    </div>
                    <div className="index-logo-two" id="index-logo-11-12">
                        <div className="index-logo-two-img" id="index-logo11">
                            <img src="https://picsum.photos/75/75?random=11" alt="11"/>
                        </div>
                        <div className="index-logo-two-img" id="index-logo12">
                            <img src="https://picsum.photos/75/75?random=12" alt="12"/>
                        </div>
                    </div>
                </div>
            </section>

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


                    {/*Slideshow container */}
                    <div className="index-slideshow-container">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className="index-mySlides index-fade"
                                style={{ display: index === slideIndex ? "block" : "none" }}
                            >
                                <img className={"index-slideshow-img"} src={slide} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div id="index-hero2-textbox">
                        <div className={"index-hero2-title-subtitle"}>
                            <h3>Learn new skills with Learniverse</h3>
                            <h6> xx% of learners learn something, which do this and this! Become one of the today</h6>
                        </div>
                        <div id="index-hero2-button">
                            <button className="cta-button" id="index-join-for-free">
                                <img className="filter-white" id="index-join" src=" /icons/person-add-sharp.svg"
                                     alt="Join"/> &nbsp;
                                <p>Join for free!</p>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <h1>Temporary links to pages</h1>
            <ul>
                <li><a href={"/search"}>search/filters</a></li>
                <li><a href={"/admin"}>Admin</a></li>
            </ul>
        </div>
    )
} 