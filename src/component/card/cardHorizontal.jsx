import "./cardHorizontal.css"
import {useEffect, useState} from "react";

export default function CardHorizontal(course) {


    if (!course) {
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

    console.log(course);



    return (
        <section className="cardAdmin" id={"course" + course.id}>
            {/*<img className="course-img" src={course.imgLink} alt=""/>*/}
            <img className="course-img" src={"https://picsum.photos/200/200?random=2"} alt=""/>
            <p className={"card-title"}><b>{course.title}</b></p>
            <p className="card-desc">{course.description}</p>
            <p className="infotext">{course.hoursWeek} hours per week</p>
            <p className={"difficulty"}>{getDifficulty(course.diffLevel)}</p>
            <p className={"credits"}>{course.credits}ECTS credits</p>
            <p className="price">10000 NOK</p>
            <div className={"button-group"}>
                <button className={"delete-button"} id={"delete" + course.id}>Delete</button>
                <button className={"edit-button"} id={"edit" + course.id}>Edit</button>
            </div>
        </section>
    )
}