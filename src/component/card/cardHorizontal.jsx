import "./card.css"
import {useState} from "react";

export default function CardHorizontal(courseid) {


    class course {
        constructor(id, category, closest_course, credits, description, diff_level, hours_week, img_link, related_cert, title) {
            this.id = id;
            this.category = category;
            this.closest_course = closest_course;
            this.credits = credits;
            this.description = description;
            this.diff_level = diff_level;
            this.hours_week = hours_week;
            this.img_link = img_link;
            this.related_cert = related_cert;
            this.title = title;
        }
    }

    async function getCourse(id) {
        const response = await fetch(`http://localhost:8080/api/course/${id}`);
        const data = await response.json();
        console.log(data);
        return data;
    }

    function getDifficulty(diff) {
        if (diff === 0) {
            return "Beginner";
        } else if (diff === 1) {
            return "Intermediate";
        } else {
            return "Expert";
        }
    }

    const courseData = getCourse(courseid.courseid);
    const courseCard = new course(courseData.id, courseData.category, courseData.closest_course, courseData.credits, courseData.description, courseData.diff_level, courseData.hours_week, courseData.img_link, courseData.related_cert, courseData.title);

    console.log(courseCard);

    return (
        <section className="card">
            <img className="course-img" src={courseCard.img_link} alt=""/>
            <b>{courseCard.title}</b>
            <p className="card-desc">{courseCard.description}</p>
            <p className="infotext">{courseCard.hours_week} hours per week
                • {getDifficulty(courseCard.diff_level)} • {courseCard.credits} ECTS credits</p>
            <div className="card-footer">
                <div className="rating">

                    <img width="24" src="/icons/star-sharp.svg" alt=""/>
                    <b>3.4</b>
                    (152)

                </div>
                <p id="price2">10000 NOK</p>
            </div>
        </section>
    )
}