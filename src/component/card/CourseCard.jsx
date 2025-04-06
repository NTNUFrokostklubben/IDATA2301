import "./courseCard.css"

export default function CourseCard(course) {
    // TODO remove the temp value for the image link and price
    var courseImg = "https://picsum.photos/200/200?random="+course.id;
    return (
        <section className="index-card" id={course.id} >
            <div className="index-course-card">
                <img className="index-course-img" src={courseImg} alt="Course Card"/>
                <h6>{course.title}</h6>
                <p className="index-card-desc"> {course.description}</p>
                <p className="index-price">100 NOK -temp</p>
            </div>
        </section>

    );
}