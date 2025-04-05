import "./courseCard.css"

export default function CourseCard(course) {
    // TODO remove the temp value for the image link and price
    var courceImg = "https://picsum.photos/200/200?random="+course.id;
    return (
        <section className="index-card" id={course.id} >
            <div className="index-course-card">
                <img className="index-course-img" src={courceImg} alt="Course Card"/>
                <h5>{course.title}</h5>
                <p className="index-card-desc"> {course.description}</p>
                <p>100 NOK -temp</p>
            </div>
        </section>

    );
}