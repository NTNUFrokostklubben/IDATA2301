import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./courses.css";
import "../aggregateTable.css";

export default function Courses() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/courses")
            .then((response) => response.json())
            .then((data) => {
                setCourses(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                setLoading(false);
            });

    }, []);

    return (
        <div id={"courses-page"}>
            <h2>Courses</h2>
            <div id={"table-header"}>
                <button id={"addCourse"} className={"cta-button"}>
                    <Link to={"/admin/management/courses/add"}>Add Course</Link>
                </button>
                <table className={"admin-table"}>
                    <thead>
                    <tr>
                        <th><p>Title</p></th>
                        <th><p>Description</p></th>
                        <th><p>Cat.</p></th>
                        <th><p>Diff. level</p></th>
                        <th><p>ECTS</p></th>
                        <th><p>Hr/w</p></th>
                        <th><p>Related certification</p></th>
                        <th><p>Actions</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>
                                <img src={"https://picsum.photos/50?random=" + course.id} width={50} height={50} />
                                <p>{course.title}</p>
                            </td>
                            <td className={"description"}><p>{course.description}</p></td>
                            <td><p>{course.category}</p></td>
                            <td><p>{course.diffLevel}</p></td>
                            <td><p>{course.credits}</p></td>
                            <td><p>{course.hoursWeek}</p></td>
                            <td><p>{course.relatedCert}</p></td>
                            <td>
                                <button className={"cta-button edit-button"}>
                                    <Link to={`/admin/management/courses/edit/${course.id}`}>
                                        Edit
                                    </Link>
                                </button>
                                <button className={"delete-button"}>
                                    <Link to={`/admin/management/courses/delete/${course.id}`}>
                                        Delete
                                    </Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}