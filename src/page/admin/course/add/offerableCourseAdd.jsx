import {use, useEffect, useState} from "react";
import "./offerableCourseAdd.css"
import DatePicker, {registerLocale} from "react-datepicker";
import {nb} from "date-fns/locale/nb";
import "react-datepicker/dist/react-datepicker.css";

export default function OfferableCourseAdd() {

    const [courses, setCourses] = useState([]);
    const [providers, setProviders] = useState([]);

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

    useEffect(() => {
        fetch("http://localhost:8080/api/providers")
            .then((response) => response.json())
            .then((data) => {
                setProviders(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching providers:", error);
                setLoading(false);
            });
    }, []);

    registerLocale("nb", nb)

    return (
        <div className="offerableCourse-page">
            <h1>Add offerable course</h1>
            <form>
                <section id="offerableCourse-info">
                    <div className="group-2">
                        <div className="input-wrapper"><label htmlFor="provider-name">Provider Name</label>
                            <select>
                                {providers.map((provider) => (
                                    <option key={provider.id} value={provider.id}>{provider.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-wrapper"><label htmlFor="course-name">Course Name</label>
                            <select>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <DatePicker selected={new Date()} dateFormat={"dd-MM-YYYY"} locale={"nb"} showIcon  />

                </section>


            </form>
        </div>
    )
}