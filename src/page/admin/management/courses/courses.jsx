import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./courses.css";
import "../aggregateTable.css";
import {createPortal} from "react-dom";
import DeleteModal from "../../../../component/modals/deleteModal";
import {getCourses} from "../../../../utils/commonRequests";
import {Skeleton} from "@mui/material";
import GradientCircularProgress from "../../../../component/loader/loader";

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


    function getDifficultyLevel(level) {
        switch (level) {
            case 0:
                return "Beg.";
            case 1:
                return "Int.";
            case 2:
                return "Exp.";
            default:
                return "Unknown";
        }
    }

    return (
        <>
            {courses.map((course) => (
                <tr key={course.id}>
                    <td>
                        <img src={course.imgLink} alt={"image " + course.title}/>
                        <p>{course.title}</p>
                    </td>
                    <td className={"description"}><p>{course.description}</p></td>
                    <td><p>{course.category}</p></td>
                    <td><p>{getDifficultyLevel(course.diffLevel)}</p></td>
                    <td><p>{course.credits}</p></td>
                    <td><p>{course.hoursWeek}</p></td>
                    <td><p>{course.relatedCert}</p></td>
                    <td >
                        <div className={"button-group"}><Link to={`/admin/management/courses/edit/${course.id}`}>
                            <button>
                                <img src={"/icons/pencil-sharp.svg"} alt={"edit"}/>
                            </button>
                        </Link>

                            <button id={"delete" + course.id} onClick={() => {
                                setFocusedId(course.id)
                                setShowDeleteModal(true);
                            }}><img src={"/icons/trash-sharp.svg"} alt={"delete"}/>
                            </button>
                        </div>
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
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [focusedId, setFocusedId] = useState();

    useEffect(() => {

        const fetchData = async () => {
            try {
                //Sleep to simulate loading
                await new Promise(resolve => setTimeout(resolve, 150));
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

    function getDifficultyLevel(level) {
        switch (level) {
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
        <div id={"courses-page"}>
            <h2>Courses</h2>
            <div id={"table-header"}>
                <Link to={"/admin/management/courses/add"}>
                    <button id={"addCourse"} className={"cta-button"}>
                        Add
                        Course
                    </button>
                </Link>

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
                    {loading ?
                        <CoursesTableSkeleton/>
                        :
                        <CourseTableContent courses={courses}/>
                    }
                    </tbody>
                </table>

                <div className="admin-management-cards" id="admin-management-cards">
                    {loading ?
                        <div className="admin-management-loader">
                            <GradientCircularProgress/>
                        </div>
                        :
                        <div>
                            {courses.map((course) => (
                                <div className="admin-management-card"  id="course" key={course.id}>
                                    <div className="card-row-left">
                                        <div className="card-row">
                                            <h6>Title:</h6>
                                            <p>{course.title}</p>
                                            <img src={course.imgLink} alt={"image " + course.title}/>
                                        </div>
                                        <div className="card-row">
                                            <h6>Description:</h6>
                                            <p className="description" >{course.description}</p>
                                        </div>
                                        <div className="card-row">
                                            <h6>Category:</h6>
                                            <p>{course.category}</p>
                                        </div>
                                        <div className="card-row">
                                            <h6>Diff. level:</h6>
                                            <p>{getDifficultyLevel(course.diffLevel)}</p>
                                        </div>
                                        <div className="card-row">
                                            <h6>Credits:</h6>
                                            <p>{course.credits}</p>
                                        </div>
                                        <div className="card-row">
                                            <h6>Hr/w:</h6>
                                            <p>{course.hoursWeek}</p>
                                        </div>
                                        <div className="card-row">
                                            <h6>Related Certification:</h6>
                                            <p>{course.credits}</p>
                                        </div>
                                    </div>
                                    <div className="card-row">
                                        <div className={"button-group"}>
                                            <Link to={`/admin/management/courses/edit/${course.id}`}>
                                                <button>
                                                    <img src={"/icons/pencil-sharp.svg"} alt={"edit"}/>
                                                </button>
                                            </Link>
                                            <button id={"delete" + course.id} onClick={() => {
                                                setFocusedId(course.id)
                                                setShowDeleteModal(true);
                                            }}>
                                                <img src={"/icons/trash-sharp.svg"} alt={"delete"}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
            {
                showDeleteModal && createPortal(
                    <DeleteModal onClose={() => setShowDeleteModal(false)} deleteId={focusedId}
                                 apiEndpoint={"/provider/"}/>,
                    document.getElementById("delete-modal")
                )
            }
            <div id={"delete-modal"}/>
        </div>
    )
}