import {use, useEffect, useState} from "react";
import "./offerableCourseAdd.css"
import DatePicker, {registerLocale} from "react-datepicker";
import {nb} from "date-fns/locale/nb";
import "react-datepicker/dist/react-datepicker.css";
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../../utils/Classes/commonClasses";
import {AsyncApiRequest} from "../../../../utils/requests";
import {useNavigate} from "react-router-dom";
import {getCourses, getProviders} from "../../../../utils/commonRequests";
import {OfferableCourseFormSkeleton} from "../edit/offerableCourseEdit";
import ReactiveDatePicker from "../../../../component/date/reactiveDatePicker";


function OfferableCourseAddForm({providers, courses}) {

    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    function handleFormSubmission(event) {
        event.preventDefault();


        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        console.log(startDate)
        const offerableCourse = new OfferableCourse(null, new Date(startDate).getTime(), value.discount / 100, value.price, value.visibility, new courseEntity(value.courseId), new ProviderEntity(value.providerId));

        postOfferableCourse(offerableCourse).then(navigate("../"));
    }

    async function postOfferableCourse(offerableCourse) {

        try {
            const p = await AsyncApiRequest("POST", "/offerableCourse", offerableCourse);
        } catch (e) {
            throw e
        }
    }


    return (
        <form onSubmit={handleFormSubmission}>
            <section id="offerableCourse-info">
                <div className="group-2">
                    <div className="input-wrapper"><label htmlFor="provider-name"><p>Provider Name</p></label>
                        <select id={"provider-name"} name={"providerId"} required>
                            {providers.map((provider) => (
                                <option key={provider.id} value={provider.id}>{provider.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-wrapper"><label htmlFor="course-name"><p>Course Name</p></label>
                        <select id={"course-name"} name={"courseId"} required>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={"input-wrapper"}>
                    <label htmlFor={"date"}><p>Start date</p></label>
                    <ReactiveDatePicker setStartDate={setStartDate} startDate={startDate} mobileWidth={900}
                                        id={"date"}/>
                </div>

                <div className={"group-2"}>
                    <div className={"input-wrapper"}>
                        <label htmlFor={"price"}><p>Price of course</p></label>
                        <input min={0} type="number" id={"price"} name={"price"} required/>
                    </div>
                    <div className={"input-wrapper"}>
                        <label htmlFor={"discount"}><p>Discount in percent</p></label>
                        <input min={0} max={100} type="number" id={"discount"} name={"discount"} required/>
                    </div>
                </div>

                <div className={"input-wrapper"}>
                    <label htmlFor={"visibility"}><p>Visibility</p></label>
                    <input type="checkbox" id={"visibility"} name={"visibility"} value={true}/>
                </div>

                <button type="submit" className={"button cta-button"}><p>Add Course</p></button>

            </section>


        </form>
    )


}

export default function OfferableCourseAdd() {

    const [courses, setCourses] = useState([]);
    const [providers, setProviders] = useState([]);

    const [loading, setLoading] = useState(true);

    registerLocale("nb", nb)


    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchCourses(),
                    fetchProviders(),
                ]);
                setLoading(false);
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, []);


    /**
     * Fetches all courses from the API
     *
     * @returns {Promise<void>}
     */
    async function fetchCourses() {
        try {
            const p = await getCourses();
            setCourses(p);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Fetches all providers from the API
     *
     * @returns {Promise<void>}
     */
    async function fetchProviders() {
        try {
            const p = await getProviders();
            setProviders(p);
        } catch (e) {
            throw new Error(e);
        }
    }


    return (
        <div className="offerableCourse-page">
            <h2>Add Offerable Course</h2>
            {loading ? <OfferableCourseFormSkeleton/> :
                <OfferableCourseAddForm providers={providers} courses={courses}/>}
        </div>
    )
}