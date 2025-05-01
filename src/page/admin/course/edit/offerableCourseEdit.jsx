import DatePicker, {registerLocale} from "react-datepicker";
import {useEffect, useState} from "react";
import {nb} from "date-fns/locale/nb";
import {AsyncApiRequest} from "../../../../utils/requests";
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../../utils/Classes/commonClasses";
import {useNavigate, useParams} from "react-router-dom";
import {Skeleton} from "@mui/material";
import {getCourses, getOfferableCourse, getProviders} from "../../../../utils/commonRequests";

/**
 * Builds the form for editing an offerable course
 *
 * @param offerableCourse
 * @param providers
 * @param courses
 * @returns {JSX.Element}
 * @constructor
 */
function OfferableCourseEditForm({offerableCourse, providers, courses}) {

    const [startDate, setStartDate] = useState(offerableCourse.date);
    const navigate = useNavigate();

    async function postOfferableCourse(offerableCourse) {
        try {
            const p = await AsyncApiRequest("POST", "/offerableCourse", offerableCourse);
        } catch (e) {
            throw new Error(e);
        }
    }

    function handleFormSubmission(event) {
        event.preventDefault();


        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        const offerableCourse = new OfferableCourse(value.id, new Date(startDate).getTime(), value.discount / 100, value.price, value.visibility, new courseEntity(value.courseId), new ProviderEntity(value.providerId));

        postOfferableCourse(offerableCourse)
            .then(alert("Successfully added Offerable Course")).then(navigate(-1))
    }

    return (
        <form onSubmit={handleFormSubmission}>
            <section id="offerableCourse-info">
                <input disabled={true} id={"id"} name={"id"} type={"number"} hidden={true} value={offerableCourse.id}/>
                <div className="group-2">
                    <div className="input-wrapper"><label htmlFor="provider-name">Provider Name</label>
                        <select id={"provider-name"} name={"providerId"} defaultValue={offerableCourse.provider.id}
                                required>
                            {providers.map((provider) => (
                                <option key={provider.id} value={provider.id}>{provider.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-wrapper"><label htmlFor="course-name">Course Name</label>
                        <select id={"course-name"} name={"courseId"} defaultValue={offerableCourse.course.id} required>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={"input-wrapper"}>
                    <label htmlFor={"date"}>Start date</label>
                    <DatePicker id={"date"} name={"date"} onChange={(date) => setStartDate(date)}
                                selected={startDate} dateFormat={"dd-MM-yyyy"} locale={"nb"}
                                icon={<img src={"/icons/calendar-clear-sharp.svg"}/>} showIcon/>
                </div>

                <div className={"group-2"}>
                    <div className={"input-wrapper"}>
                        <label htmlFor={"price"}>Price of course</label>
                        <input min={0} type="number" id={"price"} name={"price"} defaultValue={offerableCourse.price}
                               required/>
                    </div>
                    <div className={"input-wrapper"}>
                        <label htmlFor={"discount"}>Discount in percent</label>
                        <input min={0} max={100} type="number" id={"discount"} name={"discount"}
                               defaultValue={offerableCourse.discount * 100} required/>
                    </div>
                </div>

                <div className={"input-wrapper"}>
                    <label htmlFor={"visibility"}>Visibility</label>
                    <input type="checkbox" id={"visibility"} name={"visibility"}
                           defaultChecked={offerableCourse.visible} value={true}/>
                </div>

                <button type="submit" className={"button cta-button"}>Update Course</button>

            </section>


        </form>
    )
}

export function OfferableCourseFormSkeleton() {
    return (
        // Uses same ID as loaded form for styling purposes. Only 1 can be loaded at a time so this should be fine
        <div className={"offerable-course-edit-skeleton"} id="offerableCourse-info">
            <div className="group-2">
                <div className="input-wrapper"><label htmlFor="provider-name">Provider Name</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"} />
                </div>
                <div className="input-wrapper"><label htmlFor="course-name">Course Name</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"} />
                </div>
            </div>

            <div className={"input-wrapper"}>
                <label htmlFor={"date"}>Start date</label>
                <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"} />

            </div>

            <div className={"group-2"}>
                <div className={"input-wrapper"}>
                    <label htmlFor={"price"}>Price of course</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"} />
                </div>
                <div className={"input-wrapper"}>
                    <label htmlFor={"discount"}>Discount in percent</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"} />
                </div>
            </div>

            <div className={"input-wrapper"}>
                <label htmlFor={"visibility"}>Visibility</label>
                <Skeleton className={"loader"} variant={"rectangular"} width={"2.5rem"} height={"2.5rem"} />
            </div>


            <Skeleton variant={"rectangular"} className={"cta-button"} height={"2.5rem"} sx={"background-color: var(--cta)"} />

        </div>


    )
}

export default function OfferableCourseEdit(offerableCourseId) {

    const {id} = useParams();

    const [courses, setCourses] = useState([]);
    const [providers, setProviders] = useState([]);
    const [offerableCourse, setOfferableCourse] = useState([]);

    const [loading, setLoading] = useState(true);


    registerLocale("nb", nb)


    useEffect(() => {

        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchOfferableCourse(),
                    fetchCourses(),
                    fetchProviders()
                ]);
                setLoading(false)
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()

    }, []);

    /**
     * Fetches offerable course for editing
     *
     * @returns {Promise<void>}
     */
    async function fetchOfferableCourse() {
        try {
            const p = await getOfferableCourse(id)
            setOfferableCourse(p);
            return p;
        } catch (e) {
            throw new Error(e);
        }
    }

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
            <h1>Update Offerable Course</h1>
            {loading ? <OfferableCourseFormSkeleton/>:
                <OfferableCourseEditForm offerableCourse={offerableCourse} providers={providers} courses={courses}/>}
        </div>
    )

}