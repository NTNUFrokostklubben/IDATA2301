import "./errorFourHundred.css"

export default function NoAccess() {

    return(
        <div className={"error-four-hundred"}>
        <img src={"/images/403.svg"} alt={"No Access"} className="error-four-image" />&nbsp;
            <h3>Access Denied</h3>
            <p>You do not have permission to access this page.</p>
        </div>
    )
}