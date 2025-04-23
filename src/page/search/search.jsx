import "./search.css"
import Card from "../../component/card/card";
import {useEffect, useState} from "react";
import Collapsable from "../../component/Collapsable/collapsable";
import {courseEntity} from "../../utils/Classes/commonClasses";
import DatePicker from "react-datepicker";


export default function Search() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())


    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const value = Object.fromEntries(data.entries());

        console.log({value});
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


    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="search-page">
            <div className="filters">
                <form onSubmit={handleSubmit} action="http://localhost:6655" method="POST">
                    <Collapsable title={"Difficulty level"}>
                        <section id="difficulty">

                            <label><input className="" type="checkbox" name={"diff-1"} value={true}/> Beginner</label>
                            <label><input className="" type="checkbox" name={"diff-2"}
                                          value={true}/> Intermediate</label>
                            <label><input className="" type="checkbox" name={"diff-3"} value={true}/> Expert</label>
                        </section>
                    </Collapsable>
                    <Collapsable title={"Course size"}>
                        <section id="size">
                            <p>ECTS credits</p>
                            <div className="search-input-field-container">
                                <div className="input-wrapper">
                                    <label htmlFor="min-size">Min</label>
                                    <input className="" id="min-size" placeholder="min" name={"min-credits"}
                                           type="number"/>
                                </div>
                                <p> - </p>
                                <div className="input-wrapper">
                                    <label htmlFor="max-size">Max</label>
                                    <input className="" id="max-size" placeholder="max" name={"max-credits"}
                                           type="number"/>
                                </div>
                            </div>
                        </section>
                    </Collapsable>
                    <Collapsable title={"Category"}>
                        <section id="category">
                            <label><input className="" type="checkbox" name={"cat-it"}/> Information
                                Technologies</label>
                            <label><input className="" type="checkbox" name={"cat-dm"}/> Digital Marketing</label>
                            <label><input className="" type="checkbox" name={"cat-be"}/> Business and
                                Entrepenaurship</label>
                            <label><input className="" type="checkbox" name={"cat-dsa"}/> Data Science and
                                Analytics</label>

                        </section>
                    </Collapsable>


                    <Collapsable title={"Ratings"}>
                        <section id="ratings">
                            <div className="search-input-field-container">
                                <div className="input-wrapper">
                                    <label htmlFor="min-rating">Min rating</label>
                                    <input id="min-rating" className="" placeholder="min" name={"min-rating"}
                                           type="number"/>
                                </div>
                                <p> - </p>

                                <div className="input-wrapper">
                                    <label htmlFor="max-rating">Max rating</label>
                                    <input id="max-rating" className="" placeholder="max" name={"max-rating"}
                                           type="number"/>
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
                                           type="number"/>
                                </div>
                                <p> - </p>
                                <div className="input-wrapper">
                                    <label htmlFor="max-price">Max price</label>
                                    <input id="max-price" className="" placeholder="max" name={"max-price"}
                                           type="number"/>
                                </div>
                            </div>
                        </section>
                    </Collapsable>

                    <Collapsable title={"Course Start"}>
                        <section id={"dates"}>
                            <div className="search-input-field-container">
                                <div className="input-wrapper"><label htmlFor="from-date">From</label>
                                    <DatePicker id={"from-date"} name={"from-date"} selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                selectsStart={true} startDate={startDate} endDate={endDate}
                                                icon={<img src={"/icons/calendar-clear-sharp.svg"}/>} showIcon/></div>

                                <p> - </p>
                                <div className="input-wrapper"><label htmlFor="to-date">To</label>
                                    <DatePicker id="to-date" name={"to-date"} selected={endDate}
                                                onChange={(date) => setEndDate(date)} selectsEnd={true}
                                                startDate={startDate} endDate={endDate} minDate={startDate}
                                                icon={<img src={"/icons/calendar-clear-sharp.svg"}/>} showIcon/></div>
                            </div>
                        </section>
                    </Collapsable>
                    <button className="cta-button" type="submit">Filter</button>
                </form>
            </div>


            <div className="search-results">
                <section id="resultsinfo">
                    <h2>3 results for "Lorem Ipsum"</h2>
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