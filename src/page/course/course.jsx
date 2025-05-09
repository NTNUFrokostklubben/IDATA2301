import {use, useEffect, useState} from "react";
import "./course.css"
import {useNavigate, useParams} from "react-router-dom";
import {AsyncApiRequest} from "../../utils/requests";
import CourseProviderCard from "../../component/courseProviderCard/courseProviderCard";
import {ReviewComponent} from "./reviewSection";
import FavoriteButton from "../../component/favorite/favoriteButton";
import {getAuthenticatedUser} from "../../utils/authentication/authentication";
import {useSelector} from "react-redux";


export default function Course() {
    const [courseData, setCourseData] = useState([]);
    const [uniqueCourses, setUniqueCourses] = useState([]);
    const [ratingData, setRatingData] = useState(0);
    const [user, setUser] = useState(null);
    const [offerableCourseData, setOfferableCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setFavorite] = useState(null);
    const [isFavoriteLoaded, setIsFavoriteLoaded] = useState(false);
    const [keywords, setKeywords] = useState([])
    const [isUserEnrolled, setIsUserEnrolled] = useState(false);
    const {id} = useParams();
    const userData = useSelector((state) => state.data.user)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)

        const fetchData = async () => {
            try {
                await Promise.all([handleUserData(), fetchCourseData()]).then(async () => {
                    try {
                        await Promise.all([fetchOfferableCourses(), fetchKeywords(), fetchRatingData()]);
                        setLoading(false);
                    } catch (e) {
                        console.error(e)
                    }
                })
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()

    }, []);

    const checkUserCourse = async () => {

        const enrolled = AsyncApiRequest("GET", `/userCourses/user/${user.id}/course/${id}`, null)
            .then(response => response.json())
        setIsUserEnrolled(enrolled);
    }

    useEffect(() => {
        if (user === null) return;
        checkFavorite()
    }, [user]);

    useEffect(() => {
        if (isFavorite === null) return;

        setIsFavoriteLoaded(true)
    }, [isFavorite]);

    useEffect(() => {
        if (offerableCourseData === []) return;
        const courseMap = new Map();
        offerableCourseData.forEach(item => {
            const existing = courseMap.get(item.provider.id); // or another field if courseId isn't there
            const currentItemDate = new Date(item.date);

            if (!existing) {
                courseMap.set(item.provider.id, item);
            } else {
                const existingDate = new Date(existing.date);
                if (currentItemDate < existingDate) {
                    courseMap.set(item.provider.id, item);
                }
            }
        });
        setUniqueCourses(Array.from(courseMap.values()));

    }, [offerableCourseData]);


    function handleUserData() {
        setUser(userData)
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
            navigate("/notFound")
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
            throw new Error("Error fetching rating data:", error);
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
                        {user && isFavoriteLoaded && (
                            <div id="course-page-add-favorite"><FavoriteButton uid={user.id} cid={id}
                                                                               isFav={isFavorite}/></div>)}
                        <h2 id="course-splash-title">{courseData.title} </h2>


                        <p id="course-splash-hrw">{courseData.hoursWeek} hours per week
                            • {diffConvert(courseData.diffLevel)} • credits: {courseData.credits}</p>


                        <div id="course-splash-offerability">
                            <p id="course-splash-closest">Closest course
                                session: {new Date(courseData.closestDate).toLocaleDateString("de-DE")}</p>
                            <p id="course-splash-relatedcert">Related certificate: {courseData.relatedCert}</p>
                        </div>

                        <div id="course-splash-avgstars">
                            <img id="course-splash-star" src="/icons/star-sharp.svg" alt={"rating star"}/>
                            <p id="course-splash-rating">{ratingData}</p>
                        </div>

                        <div id="course-splash-keywords">
                            {keywords.map(item => (
                                <p className="course-splash-keyword" key={item.keyword}>{item.keyword}</p>

                            ))}
                        </div>

                    </div>

                    <picture>
                        <div id={"course-image-container"}><img id="course-splash-image" src={courseData.imgLink}
                                                                alt={"image " + courseData.title}/></div>
                    </picture>

                </section>

                <section id="course-description">
                    <h3 id="course-description-heading"> Description</h3>
                    <p id="course-description-text">{courseData.description}</p>
                </section>
                {uniqueCourses?.length > 0 && (
                    <section id="course-offerables">
                        {uniqueCourses.map(item => <CourseProviderCard key={item.id} {...item}/>)}
                    </section>)}
                {user && (
                    <section className={"course-page-reviews"}>
                        <div className={"course-page-review-aggregate"}>
                            <h3> Customer reviews</h3>
                            <ReviewComponent cid={id} averageRating={ratingData} uid={user.id}/>
                        </div>
                        <div className={"course-page-user-reviews"}>
                        </div>

                    </section>)}
            </div>
        </div>
    )
}