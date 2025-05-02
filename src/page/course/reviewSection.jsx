import {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../utils/requests";
import Rating from "../../component/Rating/rating";
import "./reviewSection.css"


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
