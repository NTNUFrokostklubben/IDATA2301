import "./search.css"
import Card from "../../component/card/card";
import {useEffect, useState} from "react";
import Collapsable from "../../component/Collapsable/collapsable";
import {courseEntity, FilterQuery} from "../../utils/Classes/commonClasses";
import DatePicker from "react-datepicker";
import {useParams, useSearchParams} from "react-router-dom";


export default function Search() {

    const [searchParams, setSearchParams] = useSearchParams();
    const searchValue = searchParams.get("search");

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())


    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());

        console.log(searchValue)

        const filters = new FilterQuery({
            ["startDate"]: startDate.getTime(),
            ["endDate"]: endDate.getTime()
        }, buildCategory(), buildDifficultyLevel(), {
            ["min-credits"]: value["min-credits"],
            ["max-credits"]: value["max-credits"]
        }, {
            ["min-rating"]: value["min-rating"],
            ["max-rating"]: value["max-rating"]
        }, {["min-price"]: value["min-price"], ["max-price"]: value["max-price"]}, searchValue);

        console.log({filters});

    }

    /**
     * Builds an array of all checked categories for filtering on the backend
     *
     * @returns {*[]} Array of checked categories
     */
    function buildCategory() {
        const categories = [];
        const checkboxes = document.querySelectorAll("input[type=checkbox]:checked.categoryCheckbox");
        checkboxes.forEach((checkbox) => {
            categories.push(checkbox.name);
        });
        return categories;
    }

    /**
     * Builds an array of all checked difficulty levels for filtering on the backend
     *
     * @returns {*[]} Array of checked difficulty levelss
     */
    function buildDifficultyLevel() {
        const levels = [];
        const checkboxes = document.querySelectorAll("input[type=checkbox]:checked.difficultyCheckbox");
        checkboxes.forEach((checkbox) => {
            levels.push(checkbox.name);
        });
        return levels;
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/courses")
            .then((response) => response.json())
            .then((data) => {
                const courses = data.map((course) => new courseEntity(course.id, course.category, course.closestCourse, course.credits, course.description, course.diffLevel, course.hoursWeek, course.imgLink, course.relatedCert, course.title));
                setCourses(courses);
                setLoading(false)
            })
    }, []);

    /**
     * Handles date changes in the date range picker
     *
     * @param dates Array of dates
     */
    const dateChanged = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="search-page">
            <div className="filters">
                <form onSubmit={handleSubmit}>
                    <Collapsable title={"Difficulty level"}>
                        <section id="difficulty">

                            <label><input className="difficultyCheckbox" type="checkbox" name={"0"}
                                          value={true} defaultChecked={true}/> Beginner</label>
                            <label><input className="difficultyCheckbox" type="checkbox" name={"1"}
                                          value={true} defaultChecked={true}/> Intermediate</label>
                            <label><input className="difficultyCheckbox" type="checkbox" name={"2"}
                                          value={true} defaultChecked={true}/> Expert</label>
                        </section>
                    </Collapsable>
                    <Collapsable title={"Course size"}>
                        <section id="size">
                            <p>ECTS credits</p>
                            <div className="search-input-field-container">
                                <div className="input-wrapper">
                                    <label htmlFor="min-size">Min</label>
                                    <input className="" id="min-size" placeholder="min" name={"min-credits"}
                                           type="number" min={0}/>
                                </div>
                                <p> - </p>
                                <div className="input-wrapper">
                                    <label htmlFor="max-size">Max</label>
                                    <input className="" id="max-size" placeholder="max" name={"max-credits"}
                                           type="number" min={0}/>
                                </div>
                            </div>
                        </section>
                    </Collapsable>
                    <Collapsable title={"Category"}>
                        <section id="category">
                            <label><input className="categoryCheckbox" type="checkbox" name={"it"}
                                          value={true} defaultChecked={true}/> Information
                                Technologies</label>
                            <label><input className="categoryCheckbox" type="checkbox" name={"dm"}
                                          value={true} defaultChecked={true}/> Digital Marketing</label>
                            <label><input className="categoryCheckbox" type="checkbox" name={"be"}
                                          value={true} defaultChecked={true}/> Business and
                                Entrepenaurship</label>
                            <label><input className="categoryCheckbox" type="checkbox" name={"dsa"} value={true}
                                          defaultChecked={true}/> Data
                                Science and
                                Analytics</label>

                        </section>
                    </Collapsable>


                    <Collapsable title={"Ratings"}>
                        <section id="ratings">
                            <div className="search-input-field-container">
                                <div className="input-wrapper">
                                    <label htmlFor="min-rating">Min rating</label>
                                    <input id="min-rating" className="" placeholder="min" name={"min-rating"}
                                           type="number" min={0} max={5}/>
                                </div>
                                <p> - </p>

                                <div className="input-wrapper">
                                    <label htmlFor="max-rating">Max rating</label>
                                    <input id="max-rating" className="" placeholder="max" name={"max-rating"}
                                           type="number" min={0} max={5}/>
                                </div>
                            </div>
                        </section>
                    </Collapsable>
                    <Collapsable title={"Price"}>
                        <section id={"price"}>
                            <div className="search-input-field-container">
                                <div className="input-wrapper">
                                    <label htmlFor="min-price">Min price</label>
                                    <input id="min-price" className="" placeholder="min" name={"min-price"}
                                           type="number" min={0}/>
                                </div>
                                <p> - </p>
                                <div className="input-wrapper">
                                    <label htmlFor="max-price">Max price</label>
                                    <input id="max-price" className="" placeholder="max" name={"max-price"}
                                           type="number" min={0}/>
                                </div>
                            </div>
                        </section>
                    </Collapsable>

                    <Collapsable title={"Course Start"}>
                        <section id={"dates"}>
                            <p>Date Range</p>

                            <DatePicker selected={startDate} onChange={dateChanged} startDate={startDate}
                                        endDate={endDate} selectsRange={true}
                                        dateFormat={"dd/MM/YYYY"}
                                        icon={<img src={"/icons/calendar-clear-sharp.svg"}/>} showIcon/>

                        </section>
                    </Collapsable>
                    <button className="cta-button" type="submit">Filter</button>
                </form>
            </div>


            <div className="search-results">
                <section id="resultsinfo">
                    <h2>3 results for "{searchValue}"</h2>
                    <div className="input-wrapper">
                        <select className="filter-dropdown" id="filter-ropdown" type="dropdown">
                            <option>Most Relevant</option>
                            <option>Price Ascending</option>
                            <option>Price Descending</option>
                            <option>Highest Reviewed</option>
                            <option>Newest</option>
                        </select>
                    </div>
                </section>
                <section id="results">
                    {courses.map((course) => <Card key={course.id} {...course}/>)}
                </section>
            </div>
        </div>
    )
}