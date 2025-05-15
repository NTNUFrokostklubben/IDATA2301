import "./card.css";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

export default function Card(offerableCourse) {

    const imgRef = useRef(null);
    const navigate = useNavigate();

    function getDifficulty(diff_level) {
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

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        const handleLoad = () => {
            const isPortrait = img.naturalHeight > img.naturalWidth;
            img.classList.toggle("portrait", isPortrait);
            img.classList.toggle("landscape", !isPortrait);
        };

        if (img.complete) {
            handleLoad();
        } else {
            img.addEventListener("load", handleLoad);
        }

        return () => {
            img.removeEventListener("load", handleLoad);
        };
    }, [offerableCourse.course.imgLink]);

    return (

        <section className="card">
            <div className={"card-top"}><Link to={"/course/" + offerableCourse.course.id}><img ref={imgRef} className="course-img"
                                                                                               src={offerableCourse.course.imgLink}
                                                                                               alt={"image: " + offerableCourse.course.title}/></Link>
                <h2>{offerableCourse.course.title}</h2></div>
            <p className="card-desc">{offerableCourse.course.description}</p>
            <p className="infotext">{offerableCourse.course.hoursWeek} hr/w
                • {getDifficulty(offerableCourse.course.diffLevel)} • {offerableCourse.course.credits} ECTS
                credits</p>

            <div className="card-footer">
                <div className="rating">

                    <img width="24" src="/icons/star-sharp.svg" alt=""/>
                    <b>{offerableCourse.rating}</b>
                    <p>({offerableCourse.numberOfRatings})</p>

                </div>
                <p id="price2">{offerableCourse.minDiscountedPrice} NOK</p>
            </div>
            <p className="infotext">Next course
                date: {new Date(offerableCourse.closestDate).toLocaleDateString("de-DE")}</p>
        </section>

    )
}