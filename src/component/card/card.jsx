import "./card.css";
import {Link, useNavigate} from "react-router-dom";

export default function Card(offerableCourse) {

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

    return (

        <section  className="card">
            <Link to={"/course/" + offerableCourse.course.id}><img className="course-img" src={offerableCourse.course.imgLink} alt=""/></Link>
            <h6>{offerableCourse.course.title}</h6>
            <p className="card-desc">{offerableCourse.course.description}</p>
            <p className="infotext">{offerableCourse.course.hoursWeek} hr/w • {getDifficulty(offerableCourse.course.diffLevel)} • {offerableCourse.course.credits} ECTS
                credits</p>

            <div className="card-footer">
                <div className="rating">

                    <img width="24" src="/icons/star-sharp.svg" alt=""/>
                    <b>{offerableCourse.rating}</b>
                    ({offerableCourse.numberOfRatings})

                </div>
                <p id="price2">{offerableCourse.minDiscountedPrice} NOK</p>
            </div>
            <p className="infotext">Next course date: {new Date(offerableCourse.closestDate).toLocaleDateString("de-DE")}</p>
        </section>

    )
}