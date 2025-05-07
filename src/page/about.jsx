import "./about.css"
export default function About (){

    return(
        <div className="about">
            <section id="about-hero-worker">
                <div className="about-hero-container">
                    <picture id="about-hero-img-box">
                        <source srcSet="/images/businessWoman.png" type="image/png"/>
                        <img width="286" height="419" src="/images/businessWoman.png"
                             alt="a worker working on a computer" id="about-hero-img"/>
                    </picture>
                    <div className={"about-hero-text-box"}>
                        <h6 className="about-hero-text">
                            Welcome to Learniverse Connect, your premier destination for unlocking a world of knowledge
                            and skills through our dynamic online course marketplace!
                        </h6>
                    </div>

                </div>
            </section>


            <section className="about-us-and-our-products">
                <h1 className="blurbTitle">About us and our products</h1>

                <div className="about-us-and-our-products-container">
                    <div className="about-us-and-our-products-grid">

                        <div className="about-section-text-box" id="about-section-text-box-1">
                            <p className="about-section-text">
                                At Learniverse, we believe that learning knows no bounds, and our platform
                                is designed to empower individuals like you to embark on a journey
                                of lifelong learning.
                            </p> &nbsp;
                            <p className="about-section-text">
                                As a marketplace, we bring together a diverse array of courses from
                                passionate and expert third-party providers, ensuring that you have access to a
                                comprehensive
                                range of subjects and skills to fuel your personal and professional growth.
                            </p>
                        </div>

                        <div className="about-section-img-box">
                            <img className="about-section-img" id="about-section-1-img"
                                 src="/images/undraw_online-learning_tgmv.svg" alt="online learning"/>
                        </div>

                        <div className="about-section-img-box">
                            <img className="about-section-img" id="about-section-2-img"
                                 src="/images/undraw_online-test_20lm.svg" alt="online test"/>
                        </div>

                        <div className="about-section-text-box" id="about-section-text-box-2">
                            <p className="about-section-text">
                                Our commitment to quality is unwavering, and we meticulously curate our course offerings
                                to
                                guarantee a premium learning experience. Whether you're a budding entrepreneur looking
                                to
                                master the intricacies of business strategy or someone seeking to delve into the realms
                                of
                                creative arts, Learniverse Connect is your trusted companion on the path to success.
                            </p> &nbsp;
                            <p className="about-section-text">
                                Join our vibrant community of learners, connect with top-notch instructors, and explore
                                a rich tapestry of knowledge that awaits you. At Learniverse, we envision a world
                                where learning is not just a destination but a continuous, enriching journey, and we
                                invite you to be a part of this transformative experience. Embrace the future of
                                education with Learniverse Connect - where knowledge meets opportunity.
                            </p>
                        </div>

                        <div className="about-section-text-box" id="about-section-text-box-3">
                            <p className="about-section-text">
                                At Learniverse Connect, we pride ourselves on offering courses that not only equip you
                                with
                                valuable knowledge and skills but also pave the way for tangible recognition through
                                certifications. Upon successfully completing any course on our platform, you gain the
                                opportunity to take the corresponding certification exam, validating your newfound
                                expertise. We understand the importance of certifications in today's competitive
                                landscape,
                                and that's why we stand behind our courses with a robust money-back guarantee.
                            </p> &nbsp;
                            <p className="about-section-text">
                                If, for
                                any reason, you don't pass the certification exam after diligently completing the
                                course,
                                we ensure a hassle-free refund, underscoring our commitment to your success and
                                confidence
                                in the quality of our educational offerings. Your journey with Learniverse is not just
                                about learning; it's about achieving and celebrating your milestones with the assurance
                                that your investment in education is backed by our unwavering support.
                            </p>
                        </div>
                        <div className="about-section-img-box">
                            <img className="about-section-img" id="about-section-3-img"
                                 src="/images/undraw_certificate_71gt.svg" alt="certification"/>
                        </div>
                        <div className="about-section-img-box">
                            <img className="about-section-img" id="img-section-4"
                                 src="/images/undraw_professor_d7zn.svg"
                                 alt="work time"/>
                        </div>

                        <div className="about-section-text-box" id="about-section-text-box-4">
                            <p className="about-section-text">
                                While our courses predominantly take place in the virtual realm, we take pride in
                                providing a unique blend of online learning and real-time engagement. Each course is
                                facilitated by a dedicated physical instructor who not only guides you through the
                                material but also ensures an interactive and dynamic learning experience.
                            </p> &nbsp;
                            <p className="about-section-text">
                                To further enrich your educational journey, we offer workshop sessions, adding a
                                hands-on
                                dimension to the online courses. While these courses are organized at specific dates
                                to accommodate the workshop sessions, we understand the importance of flexibility.
                                Rest assured, our commitment to your convenience is paramount, and the courses are
                                strategically repeated several times a year, offering ample opportunities
                                for you to participate and thrive in your learning pursuits.
                            </p>
                        </div>
                    </div>
                </div>

            </section>
            <section id="reviews">
                <h2 id="reviewTitle">what our students say</h2>
                <div className="review">

                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe
                        </p></div>
                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe</p></div>
                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe</p></div>
                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe</p></div>
                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe</p></div>
                    <div className="oneRev"><p className="text">"Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod
                        tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris
                        nisi ut aliquip ex ea commodo consequat."</p>
                        <p className="name">- John Doe</p></div>
                </div>
            </section>
            <section id="contacts">
                <h2 id="contactTitle"> Contact us</h2>
                <picture>
                    <img id="gm-picture" src="https://picsum.photos/400/400" alt="contact us"/>
                    <h5>
                        General Manager
                    </h5>
                    <p> Tore Toresen</p>
                    <p> tlf: 32312421</p>
                    <p> epost: Toret@learniverse.no</p>
                </picture>
            </section>
        </div>
    )
}