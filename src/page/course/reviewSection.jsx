import {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../utils/requests";
import Review from "../../component/Rating/review";
import "./reviewSection.css"
import ReviewWriter from "../../component/Rating/reviewWriter";
import {UserCourse} from "../../utils/Classes/commonClasses";


export function ReviewSection({cid, uid, averageRating}) {
    const [userCourseData, setUserCourseData] = useState([]);
    const [halfStar, setHalfStar] = useState(false)
    const [loading, setLoading] = useState(true);
    const [stars, setStars] = useState([]);
    const [starBars, setStarBars] = useState([])
    const [currentStar, setCurrentStar] = useState(0)
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [editReview, setEditReview] = useState(false);
    const [addReview, setAddReview] = useState(false);
    const [allowEditReview, setAllowEditReview] = useState(false);
    const [isUserEnrolled, setIsUserEnrolled] = useState(false);



    const fetchData = async () => {

        if (averageRating !== undefined) {

            if (!Number.isInteger(averageRating)) {
                setHalfStar(true)
            }
            setStars(Array(Math.floor(averageRating)).fill(0))
        }
    }
    const fetchRatingArray = async () => {
        const data = await AsyncApiRequest("GET", `/userCourses/course/${cid}`, null)
            .then(response => response.json());
        const filteredAndSorted = data
            .filter(item => item.review != null)
            .sort((a, b) => b.review?.rating - a.review?.rating);
        setUserCourseData(data)
        setIsUserEnrolled(data.some(course => course.user?.id === uid))
        setFilteredReviews(filteredAndSorted)
        calculateStarDistribution(data.map(item => item.review?.rating), filteredAndSorted.length);
        setAllowEditReview(filteredAndSorted.some(obj => obj.user?.id === uid))

    }

    useEffect(() => {

    }, [isUserEnrolled]);


    const fetching = async () => {
        try {
            await Promise.all([fetchData(), fetchRatingArray()])
        } catch (e) {
            console.error(e)
        }
    }

    const getUserReview = (uid) => {
        return filteredReviews.find(review => review.user?.id === uid)
    }


    useEffect(() => {
        setLoading(true);
        fetching()

        setLoading(false);
    }, [averageRating]);

    const finishedEdits = () => {
        setAllowEditReview(true);
        setEditReview(false);
        refresh();
    }

    const finishedAdd= () => {
        setAllowEditReview(true);
        setAddReview(false);
        refresh();
    }

    const calculateStarDistribution = (ratings, nrRatings) => {
        const starCounts = [0, 0, 0, 0, 0]; // For 1-5 stars

        ratings.forEach(rating => {
            const starIndex = Math.floor(rating) - 1;
            if (starIndex >= 0 && starIndex < 5) {
                starCounts[starIndex]++;
            }
        });

        let starPercent = [];
        starCounts.forEach((number, index) => {
            starPercent[index] = number / nrRatings * 100;
        })
        setStarBars(starPercent.reverse());

    }

    // Filter reviews when current changes
    useEffect(() => {
        if (userCourseData !== null) {
            if (currentStar === 0) {
                setFilteredReviews(userCourseData);
                return;
            }
            const filtered = userCourseData.filter(item => item.review?.rating === currentStar);
            setFilteredReviews(filtered);
        }
    }, [currentStar]);

    const handleStarClick = (starValue) => {
        if (starValue === currentStar) {
            setCurrentStar(0);
        } else {
            setCurrentStar(starValue);
        }
    }

    const refresh = () => {
        setFilteredReviews(filteredReviews);
    }


    if (loading) {
        return (<h5>loading...</h5>)
    }

    return (
        <div>
            {filteredReviews.length > 0 ?
                <div className={"course-page-review-component"}>

                    <div className={"course-page-review-component-top"}>
                        <div className={"course-page-review-component-left"}>
                            {stars !== [] && (

                                <div className={"review-component-aggregate-stars"}>
                                    {stars.map((value, index, array) =>
                                        <img key={index} className="review-component-star"
                                             src="/icons/star-sharp.svg" alt="review star"/>)}
                                    {halfStar && (
                                        <img className="review-component-star" src="/icons/star-half-sharp.svg"
                                             alt="half star"/>)}
                                    <p className={"review-component-average-rating"}>{averageRating} out of 5 </p>
                                </div>
                            )}

                            <div className={"course-page-reviews-rating-bars"}>
                                {
                                    starBars.map((item, index) =>
                                        <button key={5 - index}
                                                className={`course-page-review-component-text-and-bar ${currentStar === 5 - index ? "selected" : ""}`}
                                                onClick={() => handleStarClick(5 - index)}>
                                            <p className={"course-page-review-star-bar-clickable"}>
                                                {5 - index} star
                                            </p>
                                            <div className={"course-page-reviews-rating-bar-unit"}>
                                                <div className={"reviews-rating-bar-star"}
                                                     style={{width: `${item}%`}}></div>
                                            </div>
                                        </button>
                                    )
                                }

                            </div>
                            {uid && cid && (
                                <div className={"review-writer-section-writer"}>

                                    {isUserEnrolled && !allowEditReview && (
                                        <button className={"cta-button"} id={"add-review"}
                                                onClick={() => {
                                                    setAddReview(true)
                                                }}>
                                            <p>Write a review?</p>
                                        </button>
                                    )}

                                    {isUserEnrolled && !editReview && allowEditReview && (
                                        <button className={"cta-button"} id={"edit-review"}
                                                onClick={() => {
                                                    setEditReview(true)
                                                }}>
                                            <p>Edit your review?</p>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>


                        {filteredReviews !== null && (
                            <div className={"course-page-review-component-right"}>
                                {
                                    filteredReviews.map(item =>
                                        <Review key={item.id} rating={item} title={false}/>
                                    )
                                }
                            </div>)}
                    </div>

                    {uid && cid && (
                        <div className={"course-page-review-component-bottom"}>
                            {addReview && (
                                <ReviewWriter cid={cid} uid={uid} callback={finishedAdd}/>
                            )}
                            {editReview && ((
                                <ReviewWriter cid={cid} uid={uid} existingReview={getUserReview(uid)}
                                              callback={finishedEdits}/>
                            ))}
                        </div>
                    )}
                </div>
            :
            <p>No reviews</p>
            }

        </div>
    )
}
