import {use, useEffect, useState} from "react";
import "./offerableCourseAdd.css"
import DatePicker, {registerLocale} from "react-datepicker";
import {nb} from "date-fns/locale/nb";
import "react-datepicker/dist/react-datepicker.css";

export default function OfferableCourseAdd() {

    const [courses, setCourses] = useState([]);
    const [providers, setProviders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState(new Date());

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

                    <div className={"input-wrapper"}>
                        <label htmlFor={"date"}>Start date</label>
                        <DatePicker id={"date"} name={"date"} onChange={(date) => setStartDate(date)}
                                    selected={startDate} dateFormat={"dd-MM-YYYY"} locale={"nb"}
                                    icon={<img src={"/icons/calendar-clear-sharp.svg"}/>} showIcon/>
                    </div>

                    <div className={"group-2"}>
                        <div className={"input-wrapper"}>
                            <label htmlFor={"price"}>Price of course</label>
                            <input min={0} type="number" id={"price"} name={"price"} required/>
                        </div>
                        <div className={"input-wrapper"}>
                            <label htmlFor={"discount"}>Discount in percent</label>
                            <input min={0} max={100} type="number" id={"discount"} name={"discount"} required/>
                        </div>
                    </div>

                    <div className={"input-wrapper"}>
                        <label htmlFor={"visibility"}>Visibility</label>
                        <input type="checkbox" id={"visibility"} name={"visibility"}/>
                    </div>

                    <button type="submit" className={"button cta-button"}>Add Course</button>

                </section>


            </form>
        </div>
    )
}