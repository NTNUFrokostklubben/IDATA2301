import "./search.css"
import Card from "../../component/card/card";

export default function Search() {

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const value = Object.fromEntries(data.entries());

        console.log({value});
    }

    return (
        <div className="page">
            <div className="filters">
                <form onSubmit={handleSubmit} action="http://localhost:6655" method="POST">
                    <section id="difficulty">
                        <div className="filter-header">
                            <p>Difficulty level</p>
                            <img width="12" src="/icons/triangle-sharp.svg" alt=""/>
                        </div>
                        <label><input className="" type="checkbox" name={"diff-0"}/> Beginner</label>
                        <label><input className="" type="checkbox" name={"diff-1"}/> Intermediate</label>
                        <label><input className="" type="checkbox" name={"diff-2"}/> Expert</label>
                    </section>
                    <section id="size">
                        <div className="filter-header">
                            <p>Course size</p>
                            <img width="12" src="/icons/triangle-sharp.svg" alt=""/>
                        </div>
                        <p>ECTS credits</p>
                        <div className="input-field-container">
                            <div className="input-wrapper">
                                <label htmlFor="min-size">Min</label>
                                <input className="" id="min-size" placeholder="Min" name={"min-credits"} type="number"/>
                            </div>
                            <span> - </span>
                            <div className="input-wrapper">
                                <label htmlFor="max-size">Max</label>
                                <input className="" id="max-size" placeholder="Max" name={"max-credits"} type="number"/>
                            </div>
                        </div>
                    </section>
                    <section id="category">
                        <div className="filter-header">
                            <p>Category</p>
                            <img width="12" src="/icons/triangle-sharp.svg" alt=""/>
                        </div>
                        <label><input className="" type="checkbox" name={"cat-it"}/> Information Technologies</label>
                        <label><input className="" type="checkbox" name={"cat-dm"}/> Digital Marketing</label>
                        <label><input className="" type="checkbox" name={"cat-be"}/> Business and
                            Entrepenaurship</label>
                        <label><input className="" type="checkbox" name={"cat-dsa"}/> Data Science and Analytics</label>
                    </section>
                    <section id="ratings">
                        <div className="filter-header">
                            <p>Ratings</p>
                            <img width="12" src="/icons/triangle-sharp.svg" alt=""/>
                        </div>
                        <div className="input-field-container">
                            <div className="input-wrapper">
                                <label htmlFor="min-rating">Min rating</label>
                                <input id="min-rating" className="" placeholder="Min" name={"min-rating"}
                                       type="number"/>
                            </div>
                            <span> - </span>

                            <div className="input-wrapper">
                                <label htmlFor="max-rating">Max rating</label>
                                <input id="max-rating" className="" placeholder="Max" name={"max-rating"}
                                       type="number"/>
                            </div>
                        </div>
                    </section>
                    <section id="price">
                        <div className="filter-header">
                            <p>Price</p>
                            <img width="12" src="/icons/triangle-sharp.svg" alt=""/>
                        </div>
                        <div className="input-field-container">
                            <div className="input-wrapper">
                                <label htmlFor="min-price">Min price</label>
                                <input id="min-price" className="" placeholder="Min" name={"min-price"} type="number"/>
                            </div>
                            <span> - </span>
                            <div className="input-wrapper">
                                <label htmlFor="max-price">Max price</label>
                                <input id="max-price" className="" placeholder="Max price" name={"max-price"}
                                       type="number"/>
                            </div>
                        </div>
                    </section>
                    <section id="dates">
                        <div className="filter-header">
                            <p>Course Start</p>
                            <img width="12" src="/icons/triangle-sharp.svg" alt=""/>
                        </div>
                        <div className="input-field-container">
                            <div className="input-wrapper"><label htmlFor="from-date">From</label>
                                <input id="from-date" name={"from-date"} type="date"/></div>
                            <span> - </span>
                            <div className="input-wrapper"><label htmlFor="to-date">To</label>
                                <input id="to-date" name={"to-date"} type="date"/></div>
                        </div>
                    </section>
                    <button className="cta-button" type="submit">Filter</button>
                </form>
            </div>

            <div className="results">
                <section id="resultsinfo">
                    <h2>3 results for "Lorem Ipsum"</h2>
                    <div className="input-wrapper">
                        <label htmlFor="filter-ropdown">Sort by</label>
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
                    <Card name={"Search Engine Optimization"} path={"https://picsum.photos/300/200?random=1"}/>
                    <Card name={"Azure Cloud Fundamentals"} path={"https://picsum.photos/300/200?random=2"}/>
                    <Card name={"Databricks Fundamentals"} path={"https://picsum.photos/300/200?random=3"}/>
                </section>
            </div>
        </div>
    )
}