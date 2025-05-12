import "./courseAdd.css";
import {Form, useNavigate} from "react-router-dom";
import {useState} from "react";
import {CourseFormSkeleton} from "../edit/courseEdit";
import {postCourse, setKeywords, uploadImage} from "../../../../../utils/commonRequests";

function CourseAddForm() {

    const navigate = useNavigate();

    const [courseImage, setCourseImage] = useState([])

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
        const image = data.get("imgLink")

        const keywords = data.get("keywords");

        const processedKeywords = () => {
            if (keywords === "") {
                return [];
            } else {
                return keywords.split(",");
            }
        }


        uploadImage(image).then(r => {
            data.set("imgLink", r);
            // TODO: Change alert to something better. Check for success.
            handleFormSubmission(data).then((r) => setKeywords(r?.id, processedKeywords())).then(navigate(-1))
                .catch(alert("Error adding course")).then(navigate(-1));
        });
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

    }


    return (
        <form onSubmit={handleSubmit} action="http://localhost:3000/course" method="POST">
            <section id="course-info">
                <div className="input-wrapper"><label htmlFor="course-name">Course Name</label>
                    <input type="text" id="course-name" name="title" required/></div>

                <div className="input-wrapper"><label htmlFor="course-description">Course Description</label>
                    <textarea id="course-description" name="description" required></textarea></div>

                <div className="group-3">
                    <div className="input-wrapper">
                        <label htmlFor="difficulty-level">Difficulty Level</label>
                        <select name="diffLevel" id="difficulty-level" required>
                            <option value="0">Beginner</option>
                            <option value="1">Intermediate</option>
                            <option value="2">Expert</option>
                        </select></div>

                    <div className="input-wrapper"><label htmlFor="course-credits">ECTS Credits</label>
                        <input type="number" step={".5"} id="course-credits" name="credits" required/></div>

                    <div className="input-wrapper"><label htmlFor="course-duration">Duration</label>
                        <input type="number" id="course-duration" name="hoursWeek" required/></div>
                </div>

                <div className="group-2">
                    <div className="input-wrapper"><label htmlFor="related-certification">Related
                        Certification</label>
                        <input type="text" id="related-certification" name="relatedCert" required/>
                    </div>

                    <div className="input-wrapper"><label htmlFor="course-category">Category</label>
                        <select name="category" id="course-category" required>
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
                               onChange={(e) => handleChangeImage(e.target.files)} required/>
                    </div>
                    <img className={"img-preview"} src={courseImage.src} alt={""}/>
                </div>

                <div className="input-wrapper"><label htmlFor="course-keywords">Keywords separated by
                    comma</label>
                    <input type="text" id="course-keywords" name="keywords"
                           required/></div>

                <button className="cta-button courseAdmin-button" type="submit">Add Course</button>
            </section>
        </form>
    )
}

export default function CourseAdd() {

    // TODO: Implement API call to check if there is connection to server.
    const [loading, setLoading] = useState(false);

    return (
        <div className="courseInfo-page">
            <h2>Add Course</h2>
            {loading ? <CourseFormSkeleton/> : <CourseAddForm/>}
        </div>
    )
}