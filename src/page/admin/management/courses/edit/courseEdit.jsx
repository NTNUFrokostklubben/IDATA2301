import "../add/courseAdd.css"
import {Form, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {courseEntity} from "../../../../../utils/Classes/commonClasses";
import {Skeleton} from "@mui/material";
import {
    getCourse,
    getCourses,
    getKeywords,
    postCourse,
    setKeywords,
    uploadImage
} from "../../../../../utils/commonRequests";

function CourseEditForm({course, keywords}) {

    const navigate = useNavigate();

    const [courseImage, setCourseImage] = useState([])
    const [imageChanged, setImageChanged] = useState(false);

    /**
     * Loads the current image from the server
     */
    useEffect(() => {
            const img = new Image();
            img.src = course.imgLink;

            setCourseImage(img);
        }
        , [course.imgLink]);

    /**
     * Handles form submission after successful Image Upload for Course
     *
     * @param data form data with correct image URL
     * @returns {Promise<ReadableStream<Uint8Array>|null>} Created course or null if no course created
     */
    async function handleFormSubmission(data) {
        const value = Object.fromEntries(data.entries());


        const response = await postCourse(value)
        return response;
    }

    /**
     * Handle event when form is submitted in any way
     *
     * @param event Submission event from HTML form.
     */
    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const image = data.get("imgLink");
        const keywords = data.get("keywords");

        const processedKeywords = () => {
            if (keywords === "") {
                return [];
            } else {
                return keywords.split(",");
            }
        }


        setKeywords(course.id, processedKeywords()).then(r => {
            if (imageChanged) {

                uploadImage(image).then(r => {
                    data.set("imgLink", r);
                    handleFormSubmission(data).then(navigate(-1));
                });
            } else {

                data.set("imgLink", course.imgLink);
                handleFormSubmission(data).then(navigate(-1));
            }

        });


        // Uploads image if it was changed

    }

    /**
     * Handles image change event.
     * Used to indicate that a new image needs to be uploaded to server.
     *
     * @param image
     * @returns {Promise<void>}
     */
    async function handleChangeImage(image) {

        const img = new Image();
        img.src = URL.createObjectURL(image[0]);

        setCourseImage(img);
        setImageChanged(true);

    }





    return (
        <form onSubmit={handleSubmit} action={"http://localhost:3000/course/" + course.id} method="PUT">
            <section id="course-info">
                <input disabled={false} id={"id"} name={"id"} type={"number"} hidden={true} value={course.id}/>

                <div className="input-wrapper"><label htmlFor="course-name">Course Name</label>
                    <input type="text" id="course-name" name="title" defaultValue={course.title} required/>
                </div>

                <div className="input-wrapper"><label htmlFor="course-description">Course Description</label>
                    <textarea id="course-description" name="description" defaultValue={course.description}
                              required></textarea></div>

                <div className="group-3">
                    <div className="input-wrapper">
                        <label htmlFor="difficulty-level">Difficulty Level</label>
                        <select name="diffLevel" id="difficulty-level" defaultValue={course.diffLevel} required>
                            <option value="0">Beginner</option>
                            <option value="1">Intermediate</option>
                            <option value="2">Expert</option>
                        </select></div>

                    <div className="input-wrapper"><label htmlFor="course-credits">ECTS Credits</label>
                        <input type="number" step={".5"} id="course-credits" name="credits"
                               defaultValue={course.credits} required/></div>

                    <div className="input-wrapper"><label htmlFor="course-duration">Duration</label>
                        <input type="number" id="course-duration" name="hoursWeek"
                               defaultValue={course.hoursWeek} required/></div>
                </div>

                <div className="group-2">
                    <div className="input-wrapper"><label htmlFor="related-certification">Related
                        Certification</label>
                        <input type="text" id="related-certification" name="relatedCert"
                               defaultValue={course.relatedCert} required/>
                    </div>

                    <div className="input-wrapper"><label htmlFor="course-category">Category</label>
                        <select name="category" id="course-category" defaultValue={course.category} required>
                            <option value="it">Information Technologies</option>
                            <option value="dm">Digital Marketing</option>
                            <option value="be">Business and Entrepreneurship</option>
                            <option value="dsa">Data Science and Analytics</option>
                        </select></div>
                </div>


                <div className={"imageUpload-wrapper"}>
                    <div className="input-wrapper">
                        <label htmlFor="course-image">Course Image</label>
                        <input type="file" id="course-image" name="imgLink" accept={"image/png,image/jpeg,image/webp"}
                               onChange={(e) => handleChangeImage(e.target.files)} required={imageChanged}/>
                    </div>
                    <img className={"img-preview"} src={courseImage.src} alt={""}/>
                </div>


                <div className="input-wrapper"><label htmlFor="course-keywords">Keywords separated by
                    comma</label>
                    <input defaultValue={keywords} type="text" id="course-keywords" name="keywords" required/></div>

                <button className="cta-button" type="submit">Update Course</button>
            </section>
        </form>
    )
}

/**
 * Renders a skeleton for the Course form
 *
 * @returns {JSX.Element}
 * @constructor
 */
export function CourseFormSkeleton() {
    return (
        // Same ID for styling purposes, only 1 id is rendered at a time so this should be fine.
        <div className={"course-edit-skeleton"} id="course-info">
            <div className="input-wrapper"><label htmlFor="course-name">Course Name</label>
                <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/></div>

            <div className="input-wrapper"><label htmlFor="course-description">Course Description</label>
                <Skeleton className={"loader"} variant={"rectangular"} height={"16rem"} width={"100%"}/></div>

            <div className="group-3">
                <div className="input-wrapper">
                    <label htmlFor="difficulty-level">Difficulty Level</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/></div>

                <div className="input-wrapper"><label htmlFor="course-credits">ECTS Credits</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/></div>

                <div className="input-wrapper"><label htmlFor="course-duration">Duration</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/></div>
            </div>

            <div className="group-2">
                <div className="input-wrapper"><label htmlFor="related-certification">Related
                    Certification</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/>
                </div>

                <div className="input-wrapper"><label htmlFor="course-category">Category</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/></div>
            </div>


            <div className="input-wrapper">
                <label htmlFor="course-image">Course Image</label>
                <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/>
            </div>

            <div className="input-wrapper"><label htmlFor="course-keywords">Keywords separated by
                comma</label>
                <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/></div>

            <Skeleton variant={"rectangular"} className={"cta-button"} height={"2.5rem"}
                      sx={"background-color: var(--cta)"}/>
        </div>
    )
}

export default function CourseEdit() {

    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState([]);
    const [keywords, setKeywords] = useState([])

    const {id} = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchCourse(),
                    fetchKeywords()
                ])
                setLoading(false);
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, []);

    /**
     * Fetches course
     *
     * @returns {Promise<void>}
     */
    async function fetchCourse() {
        try {
            const p = await getCourse(id);
            setCourse(p);
        } catch (e) {
            throw new Error(e);
        }
    }

    async function fetchKeywords() {
        try {
            const p = await getKeywords(id);


            const keywords = p.map((keyword) => {
                return keyword.keyword;
            });

            setKeywords(keywords);
        } catch (e) {
            setKeywords([]);
        }
    }


    return (
        <div className="courseInfo-page">
            <h2>Update Course</h2>
            {loading ? <CourseFormSkeleton/> : <CourseEditForm course={course} keywords={keywords}/>}
        </div>
    )
}