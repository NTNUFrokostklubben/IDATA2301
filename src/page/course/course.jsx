import React, {use, useEffect, useState} from "react";
import "./course.css"
import {useNavigate, useParams} from "react-router-dom";
import {AsyncApiRequest} from "../../utils/requests";
import {CourseProviderCard, CourseProviderCardSkeleton} from "../../component/courseProviderCard/courseProviderCard";
import {ReviewSection} from "./reviewSection";
import FavoriteButton from "../../component/favorite/favoriteButton";
import {useSelector} from "react-redux";
import {Skeleton} from "@mui/material";


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
    //const [isUserEnrolled, setIsUserEnrolled] = useState(false);

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
            throw new Error("Error fetching average rating data:", error);
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
            const favoriteState = await AsyncApiRequest("GET", `/favorite/isFavorite/course/${id}`, false)
                .then(response => response.json());
            setFavorite(favoriteState);

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
    //
    // if (loading) {
    //     return (<h1>loading</h1>)
    // }
    return (
        <div className="course-page">
            <button className="course-page-content">
                <section id="course-splash">
                    <div id="course-splash-right-side">
                        {user && isFavoriteLoaded && (
                            <div id="course-page-add-favorite">
                                <FavoriteButton uid={user.id} cid={id} isFav={isFavorite}/>
                            </div>)
                        }
                        {loading ?
                            <div className={"course-splash-desc-skeleton"}>
                                <Skeleton id="course-splash-title-skeleton" variant="text"/>
                                <Skeleton variant="text" width={"25rem"} height={"2rem"} sx={{fontSize: '1rem'}}/>
                                <Skeleton variant="text" width={"20rem"} height={"2rem"} sx={{fontSize: '1rem'}}/>
                            </div>
                            :
                            <div className="course-slash-desc">

                                <h2 id="course-splash-title">{courseData.title} </h2>

                                <p id="course-splash-hrw">
                                    {courseData.hoursWeek} hours per week • {diffConvert(courseData.diffLevel)} •
                                    Credits: {courseData.credits}
                                </p>

                                <p id="course-splash-closest">
                                    Closest course session: &nbsp;
                                    {new Date(courseData.closestCourse).toLocaleDateString("de-DE", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit"
                                    })}
                                </p>
                                &nbsp;
                            </div>
                        }

                    </div>

                    {loading ?
                        <div id="course-splash-image-container-skeleton">
                            &nbsp;
                            <Skeleton variant="rectangular" width={"20rem"} height={"13rem"}/>
                            &nbsp;
                        </div>
                        :
                        <picture>
                            <div id="course-image-container">
                                <img id="course-splash-image" src={courseData.imgLink}
                                     alt={"image " + courseData.title}/>
                            </div>
                        </picture>
                    }


                </section>

                <section id="course-related-certificates">
                    <h3 id="course-related-certificates-heading"> Related certificate</h3>
                   <a href={courseData.certLink} target="_blank">

                    <button className={"cta-button"} id="course-certification-content">
                        <img src="/icons/reader-sharp.svg" alt="Certificate icon" className="filter-white"
                             id="certification-img"/>
                        {loading ?
                            <Skeleton variant="text" width={"15rem"} height={"2rem"}/>
                            :
                            <p id="course-related-certificates-text">{courseData.relatedCert}</p>
                        }
                    </button>
                </a>
                </section>

                <section id="course-description">
                <div id="course-description-content">
                        <h3 id="course-description-heading"> Description</h3>
                        {loading ?
                            <Skeleton variant="text" width={"100%"} height={"20rem"}/>
                            :
                            <p id="course-description-text">{courseData.description}</p>
                        }
                    </div>
                </section>

                {loading ?
                    <section id="course-keywords-section">
                        <h3 id="course-keywords-heading"> Covered topics</h3>
                        <div id="course-keywords">
                            <Skeleton variant="text" width={"100%"} height={"5rem"}/>
                        </div>
                    </section>
                    :
                    <div>
                        {keywords.length > 0 &&
                                <section id="course-keywords-section">
                                    <h3 id="course-keywords-heading"> Covered topics</h3>
                                    <div id="course-keywords">
                                        {keywords.map(item => (
                                            <div className="course-keyword">
                                                <img className="keyword-checkmark" src="/icons/checkmark-sharp.svg"
                                                     alt="Checkmark"/>
                                                <p className="course-keyword-text" key={item.keyword}>{item.keyword}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                        }
                    </div>
                }

                {loading ?
                    <section id="course-offerables">
                        <h3 id="course-offerables-heading"> Available courses</h3>
                        <div id="course-offeables-content">
                            {Array.from({length: 4}).map((_, index) => (
                                <CourseProviderCardSkeleton key={index}/>
                            ))}
                        </div>
                    </section>
                    :
                    <div>
                        {uniqueCourses?.length > 0 && (
                            <section id="course-offerables">
                                <h3 id="course-offerables-heading"> Available courses</h3>
                                <div id="course-offeables-content">
                                    {uniqueCourses.map(item => <CourseProviderCard key={item.id} {...item}/>)}
                                </div>
                            </section>)
                        }
                    </div>
                }

                {loading ?
                    <section className="course-page-reviews">
                        <div className="course-page-review-aggregate">
                            <h3> Customer reviews</h3>
                            &nbsp;
                            <Skeleton variant="text" width={"100%"} height={"10rem"}/>
                        </div>
                    </section>
                    :
                    <div>
                        {user && (
                            <section className="course-page-reviews">
                                <div className="course-page-review-aggregate">
                                    <h3> Customer reviews</h3>
                                    &nbsp;
                                    <ReviewSection cid={id} averageRating={ratingData} user={user}/>
                                </div>
                            </section>)
                        }
                    </div>
                }

            </div>
        </div>
    )
}