import "./courseCard.css"
import {Link, useNavigate} from "react-router-dom";
import React from "react";

export default function CourseCard(courseCard) {
    const navigate = useNavigate();
    const coursePrice = Math.round(courseCard.minDiscountedPrice * 100) / 100;
    const linkToCourse = "/course/" + courseCard.Course.id;

    return (
        <section className="index-card" id={courseCard.Course.id} onClick={() => navigate(linkToCourse)}>
            <div className="index-course-card">
            <img className="index-course-img" src={courseCard.Course.imgLink} alt="Course Card"/>
                <h6 className="index-course-content-heading">{courseCard.Course.title}</h6>

                <div className={"index-card-footer"}>
                    <p className="index-card-desc"> {courseCard.Course.description}</p>
                    <p className="index-price">{coursePrice} NOK</p>
                </div>
            </div>
        </section>
    );
}