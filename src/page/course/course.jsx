import {use, useEffect, useState} from "react";
import "./course.css"
import {useParams} from "react-router-dom";
import {AsyncApiRequest} from "../../utils/requests";
import CourseProviderCard from "../../component/courseProviderCard/courseProviderCard";
import {ReviewComponent} from "./reviewSection";
import FavoriteButton from "../../component/favorite/favoriteButton";
import {getAuthenticatedUser} from "../../utils/authentication/authentication";


export default function Course() {
    const [courseData, setCourseData] = useState([]);
    const [ratingData, setRatingData] = useState(0);
    const [user, setUser] = useState(null);
    const [offerableCourseData, setOfferableCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setFavorite] = useState(false);
    const [keywords, setKeywords] = useState([])
    const [isUserEnrolled, setIsUserEnrolled] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true)

        const fetchData = async () => {
            try {
                await Promise.all([handleUserData(), fetchCourseData()]).then(async () => {
                    try {
                        await Promise.all([ fetchOfferableCourses(), fetchKeywords(), fetchRatingData()])
                    }catch (e) {
                        console.error(e)
                    }
                })
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
        setLoading(false)
    }, []);

    const checkUserCourse = async () =>{

        const enrolled = AsyncApiRequest("GET", `/userCourses/user/${user.id}/course/${id}`, null)
            .then(response => response.json())
        setIsUserEnrolled(enrolled);
    }

    useEffect(() => {
        if (user === null) return;
        checkFavorite()
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
    /**
     * Fetches all course data from the API
     */
    async function fetchCourseData() {
        try {
            const fetchApiCall = `/course/${id}`;
            const data = await AsyncApiRequest("GET", fetchApiCall, null)
                .then(response => response.json());
            setCourseData(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
    }

    /**
     * Fetches all offerable course data from the API
     */
    async function fetchOfferableCourses() {
        try {
            const fetchApiCall = `/offerableCourses/course/${id}`;
            const data = await AsyncApiRequest("GET", fetchApiCall, null)
                .then(response => response.json());
            setOfferableCourseData(data);
        } catch (error) {
            console.error("Error fetching offerable course data:", error);
        }
    }

    /**
     * Fetches all rating from the API
     */
    async function fetchRatingData() {
        try {
            const fetchApiCall = `/userCourses/averageRating/${id}`;
            const data = await AsyncApiRequest("GET", fetchApiCall, null)
                .then(response => response.json());
            setRatingData(Math.round(data * 10) / 10);

        } catch (error) {
            console.error("Error fetching rating value:", error);
        }
    }

    /**
     * Fetches all keywords from the API
     */
    async function fetchKeywords() {
        try {
            const fetchApiCall = `/keyword/${id}`;
            const data = await AsyncApiRequest("GET", fetchApiCall, null)
                .then(response => response.json());
            setKeywords(data);

        } catch (error) {
            console.error("Error fetching keywords:", error);
        }
    }

    async function checkFavorite() {
        try {
            const favoriteState = await AsyncApiRequest("GET", `/isFavorited/${user.id}/${id}`, false)
                .then(response => response.json())
            setFavorite(favoriteState)

        } catch (error) {
            console.error("Error fetching keywords:", error);
        }
    }

    function diffConvert(diff) {
        let value;
        switch (diff) {
            case 1:
                value = "Beginner"
                break;
            case 2:
                value = "Intermediate"
                break;
            case 3:
                value = "Expert"
                break;
        }
        return value;
    }

    if (loading) {
        return (<h1>loading</h1>)
    }
    return (
        <div className="course-page">
            <div className="course-page-content">
                <section id="course-splash">

                    <div id="course-splash-right-side">
                        {user && (
                        <div id="course-page-add-favorite"><FavoriteButton uid={user.id} cid={id} isFav={isFavorite}/></div>)}
                        <h4 id="course-splash-title">{courseData.title} </h4>

                        <div id="course-splash-details">

                            <p id="course-splash-hrw">{courseData.hoursWeek} hours per week</p>
                            <img className="course-splash-details-spacing"
                                 src="/icons/ellipsis-horizontal-circle-sharp.svg"/>

                            <p id="course-splash-diff">{diffConvert(courseData.diffLevel)}</p>
                            <img className="course-splash-details-spacing"
                                 src="/icons/ellipsis-horizontal-circle-sharp.svg"/>

                            <p id="course-splash-credits">credits: {courseData.credits}</p>
                        </div>

                        <div id="course-splash-offerability">
                            <p id="course-splash-closest">Closest course
                                session: {new Date(courseData.closestCourse).toLocaleDateString()}</p>
                            <p id="course-splash-relatedcert">Related certificate: {courseData.relatedCert}</p>
                        </div>

                        <div id="course-splash-avgstars">
                            <img id="course-splash-star" src="/icons/star-sharp.svg" alt={"rating star"}/>
                            <p id="course-splash-rating">{ratingData}</p>
                        </div>

                        <div id="course-splash-keywords">
                            {keywords.map(item => (
                                <p className="course-splash-keyword">{item.keyword}</p>

                            ))}
                        </div>

                    </div>

                    <picture>
                        <img id="course-splash-image" src={courseData.imgLink} alt={"course image"}/>
                    </picture>

                </section>

                <section id="course-description">
                    <h4 id="course-description-heading"> Description</h4>
                    <p id="course-description-text">{courseData.description}</p>
                </section>

                <section id="course-offerables">
                    {offerableCourseData.map(item => <CourseProviderCard key={item.id} {...item}/>)}
                </section>
                {user && (
                <section className={"course-page-reviews"}>
                    <div className={"course-page-review-aggregate"}>
                        <h5> Customer reviews</h5>
                        <ReviewComponent cid={id} averageRating={ratingData} uid={user.id}/>
                    </div>
                    <div className={"course-page-user-reviews"}>
                    </div>

                </section>)}
            </div>
        </div>
    )
}