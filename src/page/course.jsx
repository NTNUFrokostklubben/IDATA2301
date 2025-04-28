import {use, useEffect, useState} from "react";
import "./course.css"
import Rating from "../component/Rating/rating";
import CourseProviderCard from "../component/courseProviderCard/courseProviderCard";
import {useParams} from "react-router-dom";
import {AsyncApiRequest} from "../utils/requests";

export default function Course() {
    const [courseData, setCourseData] = useState([]);
    const [ratingData, setRatingData] = useState();
    const [offerableCourseData, setofferableCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keywords, setKeywords] = useState([])
    const {id} = useParams();


    useEffect(() =>{
        if (courseData.length === 0){
            fetchCourseData();
        }
        if (offerableCourseData.length === 0){
            fetchOfferableCourses();
        }
        if (!ratingData) {
            fetchRatingData();
        }
        if (keywords.length === 0){
            fetchKeywords();
        }
    });

    /**
     * Fetches all course data from the API
     */
    async function fetchCourseData() {
        try {
            const fetchApiCall = `/course/${id}`;
            const data = await AsyncApiRequest("GET", fetchApiCall, null);
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
            const data = await AsyncApiRequest("GET", fetchApiCall, null);
            setofferableCourseData(data);
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
            const data = await AsyncApiRequest("GET", fetchApiCall, null);
            setRatingData(data);
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
            const data = await AsyncApiRequest("GET", fetchApiCall, null);
            setKeywords(data);
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

            <section id="course-splash">

                <div id="course-splash-right-side">

                    <h4 id="course-splash-title">{courseData.title}</h4>

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
                        <p id="course-splash-closest">Closest course session: {new Date(courseData.closestCourse).toLocaleDateString()}</p>
                        <p id="course-splash-relatedcert">Related certificate: {courseData.relatedCert}</p>
                    </div>

                    <div id="course-splash-avgstars">
                        <img id="course-splash-star" src="/icons/star-sharp.svg" alt={"rating star"}/>
                        <p id="course-splash-rating">{ratingData}</p>
                    </div>

                    <div id="course-splash-keywords">
                        {keywords.map( item => (
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

        </div>
    )
}