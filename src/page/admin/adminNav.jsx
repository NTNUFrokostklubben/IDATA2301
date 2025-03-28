import {Link, Outlet} from "react-router-dom";
import "./adminNav.css"

export default function AdminNav() {
    return (
        <div className={"page"}>
            <div className="admin-sidebar">
                {/*TODO: Refactor admin sidebar out into separate layout for admin pages*/}
                <nav id="dashboard">
                    <div className="filter-header">
                        <p>Dashboard</p>
                        <img width="12" src="/icons/triangle-sharp.svg" alt=""/>
                    </div>
                    <ul>
                        <li>
                            <Link>Overview</Link>
                        </li>
                        <li>
                            <Link to={"/admin/course"}>Courses</Link>
                        </li>
                        <li>
                            <Link>Analytics</Link>
                        </li>
                    </ul>
                </nav>
                <nav id="Management">
                    <div className="filter-header">
                        <p>Management</p>
                        <img width="12" src="/icons/triangle-sharp.svg" alt=""/>
                    </div>
                    <ul>
                        <li>
                            <Link>Providers</Link>
                        </li>
                        <li>
                            <Link>Users</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet/>
        </div>
    )
}