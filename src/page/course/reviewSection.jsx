import {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../utils/requests";
import Review from "../../component/Rating/review";
import "./reviewSection.css"
import ReviewWriter from "../../component/Rating/reviewWriter";
import {UserCourse} from "../../utils/Classes/commonClasses";


export function ReviewComponent({cid, uid, averageRating}) {
    const [userCourseData, setUserCourseData] = useState([]);
    const [halfStar, setHalfStar] = useState(false)
    const [loading, setLoading] = useState(true);
    const [stars, setStars] = useState([]);
    const[starBars, setStarBars] = useState([])
    const[currentStar, setCurrentStar] = useState(5)
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [editReview, setEditReview] = useState(false);
    const [allowEditReview, setAllowEditReview] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isUserEnrolled, setIsUserEnrolled] = useState(false);


    // Add state for visible items count
    const [visibleReviews, setVisibleReviews] = useState(3); // Start with 3 reviews

    // Function to load more reviews
    const loadMoreReviews = () => {
        setVisibleReviews(prev => prev + 3); // Increase by 3 each click
    };

    const fetchData = async () => {
        if(averageRating !== undefined) {

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
            .filter(item => item.review != null)
            .sort((a, b) => b.review?.rating - a.review?.rating);
        setUserCourseData(data)
        setIsUserEnrolled(data.some(course =>  course.user?.id === uid))
        setFilteredReviews(filteredAndSorted)
        calculateStarDistribution(data.map(item => item.review?.rating));
        setAllowEditReview(filteredAndSorted.some(obj => obj.user?.id === uid ))

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

    const getUserReview =(uid) =>{
        return filteredReviews.find(review => review.user?.id === uid )
    }


    useEffect(() => {
        setLoading(true);
        fetching()

        console.log("finished loading")
        setLoading(false);
    }, [averageRating]);

    const finishedEdits = () =>{
        setAllowEditReview(true);
        setEditReview(false)
        refresh();
    }

    const calculateStarDistribution = (ratings) => {
        const starCounts = [0, 0, 0, 0, 0]; // For 1-5 stars

        ratings.forEach(rating => {
            const starIndex = Math.floor(rating) - 1;
            if (starIndex >= 0 && starIndex < 5) {
                starCounts[starIndex]++;
            }
        });

        let starPercent =[];
        starCounts.forEach((number, index) => {
            starPercent[index]= number/5*100;
        })
        setStarBars(starPercent.reverse());

    }

    // Filter reviews when current changes
    useEffect(() => {
        if (userCourseData !== null) {
        const filtered =[...userCourseData].sort((a, b)=>
            (a.review?.rating % currentStar) - (b.review?.rating % currentStar)
        );
        setFilteredReviews(filtered);
    }
    }, [currentStar]);

    const handleStarClick = (e) =>{
        setCurrentStar(e.target.value)
    }

    const refresh = () =>{
        setFilteredReviews(filteredReviews);
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
                    {
                        starBars.map((item, index) =>
                            <div className={"course-page-review-component-text-and-bar"}>
                                <button className={"course-page-review-star-bar-clickable"}
                                onClick={handleStarClick}
                                value={5-index}
                                >
                                    {5-index} star
                                </button>
                                <div className={"course-page-reviews-rating-bar-unit"}>
                                    <div className={"reviews-rating-bar-star"} style={{width:`${item}%`}}></div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>


            { filteredReviews !== null && (
                <div className={"course-page-review-component-right"}>
                {
                    filteredReviews.slice(0, visibleReviews)
                        .map(item => <Review key={item.id} rating={item} title={false}/>)

                }
                {visibleReviews < filteredReviews.length && (
                    <button
                        onClick={loadMoreReviews}
                        className="show-more-reviews-button"
                    >
                        Show More Reviews
                    </button>
                )}
                    {uid && cid && (
                    <div className={"review-writer-section-writer"}>
                    {isUserEnrolled && !allowEditReview && ( <ReviewWriter cid={cid} uid={uid} />)}
                    {isUserEnrolled && !editReview && allowEditReview && (<button onClick={()=> {setEditReview(true)}} >Edit your review?</button>)}
                    {editReview && (( <ReviewWriter cid={cid} uid={uid} existingReview={getUserReview(uid)} callback={finishedEdits} />))}
                    </div>)}
            </div>)}


        </div>

    )
}
