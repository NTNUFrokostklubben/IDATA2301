import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./courses.css";
import "../aggregateTable.css";
import {createPortal} from "react-dom";
import DeleteModal from "../../../../component/modals/deleteModal";
import {getCourses} from "../../../../utils/commonRequests";
import {Skeleton} from "@mui/material";

/**
 * Builds table with courses
 *
 * @param courses courses to be displayed
 * @returns {Element}
 * @constructor
 */
function CourseTableContent({courses}) {

    const [showDeleteModal, setShowDeleteModal] = useState();
    const [focusedId, setFocusedId] = useState()

    return (
        <>
            {courses.map((course) => (
                <tr key={course.id}>
                    <td>
                        <img src={course.imgLink} width={50} height={50}/>
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
                        <button id={"delete" + course.id} className={"delete-button"} onClick={() => {
                            setFocusedId(course.id)
                            setShowDeleteModal(true);
                        }}>Delete
                        </button>
                    </td>
                </tr>
            ))}
            {
                showDeleteModal && createPortal(
                    <DeleteModal onClose={() => setShowDeleteModal(false)} deleteId={focusedId} apiEndpoint={"/course/"}/>,
                    document.getElementById("delete-modal")
                )
            }
        </>
    )
}


/**
 * Renders skeletons for the course table whilst waiting for API data
 *
 * @returns {Element}
 * @constructor
 */
function CoursesTableSkeleton() {

    return (
        <>
            {Array.from({length: 10}).map((_, index) => (
                <tr key={`skeleton-${index}`}>
                    <td>
                        <Skeleton variant="rectangular"/>
                    </td>
                    <td className={"description"}>
                        <Skeleton variant="text"/>
                    </td>
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                </tr>
                ))}
        </>
    )
}

export default function Courses() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const fetchData = async () => {
            try {
                await fetchCourses();
                setLoading(false);
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()

    }, []);

    async function fetchCourses() {
        try {
            const p = await getCourses();
            setCourses(p);
        } catch (e) {
            throw new Error(e);
        }
    }

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
                    {loading ?<CoursesTableSkeleton/>:<CourseTableContent courses={courses}/>}
                    </tbody>
                </table>
            </div>



            <div id={"delete-modal"}/>
        </div>
    )
}