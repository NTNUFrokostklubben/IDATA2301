import "./offerableCourses.css";
import "../management/aggregateTable.css"
import CardHorizontal from "../../../component/card/cardHorizontal";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../utils/Classes/commonClasses";
import {createPortal} from "react-dom";
import Login from "../../../component/modals/auth/login";
import DeleteModal from "../../../component/modals/deleteModal";


export default function OfferableCourses() {


    const [offerableCourses, setOfferableCourses] = useState([]);
    const [uniqueCourses, setUniqueCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [focusedId, setFocusedId] = useState()
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8080/api/offerableCourses")
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                const courses = data.map((offerableCourse) => new OfferableCourse(
                    offerableCourse.id,
                    offerableCourse.date,
                    offerableCourse.discount,
                    offerableCourse.price,
                    offerableCourse.visible,
                    new courseEntity(
                        offerableCourse.course.id,
                        offerableCourse.course.category,
                        offerableCourse.course.closestCourse,
                        offerableCourse.course.credits,
                        offerableCourse.course.description,
                        offerableCourse.course.diffLevel,
                        offerableCourse.course.hoursWeek,
                        offerableCourse.course.imgLink,
                        offerableCourse.course.relatedCert,
                        offerableCourse.course.title
                    ),
                    new ProviderEntity(
                        offerableCourse.provider.id,
                        offerableCourse.provider.name,
                        offerableCourse.provider.imgLink,
                        offerableCourse.provider.imgAltLink
                    )
                ));
                // Sort by provider name
                const sorted = courses.sort((a, b) => {
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
                // Unique list of provicers from offerableCourses
                setUniqueCourses(sorted.map((offerableCourse) => offerableCourse.course).filter((course, index, self) => {
                    return index === self.findIndex((c) => c.id === course.id);
                }));
                setLoading(false);
            })
    }, []);


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


    if (loading) {
        return <div>Loading...</div>
    }

    // TODO: Refactor so providers without courses are not displayed as well as courses without providers
    // Important to ensure all courses from providers are displayed too as there are some missing courses atm.
    return (
        <div id={"courseIndex"}>
            <h2>Offerable courses</h2>
            <div id={"table-header"}>
                <button id={"addCourse"} className={"cta-button"}><Link to={"/admin/offerablecourses/add"} className={""}>Add
                    Course</Link></button>
                <select id={"course"} onChange={changeProvider}>
                    <option value={""}>All</option>
                    {uniqueCourses.map((course) => (
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
                    <tbody>{filteredCourses.map((offerableCourse) => (
                        <tr key={offerableCourse.id}>
                            <td>
                                <img src={"https://picsum.photos/50?random=" + offerableCourse.id}
                                     alt={offerableCourse.provider.imgAltLink}
                                     width={50} height={50}/>
                                <p>{offerableCourse.provider.name}</p>
                            </td>
                            <td>
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
                            <td><p>{offerableCourse.visibility ? "Visible" : "Hidden"}</p></td>
                            <td>
                                <button className={"cta-button edit-button"}><Link to={`/admin/offerablecourses/edit/${offerableCourse.id}`}
                                         id={"edit" + offerableCourse.id}
                                         >Edit</Link></button>
                                <button id={"delete" + offerableCourse.id} className={"delete-button"} onClick={() => {
                                    setFocusedId(offerableCourse.id)
                                    setShowDeleteModal(true);
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}</tbody>
                </table>
            </div>

            {
                showDeleteModal && createPortal(
                    <DeleteModal onClose={() => setShowDeleteModal(false)} deleteId={focusedId} apiEndpoint={"/offerableCourses/"}/>,
                    document.getElementById("delete-modal")
                )
            }

            <div id={"delete-modal"}/>

        </div>
    )


}