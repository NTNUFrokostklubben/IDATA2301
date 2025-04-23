import "./adminReview.css"
import React from "react";
import {Link, useNavigate} from "react-router-dom";

export default function AdminReview(review) {
    let userPicture = "/icons/person-sharp.svg";
    if(!(review.profilePicture === undefined || review.profilePicture === null)) {
        userPicture = review.profilePicture;
    }
    const linkToCourse = "/course/" + review.courseId;
    const navigate = useNavigate();
    let reviewComment = review.comment;
    if (review.comment.length > 50) {
        reviewComment = review.comment.substring(0, 50) + " ...";
    }

    return (
            <div className={"admin-dash-review"} onClick={() => navigate(linkToCourse)}>
                <div className={"admin-dash-review-text"}>
                    <img className={"admin-dash-review-user-image"} src={userPicture} alt={review.name}/> &nbsp;
                    <p>{reviewComment}</p>
                </div>
                &nbsp;
                <div className={"admin-dash-review-rating"}>
                    <img className={"star-img"} src="/icons/star-sharp.svg" alt=""/>
                    &nbsp;
                    <p>{review.rating}</p>
                </div>
            </div>
    );
}