import "./reviewWriter.css"
import {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../utils/requests";
import {Rating} from "@mui/material";
import {useNavigate} from "react-router-dom";

//TODO make title and text go away on publish
//TODO refresh review component on publish
export default function ReviewWriter({ cid, existingReview = null, callback = null}){
    const [reviewText, setReviewText] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewStars, setReviewStars] = useState((5));
    const [isDisabled, setIsDisabled] = useState(true);

    const navigate = useNavigate();

    function reviewToJson(){
        return{
            rating: reviewStars,
            comment: reviewText,
            title: reviewTitle
        }
    }

    useEffect(() => {
        if (existingReview) {
            setReviewTitle(existingReview.review?.title || '');
            setReviewText(existingReview.review?.comment || '');
            setReviewStars(existingReview.review?.rating || 5);
        } else {
            setReviewTitle('');
            setReviewText('');
            setReviewStars(5);
        }
    }, [existingReview]);


    const sendReview = async () =>{
        let payload = reviewToJson();

        const request = await AsyncApiRequest("PUT", `/userCourses/addRating/${cid}`, payload);

        if (callback != null){
            callback(true);
        }
        navigate(0);
    }

    const cancelReview = async () => {
        setReviewText('');
        setReviewTitle('');
        setReviewStars(5);
        if (callback != null){
            callback(false);
        }
    }

    useEffect(() => {
        setIsDisabled(reviewText.trim() === '' && reviewTitle.trim() === '');
    }, [reviewText, reviewTitle]);

    const handleTitleChange = (e) => {
        setReviewTitle(e.target.value);
    };

    const handleTextChange = (e) => {
        setReviewText(e.target.value);
    };


    return(
        <section className={"review-writer-section"}>
            <div className={"review-writer-container"}>

                <h4 className={"review-writer-heading"}>Write a review</h4>

                <input className={"review-writer-container-title"} value={reviewTitle} onChange={handleTitleChange}
                       placeholder={"Title for your review"}/>

                <textarea className={"review-writer-container-input"} onChange={handleTextChange}
                          style={{resize: "vertical", height: "10rem"}}
                          placeholder={"Tell us how you feel about this course..."}/>

                <div className={"review-writer-stars-and-publish"}>

                <Rating className={"review-writer-container-stars"}
                            value={reviewStars}
                            onChange={(e, value) => setReviewStars(value)}
                            size="large"
                            defaultValue={1}
                    />

                    <div id={"review-writer-container-buttons"}>
                        <button className={"cta-button"} id={"review-writer-button-cancel"}
                                onClick={cancelReview}>
                            <p> Cancel </p>
                        </button>

                        <button className={"cta-button"} id={"review-writer-button-publish"} disabled={isDisabled}
                                onClick={sendReview}>
                            <p> Publish </p>
                        </button>
                    </div>

                </div>
            </div>

        </section>
    )

}