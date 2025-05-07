import "./userPage.css"
import { useEffect, useState } from 'react';
import CardHorizontal from "../component/card/cardHorizontal";
import Review from "../component/Rating/review";
import {AsyncApiRequest} from "../utils/requests";
import {Link, useParams} from "react-router-dom";
import FavoriteCard from "../component/favoriteCard/favoriteCard";
import {getAuthenticatedUser} from "../utils/authentication/authentication";

export default function UserPage (){
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState(null );
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect( () => {

        const fetchData = async () =>{
            try {
                await Promise.all([handleUserData()])
                setLoading(false)
            }catch (e){console.log(e)}
        }
        fetchData()
        } , []
    );

    useEffect(() => {
        if (!user) return;  // Don't fetch unless user is set

        async function handleCourseData() {
            try {
                const courseData = await AsyncApiRequest("GET", `/userCourses/${user.id}`, null)
                    .then(response => response.json())

                const filteredAndSorted = courseData
                    .filter(item => item.review?.rating > 0)
                    .sort((a, b) => b.review.rating - a.review.rating);

                setCourses(courseData)
                setRatings(filteredAndSorted)
            }catch (e){console.error(e)}
        }

        async function handleFavoritesData() {
            try {
                const favoritesData = await AsyncApiRequest("GET", `/userFavorites/${user.id}`, null)
                    .then(response => response.json())
                setFavorites(favoritesData)
            }catch (e){console.error(e)}
        }

        if (loading ){
            return (<h5>loading...</h5>)
        }

        handleFavoritesData();
        handleCourseData();
    }, [user]);


    async function handleUserData() {
        try {
           let tempUser = getAuthenticatedUser()

            const tempApiCall = `/UserByEmail/${tempUser.email}`;
            const userData = await AsyncApiRequest("GET", tempApiCall, null)
                .then(response => response.json())
            setUser(userData)
        }catch (e){console.error(e)}
    }
    return (


        <div className="user-page">
            {user && (
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

                <section id="user-page-user-courses">
                    <h5 id="previous-courses-heading">Previous courses</h5>
                    <ul>
                        {courses.map(item => (
                            <li className="user-course-item" key={item.id}> <Link className={"user-page-course-hotlink"} to={`/course/${item.course.id}`}>{item.course.title}</Link></li>
                            ))}
                    </ul>
                </section>

                <section className="users-reviews">
                    <h5 id={"review-heading"} >Your reviews</h5>

                    {ratings.map(item => <Review key={item.id} rating={item} title={true}/>)}

                </section>

                <section id="users-favorites">
                    <h5 id={"favorites-heading"}>Favorites</h5>

                    {favorites.map(item => <FavoriteCard key={item.id} {...item.course}/>)}

                </section>
            </section>)}
        </div>

    )
}