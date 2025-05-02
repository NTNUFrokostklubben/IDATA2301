import "./reviewWriter.css"
import {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../utils/requests";
import {Rating} from "@mui/material";


export default function ReviewWriter({uid, cid}){
    const [reviewText, setReviewText] = useState('');
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewStars, setReviewStars] = useState((1));
    const [isDisabled, setIsDisabled] = useState(true);

    function reviewToJson(){
        return{
            rating: reviewStars,
            comment: reviewText,
            title: reviewTitle
        }
    }
    const sendReview = async () =>{
        let payload = reviewToJson();

        const request = await AsyncApiRequest("PUT", `/userCourses/addRating/${uid}/${cid}`, payload);
        console.log(request.status)
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
                <h6 className={"review-writer-heading"}>Write a review</h6>
                <input className={"review-writer-container-title"}
                value={reviewTitle}
                onChange={handleTitleChange}
                placeholder={"Title for your review"}
                />

                <textarea className={"review-writer-container-input"}
                    value={reviewText}
                    onChange={handleTextChange}
                    rows={5}
                    cols={50}
                    placeholder={"Tell us how you feel about this course..."}
                    />
                <div className={"review-writer-stars-and-publish"}>

                    <Rating className={"review-writer-container-stars"}
                            value={reviewStars}
                            onChange={(e, value) => setReviewStars(value)}
                            size="large"
                            defaultValue={1}
                    />
                    <button className={"review-writer-container-publish"} disabled={isDisabled} onClick={sendReview}>Publish</button>
                </div>

            </div>

        </section>
    )

}