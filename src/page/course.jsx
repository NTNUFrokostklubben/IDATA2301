import {use, useEffect, useState} from "react";
import "./course.css"
import Rating from "../component/Rating/rating";
import CourseProviderCard from "../component/courseProviderCard/courseProviderCard";
import {useParams} from "react-router-dom";

export default function Course() {
    const [courseData, setCourseData] = useState([]);
    const [ratingData, setRatingData] = useState();
    const [offerableCourseData, setofferableCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keywords, setKeywords] = useState([])
    const {id} = useParams();
    useEffect(() => {
            fetch(`http://localhost:8080/api/course/${id}`)
                .then(response => response.json())
                .then(data => {
                    setCourseData(data);
                    setLoading(false);
                    console.log(data)
                    fetch(`http://localhost:8080/api/userCourses/averageRating/${data.id}`)
                        .then(response => response.json())
                        .then(data2 => {
                            setRatingData(data2);
                        })
                        .catch(err => console.error('Error fetching data:', err));
                    fetch(`http://localhost:8080/api/offerableCourses/course/${data.id}`)
                        .then(response => response.json())
                        .then(data3 => {
                            setofferableCourseData(data3);
                        })
                        .catch(err => console.error('Error fetching data:', err));
                    fetch(`http://localhost:8080/api/keyword/${data.id}`)
                        .then(response => response.json())
                        .then(data4 => {
                            setKeywords(data4);
                        })
                        .catch(err => console.error('Error fetching data:', err));
                })
                .catch(err => console.error('Error fetching data:', err));
        }, []
    );

    function diffConvert(diff) {
        let value;
        switch (diff) {
            case 1:
                value = "Beginner"
                break;
            case 2:
                value = "Intermediate"
                break;
            case 3:
                value = "Expert"
                break;
        }
        return value;
    }

    if (loading) {
        return (<h1>loading</h1>)
    }
    return (
        <div className="course-page">
            <section id="course-splash">
                <div id="course-splash-right-side">
                    <h4 id="course-splash-title">{courseData.title}</h4>
                    <div id="course-splash-details">
                        <p id="course-splash-hrw">{courseData.hoursWeek} hours per week</p>
                        <img className="course-splash-details-spacing"
                             src="/icons/ellipsis-horizontal-circle-sharp.svg"/>
                        <p id="course-splash-diff">{diffConvert(courseData.diffLevel)}</p>
                        <img className="course-splash-details-spacing"
                             src="/icons/ellipsis-horizontal-circle-sharp.svg"/>
                        <p id="course-splash-credits">credits: {courseData.credits}</p>
                    </div>
                    <div id="course-splash-offerability">
                        <p id="course-splash-closest">Closest course session: {new Date(courseData.closestCourse).toLocaleDateString()}</p>
                        <p id="course-splash-relatedcert">Related certificate: {courseData.relatedCert}</p>
                    </div>
                    <div id="course-splash-avgstars">
                        <img id="course-splash-star" src="/icons/star-sharp.svg" alt={"rating star"}/>
                        <p id="course-splash-rating">{ratingData}</p>
                    </div>
                    <div id="course-splash-keywords">
                        {keywords.map( item => (
                            <p className="course-splash-keyword">{item.keyword}</p>

                            ))}
                    </div>
                </div>
                <picture>
                    <img id="course-splash-image" src={courseData.imgLink} alt={"course image"}/>
                </picture>
            </section>
            <section id="course-description">
                <h4 id="course-description-heading"> Description</h4>
                <p id="course-description-text">{courseData.description}</p>
            </section>
            <section id="course-offerables">
                {offerableCourseData.map(item => <CourseProviderCard key={item.id} {...item}/>)}

            </section>
        </div>
    )
}