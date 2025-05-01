import {use, useEffect, useState} from "react";
import "./course.css"
import Rating from "../component/Rating/rating";
import CourseProviderCard from "../component/courseProviderCard/courseProviderCard";
import {useParams} from "react-router-dom";
import {AsyncApiRequest} from "../utils/requests";
import FavoriteButton from "../component/favorite/favoriteButton";

export function ReviewComponent({cid, averageRating}) {
    const [ratingData, setRatingData] = useState(null);
    const [halfStar, setHalfStar] = useState(false)
    const [loading, setLoading] = useState(true);
    const [stars, setStars] = useState([]);
    const [oneStarBar, setOneStarBar] = useState(0);
    const [twoStarBar, setTwoStarBar] = useState(0);
    const [threeStarBar, setThreeStarBar] = useState(0);
    const [fourStarBar, setFourStarBar] = useState(0);
    const [fiveStarBar, setFiveStarBar] = useState(0);

    const fetchData = async () => {
        if(averageRating !== undefined) {
            console.log(averageRating)
            if (!Number.isInteger(averageRating)) {
                setHalfStar(true)
            }
            setStars(Array(Math.floor(averageRating)).fill(0))
        }
    }
    const fetchRatingArray = async () => {
        const data = await AsyncApiRequest("GET", `/userCourses/course/${cid}`, null)
            .then( response  => response.json());
        const filteredAndSorted = data
            .filter(item => item.review?.rating > 0)
            .sort((a, b) => b.review.rating - a.review.rating);

        setRatingData(filteredAndSorted)
        calculateStarDistribution(data.map(item => item.review.rating));

    }
    const fetching = async () => {
        try {
            await Promise.all([fetchData(), fetchRatingArray()])
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        setLoading(true);
        fetching()

        console.log("finished loading")
        setLoading(false);
    }, [averageRating]);


    const calculateStarDistribution = (ratings) => {
        const starCounts = [0, 0, 0, 0, 0]; // For 1-5 stars

        ratings.forEach(rating => {
            const starIndex = Math.floor(rating) - 1;
            if (starIndex >= 0 && starIndex < 5) {
                starCounts[starIndex]++;
            }
        });
        setOneStarBar((starCounts[0] / 5) * 100);
        setTwoStarBar((starCounts[1] / 5) * 100);
        setThreeStarBar((starCounts[2] / 5) * 100);
        setFourStarBar((starCounts[3] / 5) * 100);
        setFiveStarBar((starCounts[4] / 5) * 100);
    }

    if (loading) {
        return (<h5>loading...</h5>)
    }

    return (
        <div className={"course-page-review-component"}>
            <div className={"course-page-review-component-left"}>
                {stars !== [] && (
                <div className={"review-component-aggregate-stars"}>
                     {
                        stars.map(() =>
                            <img className="review-component-star" src="/icons/star-sharp.svg" alt="review star"/>
                        )
                    } {halfStar && (
                    <img
                        className="review-component-star"
                        src="/icons/star-half-sharp.svg"
                        alt="half star"
                    />
                )}
                    <p className={"review-component-average-rating"}>
                        {averageRating} out of 5
                    </p>
                </div>)}
                <div className={"course-page-reviews-rating-bars"}>
                    <div className={"course-page-review-component-text-and-bar"}>
                        <p className={"course-page-review-component-bar-text"}>5 star</p>
                        <div className={"course-page-reviews-rating-bar-unit"}>
                            <div className={"reviews-rating-bar-star"} style={{width: `${fiveStarBar}%`}}></div>
                        </div>
                    </div>

                    <div className={"course-page-review-component-text-and-bar"}>
                        <p className={"course-page-review-component-bar-text"}>4 star</p>
                        <div className={"course-page-reviews-rating-bar-unit"}>
                            <div className={"reviews-rating-bar-star"} style={{width: `${fourStarBar}%`}}></div>
                        </div>
                    </div>
                    <div className={"course-page-review-component-text-and-bar"}>
                        <p className={"course-page-review-component-bar-text"}>3 star</p>
                        <div className={"course-page-reviews-rating-bar-unit"}>
                            <div className={"reviews-rating-bar-star"} style={{width: `${threeStarBar}%`}}></div>
                        </div>
                    </div>
                    <div className={"course-page-review-component-text-and-bar"}>
                        <p className={"course-page-review-component-bar-text"}>2 star</p>
                        <div className={"course-page-reviews-rating-bar-unit"}>
                            <div className={"reviews-rating-bar-star"} style={{width: `${twoStarBar}%`}}></div>
                        </div>
                    </div>
                    <div className={"course-page-review-component-text-and-bar"}>
                        <p className={"course-page-review-component-bar-text"}>1 star</p>
                        <div className={"course-page-reviews-rating-bar-unit"}>
                            <div className={"reviews-rating-bar-star"} style={{width: `${oneStarBar}%`}}></div>
                        </div>
                    </div>

                </div>
            </div>


            {ratingData !== null && ( <div className={"course-page-review-component-right"}>
                {
                    ratingData.map(item => <Rating key={item.id} rating={item} title={false}/>)

                }
            </div>)}
        </div>
    )
}

export default function Course() {
    const [courseData, setCourseData] = useState([]);
    const [ratingData, setRatingData] = useState();
    const [offerableCourseData, setOfferableCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setFavorite] = useState(false);
    const [keywords, setKeywords] = useState([])
    const {id} = useParams();

    useEffect(() => {
        setLoading(true)

        const fetchData = async () => {
            try {
                await Promise.all([fetchCourseData(), fetchOfferableCourses(), fetchKeywords(), fetchRatingData(),
                    checkFavorite()])
            } catch (e) {
                console.error(e)
            }
        }
        fetchData()
        setLoading(false)
    }, []);

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
            const favoriteState = await AsyncApiRequest("GET", `/isFavorited/${1}/${id}`, false)
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
                        <div id="course-page-add-favorite"><FavoriteButton uid={1} cid={id} isFav={isFavorite}/></div>
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
                <section className={"course-page-reviews"}>
                    <div className={"course-page-review-aggregate"}>
                        <h5> Customer reviews</h5>
                        <ReviewComponent cid={id} averageRating={ratingData}/>
                    </div>
                    <div className={"course-page-user-reviews"}>
                    </div>

                </section>
            </div>
        </div>
    )
}