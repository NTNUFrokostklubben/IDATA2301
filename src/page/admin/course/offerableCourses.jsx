import "./offerableCourses.css";
import "../management/aggregateTable.css"
import CardHorizontal from "../../../component/card/cardHorizontal";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../utils/Classes/commonClasses";
import {createPortal} from "react-dom";
import Login from "../../../component/modals/auth/login";
import DeleteModal from "../../../component/modals/deleteModal";
import {getOfferableCourses} from "../../../utils/commonRequests";
import {Skeleton} from "@mui/material";

/**
 * Builds table with offerable courses
 *
 * @param filteredCourses
 * @returns {Element}
 * @constructor
 */
function OfferableCoursesTableContent({filteredCourses}) {

    const [showDeleteModal, setShowDeleteModal] = useState();
    const [focusedId, setFocusedId] = useState()

    console.log(filteredCourses)

    return (
        <>
            {filteredCourses.map((offerableCourse) => (
                <tr key={offerableCourse.id}>
                    <td>
                        <img src={offerableCourse.provider.altLogoLink}
                             alt={""}/>
                        <p>{offerableCourse.provider.name}</p>
                    </td>
                    <td>
                        <img src={offerableCourse.course.imgLink}
                             alt={""}/>
                        <p>{offerableCourse.course.title}</p>
                    </td>
                    <td><p>{offerableCourse.price},- NOK</p></td>
                    <td><p>{parseInt(offerableCourse.discount * 100)} %</p></td>
                    {/*convert unix date to norwegian date format*/}
                    <td><p>{new Date(offerableCourse.date).toLocaleDateString("no-NO", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    })}</p></td>
                    <td><p>{offerableCourse.visible ? "Visible" : "Hidden"}</p></td>
                    <td>
                        <div className={"button-group"}><Link
                            to={`/admin/offerablecourses/edit/${offerableCourse.id}`}
                            id={"edit" + offerableCourse.id}
                        >
                            <button><img src={"/icons/pencil-sharp.svg"}/></button>
                        </Link>

                            <button id={"delete" + offerableCourse.id} onClick={() => {
                                setFocusedId(offerableCourse.id)
                                setShowDeleteModal(true);
                            }}><img src={"/icons/trash-sharp.svg"}/>
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            {
                showDeleteModal && createPortal(
                    <DeleteModal onClose={() => setShowDeleteModal(false)} deleteId={focusedId}
                                 apiEndpoint={"/offerableCourses/"}/>,
                    document.getElementById("delete-modal")
                )
            }
        </>
    )
}

/**
 * Renders skeletons for the offerable courses table
 *
 * @returns {Element}
 * @constructor
 */
function OfferableCoursesTableSkeleton() {

    return (
        <>
            {Array.from({length: 10}).map((_, index) => (
                <tr key={`skeleton-${index}`}>
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
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default function OfferableCourses() {
    const [offerableCourses, setOfferableCourses] = useState([]);
    const [uniqueCourses, setUniqueCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchOfferableCourses();
                setLoading(false);
            } catch (e) {
                console.error(e)
                setError(e)
            }
        }

        fetchData()
    }, []);

    async function fetchOfferableCourses() {
        const p = await getOfferableCourses();

        const sorted = p.sort((a, b) => {
            if (a.provider.name < b.provider.name) {
                return -1;
            }
            if (a.provider.name > b.provider.name) {
                return 1;
            }
            return 0;
        })
        setOfferableCourses(sorted);
        setFilteredCourses(sorted);
        setUniqueCourses(sorted.map((offerableCourse) => offerableCourse.course).filter((course, index, self) => {
            return index === self.findIndex((c) => c.id === course.id);
        }));
    }


    function changeProvider(e) {
        const selectedCourseId = e.target.value;
        console.log(selectedCourseId)
        if (selectedCourseId === "") {
            setFilteredCourses(offerableCourses);
        } else {
            const filteredCourses = offerableCourses.filter((offerableCourse) => {

                console.log(offerableCourse.course.id)
                return offerableCourse.course.id == selectedCourseId;
            });
            setFilteredCourses(filteredCourses);
            console.log(filteredCourses)
        }

    }


    // Important to ensure all courses from providers are displayed too as there are some missing courses atm.
    return (
        <div id={"courseIndex"}>
            <h2>Offerable courses</h2>
            <div id={"table-header"}>
                <Link to={"/admin/offerablecourses/add"}
                      className={""}>
                    <button id={"addCourse"} className={"cta-button"}>Add Course</button>
                </Link>

                <select disabled={loading} id={"course"} onChange={changeProvider}>
                    <option value={""}>{loading ? "Loading" : "All"}</option>
                    {!loading && uniqueCourses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.title}
                        </option>
                    ))}
                </select>
            </div>


            <div>
                <table className={"admin-table"} id={"course-table"}>
                    <thead>
                    <tr>
                        <th><p>Provider</p></th>
                        <th><p>Course</p></th>
                        <th><p>Price</p></th>
                        <th><p>Discount</p></th>
                        <th><p>Start Date</p></th>
                        <th><p>Visibility</p></th>
                        <th><p>Actions</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? <OfferableCoursesTableSkeleton/> :
                        <OfferableCoursesTableContent filteredCourses={filteredCourses}/>}
                    </tbody>
                </table>
            </div>


            <div id={"delete-modal"}/>

        </div>
    )


}