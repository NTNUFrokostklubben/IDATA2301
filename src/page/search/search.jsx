import "./search.css"
import Card from "../../component/card/card";
import {useEffect, useState} from "react";
import Collapsable from "../../component/Collapsable/collapsable";
import {courseEntity, FilterQuery} from "../../utils/Classes/commonClasses";
import DatePicker from "react-datepicker";
import {useParams, useSearchParams} from "react-router-dom";
import {AsyncApiRequest} from "../../utils/requests";


export default function Search() {

    const [searchParams, setSearchParams] = useSearchParams();
    const searchValue = searchParams.get("search");

    const [offerableCourses, setOfferableCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState(new Date())
    // Sets the default date to the end of the year
    const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), 11, 31));

    const [filters, setFilters] = useState(buildDefaultFilter())

    /**
     * Triggered once form is submitted, only changes Filter object, useEffect is called when filter object is changed
     * @param event Form submit event
     * @returns {Promise<void>}
     */
    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());

        const builtFilters = new FilterQuery({
            ["startDate"]: startDate.getTime(),
            ["endDate"]: endDate.getTime()
        }, buildCategory(), buildDifficultyLevel(), {
            ["min-credits"]: value["min-credits"],
            ["max-credits"]: value["max-credits"]
        }, {
            ["min-rating"]: value["min-rating"],
            ["max-rating"]: value["max-rating"]
        }, {["min-price"]: value["min-price"], ["max-price"]: value["max-price"]}, searchValue);

        setFilters(builtFilters)

    }

    /**
     * Builds a default filter that gets all courses for this year when page is loaded
     *
     * @returns {FilterQuery}
     */
    function buildDefaultFilter() {
        const builtFilters = new FilterQuery({
            ["startDate"]: startDate.getTime(),
            ["endDate"]: new Date(new Date().getFullYear(), 11, 31)
        }, buildCategory(), buildDifficultyLevel(), {
            ["min-credits"]: null,
            ["max-credits"]: null
        }, {
            ["min-rating"]: null,
            ["max-rating"]: null
        }, {["min-price"]: null, ["max-price"]: null}, searchValue);

        return builtFilters;
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

    /**
     * Fetches all courses from the API.
     * Called whenever filter object is changed
     */
    useEffect(() => {

        const fetchData = async () => {
            try {
                await fetchFilteredCourses();
                setLoading(false);
            } catch (e) {
                console.error(e)
            }
        }

        fetchData();
        console.log(filters)
    }, [filters]);


    /**
     * Fetches filtered courses from the API
     * @returns {Promise<void>}
     */
    async function fetchFilteredCourses() {
        try {
            const p = await AsyncApiRequest("POST", "/search", filters).then((p) => p.json());
            setOfferableCourses(p);
        } catch (e) {
            console.error("Error fetching offerable courses:", e);
        }
    }

    /**
     * Handles date changes in the date range picker
     *
     * @param dates Array of dates
     */
    const dateChanged = (dates) => {
        const [start, end] = dates;
        console.log("New dates:", start, end); // Debug
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
                                        dateFormat={"dd/MM/yyyy"}
                                        icon={<img src={"/icons/calendar-clear-sharp.svg"}/>} showIcon/>

                        </section>
                    </Collapsable>
                    <button className="cta-button" type="submit">Filter</button>
                </form>
            </div>


            <div className="search-results">
                <section id="resultsinfo">
                    <h2>{offerableCourses.length} results for "{searchValue}"</h2>
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
                    {offerableCourses.map((course) => <Card key={course.course.id} {...course}/>)}
                </section>
            </div>
        </div>
    )
}