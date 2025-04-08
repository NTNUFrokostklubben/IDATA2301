import "./cardHorizontal.css"
import {useEffect, useState} from "react";
import {Link, redirect, useNavigate} from "react-router-dom";
import DeleteModal from "../modals/deleteModal";
import {createPortal} from "react-dom";

export default function CardHorizontal(offerableCourse) {



    if (!offerableCourse) {
        return <div>Post data is missing.</div>;
    }

    function getDifficulty (diff_level) {
        switch (diff_level) {
            case 0:
                return "Beginner";
            case 1:
                return "Intermediate";
            case 2:
                return "Expert";
            default:
                return "Unknown";
        }
    }






    return (
        <section className="cardAdmin" id={"course" + offerableCourse.id}>
            {/*<img className="course-img" src={course.imgLink} alt=""/>*/}
            <img className="course-img" src={"https://picsum.photos/200/200?random=2"} alt=""/>
            <h6 className={"card-title"}>{offerableCourse.course.title}</h6>
            <p className="card-desc">{offerableCourse.course.description}</p>
            <p className="infotext">{offerableCourse.course.hoursWeek} hours per week</p>
            <p className={"difficulty"}>{getDifficulty(offerableCourse.course.diffLevel)}</p>
            <p className={"credits"}>{offerableCourse.course.credits} ECTS credits</p>
            <p className="price">{offerableCourse.price} NOK</p>
            <div className={"button-group"}>
                <button className={"delete-button button"} id={"delete" + offerableCourse.id}>Delete</button>
                <Link to={`/admin/course/edit/${offerableCourse.id}`} className={"edit-button button cta-button"} id={"edit" + offerableCourse.id}>Edit</Link>
            </div>
        </section>
    )
}