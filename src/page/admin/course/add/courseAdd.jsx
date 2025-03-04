import "./courseAdd.css";

export default function CourseAdd() {


    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const value = Object.fromEntries(data.entries());

        console.log({ value });
    }

    return(
        <div className="page">
            <div>
                <form onSubmit={handleSubmit} action="http://localhost:6655" method="POST">
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
                                <input type="number" id="course-credits" name="credits" required/></div>

                            <div className="input-wrapper"><label htmlFor="course-duration">Duration</label>
                                <input type="number" id="course-duration" name="hoursWeek" required/></div>
                        </div>

                        <div className="group-2">
                            <div className="input-wrapper"><label htmlFor="related-certification">Related
                                Certification</label>
                                <input type="text" id="related-certification" name="relatedCert" required/>
                            </div>

                            <div className="input-wrapper"><label htmlFor="course-category">Category</label>
                                <select name="catergory" id="course-category" required>
                                    <option value="it">Information Technologies</option>
                                    <option value="dm">Digital Marketing</option>
                                    <option value="be">Business and Entrepreneurship</option>
                                    <option value="dsa">Data Science and Analytics</option>
                                </select></div>
                        </div>

                        <div className="group-2">
                            <div className="input-wrapper"><label htmlFor="course-price">Price</label>
                                <input type="number" id="course-price" name="price" required/></div>

                            <div className="input-wrapper"><label htmlFor="price-currency">Currency</label>
                                <select name="currency" id="price-currency" required>
                                    <option value="usd">USD</option>
                                    <option value="eur">EUR</option>
                                    <option value="nok">NOK</option>
                                </select></div>
                        </div>

                        <div className="group-2">
                            {/*TODO: Replace with calendar modal later (javascript component)*/}
                            <div className="input-wrapper"><label htmlFor="course-date">Start Date</label>
                                <input type="date" id="course-date" name="closestCourse" required/></div>

                            {/*TODO: Add preview of uploaded image (javascript component)*/}
                            <div className="input-wrapper">
                                <label htmlFor="course-image">Course Image</label>
                                <input type="file" id="course-image" name="imgLink" required/>
                            </div>
                        </div>

                        <div className="input-wrapper"><label htmlFor="course-keywords">Keywords separated by
                            comma</label>
                            <input type="text" id="course-keywords" name="keywords" required/></div>

                        <button className="cta-button" type="submit">Add Course</button>
                    </section>
                </form>
            </div>
        </div>
    )
}