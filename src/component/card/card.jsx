import "./card.css";

export default function Card(props) {

    class image {
        constructor(name, path) {
            this.name = name;
            this.path = path;
        }
    }

    if (props.path === undefined) {
        props.path = "https://picsum.photos/300/200?random=2";
    }

    const cardImg =  new image(props.name, props.path)

    return (
        <section className="card">
            <img className="course-img" src={cardImg.path} alt=""/>
            <b>{props.name}</b>
            <p className="card-desc">Embark on your cloud computing journey with our beginner-level online course,
                "Azure Fundamentals,"
                meticulously crafted to prepare you for the AZ-900 exam</p>
            <p className="infotext">10 hours per week • Beginner • 2 ECTS credits</p>
            <div className="card-footer">
                <div className="rating">

                    <img width="24" src="/icons/star-sharp.svg" alt=""/>
                    <b>3.4</b>
                    (152)

                </div>
                <p id="price2">10 000 NOK</p>
            </div>
        </section>
    )
}