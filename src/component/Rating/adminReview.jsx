import "./adminReview.css"
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Skeleton} from "@mui/material";

export function AdminReview(review) {
    let userPicture = "/icons/person-sharp.svg";
    if(!(review.profilePicture === undefined || review.profilePicture === null)) {
        userPicture = review.profilePicture;
    }
    const linkToCourse = "/course/" + review.courseId;
    const navigate = useNavigate();
    let reviewComment = review.comment;
    if (reviewComment && reviewComment.length > 50) {
        reviewComment = review.comment.substring(0, 50) + " ...";
    }

    return (
            <div className={"admin-dash-review"} onClick={() => navigate(linkToCourse)}>
                <div className={"admin-dash-review-text"}>
                    <img id={"admin-dash-review-user-image"} src={userPicture} alt={review.name}/> &nbsp;
                    <p>{reviewComment}</p>
                </div>
                &nbsp;
                <div className={"admin-dash-review-rating"}>
                    <img id={"star-img"} className={"filter-cta"} src={"/icons/star-sharp.svg"} alt=""/>
                    &nbsp;
                    <p>{review.rating}</p>
                </div>
            </div>
    );
}

export function AdminReviewSkeleton() {
    return (
        <div className={"admin-dash-review-skeleton"}>
            <div className={"admin-dash-review-text-skeleton"}>
                <Skeleton className={"admin-dash-review-user-image-skeleton"} variant={"rectangular"} /> &nbsp;
                <Skeleton className={"admin-dash-review-user-text-skeleton"}
                          variant={"rectangular"}  />
            </div>
            &nbsp;
            <div className={"admin-dash-review-rating-skeleton"}>
                <img className={"star-img-skeleton"} src="/icons/star-sharp.svg" alt=""/>
                &nbsp;
                <Skeleton variant={"rectangular"} height={"1rem"} width={"1rem"}/>
            </div>
        </div>
    );
}