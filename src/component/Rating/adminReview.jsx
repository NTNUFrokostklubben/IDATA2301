import "./adminReview.css"
import React from "react";

export default function AdminReview(review) {
    let userPicture = "/icons/ellipse-sharp.svg";
    if(review !== undefined || review !== null) {
        userPicture = review.profilePicture;
    }
    return (
        <div className={"admin-dash-reviews-list"}>
            <div className={"admin-dash-review"}>
                <div className={"admin-dash-review-text"}>
                    <img className={"admin-dash-review-user-image"} src={userPicture} alt={review.name}/> &nbsp;
                    <p>{review.title} &nbsp; </p>
                    <p>{review.comment}</p>
                </div>
                &nbsp;
                <div className={"admin-dash-review-rating"}>
                    <img width="24" src="/icons/star-sharp.svg" alt=""/>
                    &nbsp;
                    <p>{review.rating}</p>
                </div>
            </div>
        </div>
    );
}