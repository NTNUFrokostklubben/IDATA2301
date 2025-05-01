import "./reviewWriter.css"
import {useState} from "react";

export default function ReviewWriter(){
    const [reviewText, setReviewText] = useState('');


    return(
        <section className={"review-writer-section"}>
            <div className={"review-writer-container"}>
                <h5 className={"review-writer-heading"}>Write a review</h5>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={5}
                    cols={50}
                    placeholder={"Tell us how you feel about this course..."}
                    className={"review-writer-container-input"}/>

            </div>

        </section>
    )

}