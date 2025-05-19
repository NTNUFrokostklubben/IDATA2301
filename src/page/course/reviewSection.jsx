import React, {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../utils/requests";
import Review from "../../component/Rating/review";
import "./reviewSection.css"
import ReviewWriter from "../../component/Rating/reviewWriter";
import {Dialog} from "@mui/material";
import ConfirmChoiceDialog from "../../component/modals/confirmChoice/confirmChoiceDialog";
import {useNavigate} from "react-router-dom";


export function ReviewSection({cid, user, averageRating}) {
    const [userCourseData, setUserCourseData] = useState([]);
    const [halfStar, setHalfStar] = useState(false)
    const [loading, setLoading] = useState(true);
    const [stars, setStars] = useState([]);
    const [starBars, setStarBars] = useState([])
    const [currentStar, setCurrentStar] = useState(0)
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [editReview, setEditReview] = useState(false);
    const [deleteReview, setDeleteReview] = useState(false);
    const [open, setOpen] = useState(false);
    const [addReview, setAddReview] = useState(false);
    const [allowEditReview, setAllowEditReview] = useState(false);
    const [isUserEnrolled, setIsUserEnrolled] = useState(false);
    const navigate = useNavigate();



    const fetchData = async () => {
        if (averageRating !== undefined) {

            if (!Number.isInteger(averageRating)) {
                setHalfStar(true)
            }
            setStars(Array(Math.floor(averageRating)).fill(0))
        }
    }

    const enrolledCheck = async () =>{
        try {

            return  await AsyncApiRequest("GET", `/userCourses/enrolled/${cid}`, null)
                .then(response => response.json());
        }catch (e){
            console.error(e)
        }
    }
    const fetchRatingArray = async () => {

        const data = await AsyncApiRequest("GET", `/userCourses/reviews/course/${cid}`, null)
            .then(response => response.json());
        const filteredAndSorted = data
            .filter(item => item.review != null)
            .sort((a, b) => b.review?.rating - a.review?.rating);
        setUserCourseData(data)
        setFilteredReviews(filteredAndSorted)
        if (user){
           let enrolled = enrolledCheck();
               enrolled.then( item => {
               setIsUserEnrolled(item)
           })
            setAllowEditReview(filteredAndSorted.some(obj => obj.user?.id === user.id))
        }else
        {
            setIsUserEnrolled(false)
            setAllowEditReview(false)
            setEditReview(false)
        }
        calculateStarDistribution(data.map(item => item.review?.rating), filteredAndSorted.length);

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

    const getUserReview = (user) => {
        return filteredReviews.find(review => review.user?.id === user.id)
    }


    useEffect(() => {
        setLoading(true);
        fetching()

        setLoading(false);
    }, [averageRating]);

    useEffect(() => {
        if(deleteReview){

             const delReview = async () => {
                 await AsyncApiRequest("DELETE", `/userCourses/removeRating/${cid}`, null)
             }

             delReview();
             setDeleteReviewBool(false)
            navigate(0)

        }
    }, [deleteReview]);


    const finishedEdits = () => {
        setAllowEditReview(true);
        setEditReview(false);
        refresh();
    }

    const finishedAdd = (value) => {
        setAllowEditReview(value);
        setAddReview(false);
        refresh();
    }
    const setOpenBool = (value) =>{
        setOpen(value)
    }

    const setDeleteReviewBool = (value) => {
        setDeleteReview(value)
    }

    const calculateStarDistribution = (ratings, nrRatings) => {
        const starCounts = [0, 0, 0, 0, 0]; // For 1-5 stars

        if (!ratings.length === 0) {
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
        } else {
            setStarBars([0, 0, 0, 0, 0]);
        }


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
                <div className="course-page-review-component">

                    <div className="course-page-review-component-top">
                        <div className={"course-page-review-component-left"}>
                            {stars !== [] && (

                                <div className="review-component-aggregate-stars">
                                    {stars.map((value, index, array) =>
                                        <img key={index} className="review-component-star"
                                             src="/icons/star-sharp.svg" alt="review star"/>)}
                                    {halfStar && (
                                        <img className="review-component-star" src="/icons/star-half-sharp.svg"
                                             alt="half star"/>)}
                                    <p className="review-component-average-rating">{averageRating} out of 5 </p>
                                </div>
                            )}
                            {(
                                <div className="course-page-reviews-rating-bars">
                                    {
                                        starBars.map((item, index) =>
                                            <button key={5 - index}
                                                    className={`course-page-review-component-text-and-bar ${currentStar === 5 - index ? "selected" : ""}`}
                                                    onClick={() => handleStarClick(5 - index)}>
                                                <p className="course-page-review-star-bar-clickable">
                                                    {5 - index} star
                                                </p>
                                                <div className="course-page-reviews-rating-bar-unit">
                                                    <div className="reviews-rating-bar-star"
                                                         style={{width: `${item}%`}}></div>
                                                </div>
                                            </button>
                                        )
                                    }
                                </div>)}
                            {user && cid && (
                                <div className="review-writer-section-writer">
                                    {isUserEnrolled && !allowEditReview && (
                                        <button className="cta-button" id="add-review"
                                                onClick={() => {
                                                    setAddReview(true)
                                                }}>
                                            <p>Write a review?</p>
                                        </button>
                                    )}

                                    {isUserEnrolled && !editReview && allowEditReview && (
                                        <div className={"review-section-edit-delete"}>
                                            <button className={"cta-button"} id={"edit-review"}
                                                    onClick={() => {
                                                        setEditReview(true)
                                                    }}>
                                                <p>Edit review</p>
                                            </button>
                                            <ConfirmChoiceDialog open={open} setOpen={setOpenBool} choice={"Are you sure you want to delete" +
                                                " your review?"} callback={setDeleteReviewBool}/>
                                            <button className={"cta-button"} id={"delete-review"}
                                                    onClick={() => {
                                                        setOpen(true)
                                                    }}>
                                                <p>Delete review</p>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {filteredReviews.length > 0 ? (
                            <div className="course-page-review-component-right">
                                {filteredReviews.map(item =>
                                        <Review key={item.id} rating={item} title={false}/>
                                    )
                                }
                            </div>) : <p>No reviews</p>
                        }
                    </div>

                    {user && cid && (
                        <div className="course-page-review-component-bottom">
                            {addReview && (
                                <ReviewWriter cid={cid} callback={finishedAdd}/>
                            )}
                            {editReview && ((
                                <ReviewWriter cid={cid} existingReview={getUserReview(user)}
                                              callback={finishedEdits}/>
                            ))}
                        </div>
                    )}
                </div>

        </div>
    )
}
