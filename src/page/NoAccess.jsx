import "./NoAccess.css"

export default function NoAccess() {

    return(
        <div className={"no-access"}>
        <img src={"/images/403.svg"} alt={"No Access"} className="access-denied" />&nbsp;
            <h3>Access Denied</h3>
            <p>You do not have permission to access this page.</p>
        </div>
    )
}