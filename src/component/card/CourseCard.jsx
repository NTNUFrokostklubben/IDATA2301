import "./courseCard.css"
import {Link, useNavigate} from "react-router-dom";
import React from "react";

export default function CourseCard(course) {
    const navigate = useNavigate();
    const linkToCourse = "/course/" + course.id;

    return (
        <section className="index-card" id={course.id} onClick={() => navigate(linkToCourse)}>
            <div className="index-course-card">
            <img className="index-course-img" src={course.imgLink} alt="Course Card"/>
                <h6>{course.title}</h6>
                <p className="index-card-desc"> {course.description}</p>
                <p className="index-price">{course.price} NOK</p>
            </div>
        </section>
    );
}