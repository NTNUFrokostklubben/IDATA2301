import {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../utils/requests";
import Rating from "../../component/Rating/rating";
import "./reviewSection.css"
import ReviewWriter from "../../component/Rating/reviewWriter";


export function ReviewComponent({cid, averageRating}) {
    const [ratingData, setRatingData] = useState(null);
    const [halfStar, setHalfStar] = useState(false)
    const [loading, setLoading] = useState(true);
    const [stars, setStars] = useState([]);
    const[starBars, setStarBars] = useState([])
    const [oneStarBar, setOneStarBar] = useState(0);
    const [twoStarBar, setTwoStarBar] = useState(0);
    const [threeStarBar, setThreeStarBar] = useState(0);
    const [fourStarBar, setFourStarBar] = useState(0);
    const [fiveStarBar, setFiveStarBar] = useState(0);
    // Add state for visible items count
    const [visibleReviews, setVisibleReviews] = useState(3); // Start with 3 reviews

    // Function to load more reviews
    const loadMoreReviews = () => {
        setVisibleReviews(prev => prev + 3); // Increase by 3 each click
    };

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

        let starPercent =[];
        starCounts.forEach((number, index) => {
            starPercent[index]= number/5*100;
        })
        console.log(starPercent)
        setStarBars(starPercent.reverse());

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
                    {
                        starBars.map((item, index) =>
                            <div className={"course-page-review-component-text-and-bar"}>
                                <p className={"course-page-review-component-bar-text"}>{5-index} star</p>
                                <div className={"course-page-reviews-rating-bar-unit"}>
                                    <div className={"reviews-rating-bar-star"} style={{width:`${item}%`}}></div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>


            {ratingData !== null && ( <div className={"course-page-review-component-right"}>
                {
                    ratingData.slice(0, visibleReviews)
                        .map(item => <Rating key={item.id} rating={item} title={false}/>)

                }
                {visibleReviews < ratingData.length && (
                    <button
                        onClick={loadMoreReviews}
                        className="show-more-button"
                    >
                        Show More Reviews
                    </button>
                )}
            </div>)}

        </div>
    )
}
