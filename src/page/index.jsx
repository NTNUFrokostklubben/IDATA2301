
import "./Index.css";

export default function Index() {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex-1].style.display = "block";
        setTimeout(showSlides, 6000); // Change image every 2 seconds
    }

    return (
        <div id={"root"}>
            <section id="Hero">
                <div className="heroMainPage">

                    <div className="hero-main-box">
                        <div className="heroMainText">
                            Learniverse offers courses that give you the competence you need to succeed in the workplace
                            and beyond!
                        </div>
                        <button className="cta-button" id="free-btn">Try for free!</button>
                    </div>

                    <div id="hero-main-image">
                        <img id="hero-image" src=" /images/hero_woman_original.png"
                             alt="a person working on a ipad"/>
                    </div>

                </div>
            </section>

            <section id="course-content">
                <div className="title-and-subtitle">
                    <h2 className="section-heading">Lorem ipsum dolor sit amet</h2>
                    <h5 className="section-subheading">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</h5>
                </div>

                <section id="course-cards-section">

                    <section className="arrow">
                        <button id="arrow-left-btn">
                            <img id="arrow-left-icon" width="40" height="40"
                                 src=" /icons/arrow-back-circle-sharp.svg" alt="Arrow Left"/>
                        </button>
                    </section>

                    <section id="collection-cards">

                        <section className="card" id="course1">
                            <div className="course-card">
                                <img className="course-img" src="https://picsum.photos/320/200?random=1" alt=""/>
                                <h5 className="card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="card" id="course2">
                            <div className="course-card">
                                <img className="course-img" src="https://picsum.photos/320/200?random=2" alt=""/>
                                <h5 className="card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="card" id="course3">
                            <div className="course-card">
                                <img className="course-img" src="https://picsum.photos/320/200?random=3" alt=""/>
                                <h5 className="card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="card" id="course4">
                            <div className="course-card">
                                <img className="course-img" src="https://picsum.photos/320/200?random=4" alt=""/>
                                <h5 className="card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="card" id="course5">
                            <div className="course-card">
                                <img className="course-img" src="https://picsum.photos/320/200?random=5" alt=""/>
                                <h5 className="card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="card" id="course6">
                            <div className="course-card">
                                <img className="course-img" src="https://picsum.photos/320/200?random=6" alt=""/>
                                <h5 className="card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                        <section className="card" id="course7">
                            <div className="course-card">
                                <img className="course-img" src="https://picsum.photos/320/200?random=7" alt=""/>
                                <h5 className="card-desc">Sed ut perspiciatis unde omnis iste natus </h5>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.</p>
                                <p><b>14 00 NOK</b></p>
                            </div>
                        </section>

                    </section>

                    <section className="arrow">
                        <button id="arrow-right-btn">
                            <img id="arrow-right-icon" width="40" height="40"
                                 src=" /icons/arrow-forward-circle-sharp.svg" alt="Arrow Right"/>
                        </button>
                    </section>

                </section>
            </section>
            <section id="collaborators-section">
                <div className="title-and-subtitle">
                    <h2 className="section-heading">Collaborators</h2>
                    <h5 className="section-subheading">Proud collaborator with over 200+ companies and
                        organizations</h5>
                </div>
                <div id="collaborator-logos">
                    <div className="logo" id="logo1"><img src="https://picsum.photos/250/75?random=1" alt="1"/></div>
                    <div className="logo" id="logo2"><img src="https://picsum.photos/250/75?random=2" alt="2"/></div>
                    <div className="logo" id="logo3"><img src="https://picsum.photos/250/75?random=3" alt="3"/></div>
                    <div className="logo" id="logo4"><img src="https://picsum.photos/250/75?random=4" alt="4"/></div>
                    <div className="logo" id="logo5"><img src="https://picsum.photos/250/75?random=5" alt="5"/></div>
                    <div className="logo" id="logo6"><img src="https://picsum.photos/250/75?random=6" alt="6"/></div>
                    <div className="logo" id="logo7"><img src="https://picsum.photos/250/75?random=7" alt="7"/></div>
                    <div className="logo" id="logo8"><img src="https://picsum.photos/250/75?random=8" alt="8"/></div>
                    <div className="logo" id="logo9"><img src="https://picsum.photos/75/75?random=9" alt="9"/></div>
                    <div className="logo" id="logo10"><img src="https://picsum.photos/75/75?random=10" alt="10"/></div>
                    <div className="logo" id="logo11"><img src="https://picsum.photos/75/75?random=11" alt="11"/></div>
                    <div className="logo" id="logo12"><img src="https://picsum.photos/75/75?random=12" alt="12"/></div>
                </div>
            </section>

            <section id="testimonial">
                <div id="testimonial_box">
                    <img id="testimonial_photo" src=" /images/testimonial.jpg" alt="testimonial"/>
                    <div id="testimonial_text">
                        <h3>Navn Navnesen Namsos</h3>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem
                            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo.</p>
                    </div>
                </div>
            </section>

            <section id="hero2">
                <div id="hero2-box">
                      {/* The SVG Background and Pattern is by SVGBackgrounds.com*/}
                      {/* Url: "https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/"*/}


                    {/*Slideshow container */}
                    <div className="slideshow-container">

                        {/*Full-width images with number and caption text*/}
                        <div className="mySlides fade">
                            <img id="start" src="https://picsum.photos/200/200?random=1"/>
                        </div>

                        <div className="mySlides fade">
                            <img src="https://picsum.photos/200/200?random=2"/>
                        </div>

                        <div className="mySlides fade">
                            <img src="https://picsum.photos/200/200?random=3"/>
                        </div>
                    </div>


                    <div id="hero2_textbox">
                        <h3>Learn new skills with Learniverse</h3>
                        <p>xx% of learners learn something, which do this and this! Become one of the today</p>
                        <div id="hero2_button">
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