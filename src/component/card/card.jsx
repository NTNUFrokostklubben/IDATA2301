import "./card.css";

export default function Card(course) {

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
        <section className="card">
            <img className="course-img" src={"https://picsum.photos/200/200?random=2"} alt=""/>
            <b>{course.title}</b>
            <p className="card-desc">{course.description}</p>
            <p className="infotext">{course.hoursWeek} • {getDifficulty(course.diffLevel)} • {course.credits} ECTS credits</p>
            <div className="card-footer">
                <div className="rating">

                    <img width="24" src="/icons/star-sharp.svg" alt=""/>
                    <b>3.4</b>
                    (152)

                </div>
                <p id="price2">10 000 NOK</p>
            </div>
        </section>
    )
}