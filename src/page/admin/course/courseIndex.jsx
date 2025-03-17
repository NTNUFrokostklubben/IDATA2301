import "./courseIndex.css";
import CardHorizontal from "../../../component/card/cardHorizontal";
import {useEffect, useState} from "react";

class courseEntity {
    constructor(id, category, closestCourse, credits, description, diffLevel, hoursWeek, imgLink, relatedCert, title) {
        this.id = id;
        this.category = category;
        this.closestCourse = closestCourse;
        this.credits = credits;
        this.description = description;
        this.diffLevel = diffLevel;
        this.hoursWeek = hoursWeek;
        this.imgLink = imgLink;
        this.relatedCert = relatedCert;
        this.title = title;
    }
}

export default function CourseIndex() {


    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/courses")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const courses = data.map((course) => new courseEntity(course.id, course.category, course.closestCourse, course.credits, course.description, course.diffLevel, course.hoursWeek, course.imgLink, course.relatedCert, course.title));
                setCourses(courses);
                setLoading(false)
                console.log(courses)
            })
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }


    return (
        <div>
            <h1>Courses</h1>
            <div>
                {courses.map((course) => <CardHorizontal key={course.id} {...course}/>)}
            </div>
        </div>
    )


}