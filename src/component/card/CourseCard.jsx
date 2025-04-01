import "./courseCard.css"

export default function CourseCard({index, course}) {
    return (
        <section className="index-card" id={course.id} >
            <div className="index-course-card" key={index}>
                <img className="index-course-img" src={course.img} alt=""/>
                <h5 className="index-card-desc">{course.desc}</h5>
                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.</p>
                <p>{course.price}</p>
            </div>
        </section>

    );
}