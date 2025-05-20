import "./search.css"
import Card from "../../component/card/card";
import {useEffect, useState} from "react";
import Collapsable from "../../component/Collapsable/collapsable";
import {courseEntity, FilterQuery} from "../../utils/Classes/commonClasses";
import DatePicker from "react-datepicker";
import {useParams, useSearchParams} from "react-router-dom";
import {AsyncApiRequest} from "../../utils/requests";
import SpinnerLoader from "../../component/modals/Spinner/spinnerLoader";
import ReactiveDatePicker from "../../component/date/reactiveDatePicker";


export default function Search() {

    const [searchParams, setSearchParams] = useSearchParams();
    const searchValue = searchParams.get("search");

    const [offerableCourses, setOfferableCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    const [startDate, setStartDate] = useState(new Date())
    // Sets the default date to the end of the year
    const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), 11, 31));

    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 900) {
                setMobileView(true);
            } else {
                setMobileView(false);
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    /**
     * Triggered once form is submitted, only changes Filter object, useEffect is called when filter object is changed
     * @param event Form submit event
     * @returns {Promise<void>}
     */
    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());

        // Flatten the filter object into URL params
        const params = new URLSearchParams();
        params.set("search", searchValue || "");

        // Date range
        params.set("startDate", new Date(startDate).getTime());
        params.set("endDate", new Date(endDate).getTime());

        // Difficulty levels (array)
        const levels = buildDifficultyLevel();
        levels.forEach(level => params.append("diffLevels", level));

        // Categories (array)
        const categories = buildCategory();
        categories.forEach(cat => params.append("categories", cat));

        // Other ranges (flattened)
        if (value["min-credits"]) params.set("min-credits", value["min-credits"]);
        if (value["max-credits"]) params.set("max-credits", value["max-credits"]);
        if (value["min-rating"]) params.set("min-rating", value["min-rating"]);
        if (value["max-rating"]) params.set("max-rating", value["max-rating"]);
        if (value["min-price"]) params.set("min-price", value["min-price"]);
        if (value["max-price"]) params.set("max-price", value["max-price"]);

        setSearchParams(params);
        // Closes the filter sidebar for mobile view once filtered
        setIsOpen(false);

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
                const filters = reconstructFilterFromParams(searchParams);
                await fetchFilteredCourses();
                setLoading(false);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [searchParams]);

    function reconstructFilterFromParams(params) {
        return new FilterQuery(
            {
                startDate: params.get("startDate") ? new Date(parseInt(params.get("startDate"))) : null,
                endDate: params.get("endDate") ? new Date(parseInt(params.get("endDate"))) : null,
            },
            params.getAll("categories") || [],
            params.getAll("diffLevels") || [],
            {
                "min-credits": params.get("min-credits"),
                "max-credits": params.get("max-credits"),
            },
            {
                "min-rating": params.get("min-rating"),
                "max-rating": params.get("max-rating"),
            },
            {
                "min-price": params.get("min-price"),
                "max-price": params.get("max-price"),
            },
            params.get("search") || ""
        );
    }

    /**
     * Fetches filtered courses from the API
     * @returns {Promise<void>}
     */
    async function fetchFilteredCourses() {
        try {
            const p = await AsyncApiRequest("GET", "/search?" + searchParams, null).then((p) => p.json());
            setOfferableCourses(p);
        } catch (e) {
            setError(true);
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
        // console.log("New dates:", start, end); // Debug
        setStartDate(start);
        setEndDate(end);

    };

    function sortCourses(event) {
        const value = event.target.value;
        let sortedCourses = [...offerableCourses];

        switch (value) {
            case "Highest Reviewed":
                sortedCourses.sort((a, b) => b.rating - a.rating);
                break;
            case "Price Ascending":
                sortedCourses.sort((a, b) => a.minDiscountedPrice - b.minDiscountedPrice);
                break;
            case "Price Descending":
                sortedCourses.sort((a, b) => b.minDiscountedPrice - a.minDiscountedPrice);
                break;
            case "Closest start date":
                sortedCourses.sort((a, b) => new Date(a.closestDate) - new Date(b.closestDate));
                break;
            default:
                break;
        }

        setOfferableCourses(sortedCourses);
    }


    return (
        <div className="search-page">
            <button className={"sidebar-toggle"} onClick={toggleSidebar}>
                <img src="/icons/menu-sharp.svg" width={"24px"} alt="toggle sidebar"/>
            </button>
            <div className={`filters ${isOpen ? "open" : ""}`}>
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
                            <label htmlFor={"daterange"}><p>Date Range</p></label>

                            {mobileView ? <>
                                <ReactiveDatePicker startDate={startDate} name={"daterange"} setStartDate={setStartDate}
                                                    mobileWidth={900}/> <span>-</span>
                                <ReactiveDatePicker startDate={endDate} setStartDate={setEndDate} name={"daterange"}
                                                    mobileWidth={900}/></>
                                :
                                <DatePicker name={"daterange"} selected={startDate} onChange={dateChanged}
                                            startDate={startDate}
                                            endDate={endDate} selectsRange={true}
                                            dateFormat={"dd/MM/yyyy"}
                                            icon={<img alt={"calendar icon"} src={"/icons/calendar-clear-sharp.svg"}/>}
                                            showIcon/>
                            }



                        </section>
                    </Collapsable>
                    <button className="cta-button" type="submit"><p>Filter</p></button>
                </form>
            </div>


            <div className="search-results">
                <section id="resultsinfo">
                    <h2>{offerableCourses.length} results for "{searchValue}"</h2>
                    <div className="input-wrapper filter-dropdown-container">
                        <label htmlFor={"filter-ropdown"}>Sort by:</label>
                        <select onChange={sortCourses} className="filter-dropdown" id="filter-ropdown" type="dropdown">
                            <option>Highest Reviewed</option>
                            <option>Price Ascending</option>
                            <option>Price Descending</option>
                            <option>Closest start date</option>
                        </select>
                    </div>
                </section>
                <section id="results">
                    {loading ? <SpinnerLoader show={true}/> : null}
                    {error ? <p className="error-message">Error fetching courses. Please try again later.</p> : null}
                    {!error && offerableCourses.map((course) => <Card key={course.course.id} {...course}/>)}
                </section>
            </div>
        </div>
    )
}