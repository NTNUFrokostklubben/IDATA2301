import "./errorFourHundred.css"

export default function NotFound() {

    return(
        <div className={"error-four-hundred"}>
            <img src={"/images/404.svg"} alt={"No Access"} className="error-four-image" />&nbsp;
            <h3>Oops! This course doesn't exist yet</h3>
            <p>Come back later, surely it will be here then.</p>
        </div>
    )
}