import "./userPage.css"
import { useEffect, useState } from 'react';
import CardHorizontal from "../component/card/cardHorizontal";
import Rating from "../component/Rating/rating";

export default function UserPage (){
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    let [ratings, setRatings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/userCourses/1')
            .then(response => response.json())
            .then(data => {
                setData(data)
                setRatings(data.filter(item => item.rating > 0));
                setLoading(false)
            })
            .catch(err => console.error('Error fetching data:', err));
        }, []
    );

    useEffect(() => {
        fetch('http://localhost:8080/api/user/1')
            .then(response => response.json())
            .then(user => {
                setUser(user)
        }).catch(err => console.error('Error fetching data:', err))
        }, []
    );
    if (loading ){
        return (<h1>loading</h1>)
    }
    console.log(ratings)
    return (
        <div class={"user-page"}>
            <section id="user-page-content">
                <section id="user-page-caret">
                    <a href=""><img id="edit" src="/icons/pencil-sharp.svg" alt="edit button"/></a>
                    <div id="user-caret">

                        <picture>
                            <img id="user-image" src={user.profilePicture} alt="user"/>
                        </picture>
                        <p id="user-name">
                            User1
                        </p>

                    </div>
                </section>

                <section id="user-courses">
                    <h5 id="previous-courses-heading">Previous courses</h5>
                    <ul>
                        {data.map(item => (
                            <li className="user-course-item" key={item.id}> <a href="">{item.course.title}</a></li>
                            ))}
                    </ul>
                </section>

                <section className="users-reviews">
                    <h5 id={"review-heading"} >Your reviews</h5>

                    {ratings.map(item => <Rating key={item.id} {...item}/>)}

                </section>

                <section id="users-favorites">
                    <h5 id={"favorites-heading"}>Favorites</h5>

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
        </div>

    )
}