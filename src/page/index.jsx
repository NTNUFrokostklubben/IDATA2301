import React, { useState, useEffect } from "react";
import "./Index.css";
import Search from "./search/search";
import {Route} from "react-router-dom";

export default function Index() {

    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const slides = [
        "https://picsum.photos/200/200?random=1",
        "https://picsum.photos/200/200?random=2",
        "https://picsum.photos/200/200?random=3"
    ];

    return (
        <div id={"root"}>
            <section id="index-hero-section">
                <div className="index-hero">

                    <div className="index-hero-main-box">
                        <div className="index-hero-main-text">
                            <h5>Learniverse offers courses that give you the competence you need to succeed in the workplace
                                and beyond! </h5>
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
                        <button id="index-arrow-left-btn">
                            <img id="index-arrow-left-icon" width="40" height="40"
                                 src=" /icons/arrow-back-circle-sharp.svg" alt="Arrow Left"/>
                        </button>
                    </section>

                    <section id="index-collection-cards">

                        <section className="index-card" id="index-course1">
                            <div className="index-course-card">
                                <img className="index-course-img" src="https://picsum.photos/320/200?random=1" alt=""/>
                                <h5 className="index-card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="index-card" id="index-course2">
                            <div className="index-course-card">
                                <img className="index-course-img" src="https://picsum.photos/320/200?random=2" alt=""/>
                                <h5 className="index-card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="index-card" id="index-course3">
                            <div className="index-course-card">
                                <img className="index-course-img" src="https://picsum.photos/320/200?random=3" alt=""/>
                                <h5 className="index-card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="index-card" id="index-course4">
                            <div className="index-course-card">
                                <img className="index-course-img" src="https://picsum.photos/320/200?random=4" alt=""/>
                                <h5 className="index-card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="index-card" id="index-course5">
                            <div className="index-course-card">
                                <img className="index-course-img" src="https://picsum.photos/320/200?random=5" alt=""/>
                                <h5 className="index-card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="index-card" id="index-course6">
                            <div className="index-course-card">
                                <img className="index-course-img" src="https://picsum.photos/320/200?random=6" alt=""/>
                                <h5 className="index-card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="index-card" id="index-course7">
                            <div className="index-course-card">
                                <img className="index-course-img" src="https://picsum.photos/320/200?random=7" alt=""/>
                                <h5 className="index-card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                    </section>

                    <section className="index-arrow">
                        <button id="index-arrow-right-btn">
                            <img id="index-arrow-right-icon" width="40" height="40"
                                 src="/icons/arrow-forward-circle-sharp.svg" alt="Arrow Right"/>
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

                    <div className="index-logo" id="index-logo1"><img src="https://picsum.photos/250/75?random=1" alt="1"/></div>
                    <div className="index-logo" id="index-logo2"><img src="https://picsum.photos/250/75?random=2" alt="2"/></div>
                    <div className="index-logo" id="index-logo3"><img src="https://picsum.photos/250/75?random=3" alt="3"/></div>
                    <div className="index-logo" id="index-logo4"><img src="https://picsum.photos/250/75?random=4" alt="4"/></div>
                    <div className="index-logo" id="index-logo5"><img src="https://picsum.photos/250/75?random=5" alt="5"/></div>
                    <div className="index-logo" id="index-logo6"><img src="https://picsum.photos/250/75?random=6" alt="6"/></div>
                    <div className="index-logo" id="index-logo7"><img src="https://picsum.photos/250/75?random=7" alt="7"/></div>
                    <div className="index-logo" id="index-logo8"><img src="https://picsum.photos/250/75?random=8" alt="8"/></div>
                    <div className="index-logo" id="index-logo9"><img src="https://picsum.photos/75/75?random=9" alt="9"/></div>
                    <div className="index-logo" id="index-logo10"><img src="https://picsum.photos/75/75?random=10" alt="10"/></div>
                    <div className="index-logo" id="index-logo11"><img src="https://picsum.photos/75/75?random=11" alt="11"/></div>
                    <div className="index-logo" id="index-logo12"><img src="https://picsum.photos/75/75?random=12" alt="12"/></div>
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
                                <img src={slide} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </div>


                    <div id="index-hero2_textbox">
                        <h3>Learn new skills with Learniverse</h3>
                        <p>xx% of learners learn something, which do this and this! Become one of the today</p>
                        <div id="index-hero2_button">
                            <button className="cta-button"><img className="filter-white" width="15" height="15"
                                                                src=" /icons/person-add-sharp.svg"/> Join for
                                free!
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