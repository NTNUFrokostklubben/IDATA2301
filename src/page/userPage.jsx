import "./userPage.css"
export default function UserPage (){

    return(
        <div>
            <body class={"user-page"}>
            
            <section id="content">
                <section id="user-caret">
                    <a href=""><img id="edit" src="/icons/pencil-sharp.svg" alt="edit button"/></a>
                    <div id="caret">

                        <picture id="user_image">
                            <img id="image" src="https://picsum.photos/150/150" alt="user"/>
                        </picture>
                        <p id="user_name">
                            User1
                        </p>

                    </div>
                </section>

                <section id="user_courses">
                    <h1 id="courses-heading">Previous courses</h1>
                    <ul>
                        <li><a href="">Introduction to SQL Essentials</a></li>
                        <li><a href="">Introduction to SQL Essentials</a></li>
                        <li><a href="">Introduction to SQL Essentials</a></li>
                        <li><a href="">Introduction to SQL Essentials</a></li>
                    </ul>
                </section>

                <section id="users_reviews">
                    <h1 id="review-heading">Your reviews</h1>

                    <div className="one-review">
                        <h2 className="review-title">Introduction to SQL Essentials</h2>
                        <div className="user-review-section">
                            <picture>
                                <img className="user-review-image" src="https://picsum.photos/40/40" alt="user"/>
                            </picture>
                            <p className="user-name-review">user1</p>
                            <div className="stars">
                                <img className="star" src="/icons/star-sharp.svg" alt="review star"/>
                                <img className="star" src="/icons/star-sharp.svg" alt="review star"/>
                                <img className="star" src="/icons/star-sharp.svg" alt="review star"/>
                                <img className="star" src="/icons/star-half-sharp.svg" alt="review star"/>
                            </div>
                            <p className="review-date">Reviewed on January 1, 2025 </p>
                        </div>
                        <p className="review-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.
                            Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                    <div className="one-review">
                        <h2 className="review-title">Introduction to SQL Essentials</h2>
                        <div className="user-review-section">
                            <picture>
                                <img className="user-review-image" src="https://picsum.photos/40/40" alt="user"/>
                            </picture>
                            <p className="user-name-review">user1</p>

                            <div className="stars">
                                <img className="star" src="/icons/star-sharp.svg" alt="review star"/>
                                <img className="star" src="/icons/star-sharp.svg" alt="review star"/>
                                <img className="star" src="/icons/star-sharp.svg" alt="review star"/>
                                <img className="star" src="/icons/star-half-sharp.svg" alt="review star"/>
                            </div>
                            <p className="review-date">Reviewed on January 1, 2025 </p>
                        </div>
                        <p className="review-text">"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.
                            Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>

                </section>

                <section id="users_favorites">
                    <h1 id="favorites-heading">Favorites</h1>

                    <div className="one-favorite">
                        <h2 className="favorite-course-title">Introduction to SQL Essentials</h2>
                        <div className="favorite-image-and-text">
                            <img className="favorite-course-image" src="https://picsum.photos/150/75" alt="user"/>
                            <p className="favorite-course-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>

                    <div className="one-favorite">
                        <h2 className="favorite-course-title">Introduction to SQL Essentials</h2>
                        <div className="favorite-image-and-text">
                            <img className="favorite-course-image" src="https://picsum.photos/150/75" alt="user"/>
                            <p className="favorite-course-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi
                                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>

                </section>
            </section>
            </body>
        </div>

    )
}