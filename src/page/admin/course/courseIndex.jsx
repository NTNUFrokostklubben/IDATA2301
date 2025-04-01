import "./courseIndex.css";
import CardHorizontal from "../../../component/card/cardHorizontal";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../utils/Classes/commonClasses";
import Collapsable from "../../../component/Collapsable/collapsable";


export default function CourseIndex() {


    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [providers, setProviders] = useState([]);
    const [offerableCoursesByProvider, setOfferableCoursesByProvider] = useState({});

    useEffect(() => {
        fetch("http://localhost:8080/api/courses")
            .then((response) => response.json())
            .then((data) => {
                const courses = data.map((course) => new courseEntity(course.id, course.category, course.closestCourse, course.credits, course.description, course.diffLevel, course.hoursWeek, course.imgLink, course.relatedCert, course.title));
                setCourses(courses);
                setLoading(false)
            })
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/providers")
            .then((response) => response.json())
            .then((data) => {
                const providers = data.map((provider) => new ProviderEntity(provider.id, provider.name, provider.imgLink, provider.imgAltLink));
                setProviders(providers);
                // console.log(providers);
            })
    }, []);


    useEffect(() => {
        if (providers.length === 0) return;

        providers.forEach((provider) => {
            fetch(`http://localhost:8080/api/offerableCourses/provider/${provider.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const offerableCourses = data.map((offerableCourse) => new OfferableCourse(offerableCourse.id, offerableCourse.date, offerableCourse.discount, offerableCourse.price, offerableCourse.visibility, offerableCourse.course, offerableCourse.provider));

                    setOfferableCoursesByProvider((prevState) => {
                        return {...prevState, [provider.id]: offerableCourses}
                    });
                    console.log(offerableCourses)
                }).catch((e) => {
                console.error(e)
            });
        });
    }, [providers]);


    if (loading) {
        return <div>Loading...</div>
    }

    // TODO: Refactor so providers without courses are not displayed as well as courses without providers
    // Important to ensure all courses from providers are displayed too as there are some missing courses atm.
    return (
        <div id={"courseIndex"}>
            <h2>Courses</h2>
            <button id={"addCourse"} className={"cta-button"}><Link to={"/admin/course/add"} className={""}>Add
                Course</Link></button>

            <div>

                {providers.map((provider) =>
                    <ul key={provider.id}><Collapsable key={provider.id} title={provider.name}
                                                       defaultOpen={true}>
                        <li>
                            {offerableCoursesByProvider[provider.id]?.map((offerableCourse) => {
                                return <CardHorizontal key={offerableCourse.id} {...offerableCourse}/>
                            })}
                        </li>
                    </Collapsable></ul>)}
            </div>


            {/*<div>*/}
            {/*    {courses.map((course) => <CardHorizontal key={course.id} {...course}/>)}*/}
            {/*</div>*/}
        </div>
    )


}