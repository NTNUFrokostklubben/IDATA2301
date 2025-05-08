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
                        <h5 className="about-hero-text">
                            Welcome to Learniverse Connect, your premier destination for unlocking a world of knowledge
                            and skills through our dynamic online course marketplace!
                        </h5>
                    </div>

                </div>
            </section>


            <section className="about-us-and-our-products">
                <h2 className="blurbTitle">About us and our products</h2>

                <div className="about-us-and-our-products-container">
                    <div className="about-us-and-our-products-grid">

                        <div className="about-section-text-box" id="about-section-text-box-1">
                            <p className="about-section-text">
                                Welcome to Learniverse Connect, your premier destination for unlocking a
                                world of knowledge and skills through our dynamic online course marketplace.
                                At Learniverse, we believe that learning knows no bounds, and our platform
                                is designed to empower individuals like you to embark on a journey of lifelong
                                learning. As a marketplace, we bring together a diverse array of courses
                                from passionate and expert third-party providers, ensuring that you have
                                access to a comprehensive range of subjects and skills to fuel your personal
                                and professional growth.
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
                                Our commitment to quality is unwavering, and we meticulously curate
                                our course offerings to guarantee a premium learning experience.
                                Whether you're a budding entrepreneur looking to master the intricacies
                                of business strategy or someone seeking to delve into the realms of
                                creative arts, Learniverse Connect is your trusted companion on the path
                                to success. Join our vibrant community of learners, connect with top-notch
                                instructors, and explore a rich tapestry of knowledge that awaits you.
                                At Learniverse, we envision a world where learning is not just a destination
                                but a continuous, enriching journey, and we invite you to be a part of this
                                transformative experience. Embrace the future of education with Learniverse
                                Connect - where knowledge meets opportunity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-our-mission">
                <div className="about-our-mission-text-box">
                    <p className="about-our-mission-text">
                        While our courses predominantly take place in the virtual realm, we take pride in
                        providing a unique blend of online learning and real-time engagement. Each course
                        is facilitated by a dedicated physical instructor who not only guides you through
                        the material but also ensures an interactive and dynamic learning experience.
                        To further enrich your educational journey, we offer workshop sessions, adding
                        a hands-on dimension to the online courses.


                    </p> &nbsp;
                    <p className="about-our-mission-text">
                        While these courses are organized at specific dates to accommodate the workshop
                        sessions, we understand the importance of flexibility. Rest assured, our
                        commitment to your convenience is paramount, and the courses are strategically
                        repeated several times a year, offering ample opportunities for you to participate
                        and thrive in your learning pursuits.
                    </p>
                </div>
                <div className="about-our-mission-img-box">
                    <img className="about-our-mission-img" id="img-our-mission"
                         src="/images/undraw_professor_d7zn.svg"
                         alt="Professor teaching"/>
                </div>
            </section>

            <section id="about-feedback-section">
                <h2 id="about-feedback-title">What our students say</h2>

                <div className="about-feedback-main-box">

                    <div className="about-feedback">
                        <p className="about-feedback-quote">“Learniverse Connect completely transformed my career
                            path! I took a digital marketing course and not only earned my certification, but also
                            landed a new job within a month. The instructor was incredibly supportive, and
                            the workshop sessions really helped me apply what I learned. Highly recommend!”
                        </p>
                        <div className="about-feedback-footer">
                            <p className="about-name">Melissa T.</p>
                            <p className="about-job-desc"> Marketing Specialist</p>
                        </div>
                    </div>

                    <div className="about-feedback">
                        <p className="about-feedback-quote"> “The creative writing course I took on Learniverse
                            Connect was a game-changer. It wasn’t just about theory—the live workshops and
                            feedback from the instructor made it feel like a real classroom experience.
                            Now I’m working on my first novel!”
                        </p>
                        <div className="about-feedback-footer">
                            <p className="about-name"> Aisha B.</p>
                            <p className="about-job-desc"> Aspiring Author</p>
                        </div>
                    </div>

                    <div className="about-feedback">
                        <p className="about-feedback-quote">"As someone transitioning into tech from a totally
                            different field, I was nervous. But Learniverse Connect made it easy.
                            The platform’s hands-on workshops and clear certification path helped me build
                            confidence—and real skills. The money-back guarantee gave me peace of mind,
                            though I didn’t need it!"
                        </p>
                        <div className="about-feedback-footer">
                            <p className="about-name"> Jorge R. </p>
                            <p className="about-job-desc"> Junior Web Developer</p>
                        </div>
                    </div>

                    <div className="about-feedback">
                        <p className="about-feedback-quote"> “Learniverse Connect stands out because it
                            actually feels like a community. I’ve taken courses on other platforms,
                            but this one offered real interaction with instructors and peers.
                            I’ve now earned two certifications and plan to take more courses this year!”
                        </p>
                        <div className="about-feedback-footer">
                            <p className="about-name"> Priya M. </p>
                            <p className="about-job-desc"> Freelance Data Analyst </p>
                        </div>

                    </div>
                </div>
            </section>
            <section className="meet-our-team">


            </section>


        </div>
    )
}