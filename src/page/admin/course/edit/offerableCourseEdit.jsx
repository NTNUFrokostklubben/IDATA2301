import DatePicker, {registerLocale} from "react-datepicker";
import {useEffect, useState} from "react";
import {nb} from "date-fns/locale/nb";
import {AsyncApiRequest} from "../../../../utils/requests";
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../../utils/Classes/commonClasses";

export default function OfferableCourseEdit(courseId) {

    const [courses, setCourses] = useState([]);
    const [providers, setProviders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState(new Date());

    registerLocale("nb", nb)


    useEffect(() => {
        if (courses.length === 0) {
            fetchCourses();
        }

        if (providers.length === 0) {
            fetchProviders();
        }

        if (providers.length > 0 && courses.length > 0) {
            setLoading(false);
        }

    }, );

    /**
     * Fetches all courses from the API
     *
     * @returns {Promise<void>}
     */
    async function fetchCourses() {
        try {
            const p = await AsyncApiRequest("GET", "/courses",null);
            setCourses(p)
        } catch (e) {
            console.error("Error fetching offerable courses:", e);
        }
    }

    /**
     * Fetches all providers from the API
     *
     * @returns {Promise<void>}
     */
    async function fetchProviders() {
        try {
            const p = await AsyncApiRequest("GET", "/providers",null);
            setProviders(p)
        } catch (e) {
            console.error("Error fetching offerable courses:", e);
        }
    }

    function handleFormSubmission(event) {
        event.preventDefault();


        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        const offerableCourse = new OfferableCourse(null, value.date, value.discount, value.price, value.visibility, new courseEntity(value.courseId), new ProviderEntity(value.providerId));

        postOfferableCourse(offerableCourse)
    }

    async function postOfferableCourse(offerableCourse) {
        try {
            const p = await AsyncApiRequest("POST","/offerableCourse", offerableCourse);
        } catch (e) {
            console.error("Error posting offerable course:", e);
        }
    }

    return(
        <div className="offerableCourse-page">
            <h1>Add offerable course</h1>
            <form onSubmit={handleFormSubmission}>
                <section id="offerableCourse-info">
                    <div className="group-2">
                        <div className="input-wrapper"><label htmlFor="provider-name">Provider Name</label>
                            <select id={"provider-name"} name={"providerId"} required>
                                {providers.map((provider) => (
                                    <option key={provider.id} value={provider.id}>{provider.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-wrapper"><label htmlFor="course-name">Course Name</label>
                            <select id={"course-name"} name={"courseId"} required>
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