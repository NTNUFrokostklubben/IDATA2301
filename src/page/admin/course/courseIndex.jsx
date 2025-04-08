import "./courseIndex.css";
import CardHorizontal from "../../../component/card/cardHorizontal";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../utils/Classes/commonClasses";
import Collapsable from "../../../component/Collapsable/collapsable";


export default function CourseIndex() {


    const [offerableCourses, setOfferableCourses] = useState([]);
    const [uniqueCourses, setUniqueCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8080/api/offerableCourses")
            .then((response) => response.json())
            .then((data) => {
                const courses = data.map((offerableCourse) => new OfferableCourse(
                    offerableCourse.id,
                    offerableCourse.date,
                    offerableCourse.discount,
                    offerableCourse.price,
                    offerableCourse.visibility,
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
            <h2>Courses</h2>
            <div id={"table-header"}>
                <button id={"addCourse"} className={"cta-button"}><Link to={"/admin/course/add"} className={""}>Add
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
                <table id={"course-table"}>
                    <thead>
                    <tr>
                        <th>Provider</th>
                        <th>Course</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Start Date</th>
                        <th>Visibility</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>{filteredCourses.map((offerableCourse) => (
                        <tr key={offerableCourse.id}>
                            <td>
                                <img src={"https://picsum.photos/50?random=" + offerableCourse.id}
                                     alt={offerableCourse.provider.imgAltLink}
                                     width={50} height={50}/>
                                {offerableCourse.provider.name}
                            </td>
                            <td>
                                <img src={"https://picsum.photos/50?random=" + offerableCourse.id}
                                     alt={offerableCourse.course.title}
                                     width={50} height={50}/>
                                {offerableCourse.course.title}
                            </td>
                            <td>{offerableCourse.price}</td>
                            <td>{offerableCourse.discount}</td>
                            {/*convert unix date to norwegian date format*/}
                            <td>{new Date(offerableCourse.date).toLocaleDateString("no-NO", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit"
                            })}</td>
                            <td>{offerableCourse.visibility ? "Visible" : "Hidden"}</td>
                            <td>
                                <button className={"cta-button"}><Link to={`/admin/course/edit/${offerableCourse.id}`}
                                         id={"edit" + offerableCourse.id}
                                         className={"edit-button"}>Edit</Link></button>
                                <button className={"delete-button"}>Delete</button>
                            </td>
                        </tr>
                    ))}</tbody>
                </table>
            </div>


        </div>
    )


}