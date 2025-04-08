import {Link, Outlet} from "react-router-dom";
import "./adminNav.css"
import Collapsable from "../../component/Collapsable/collapsable";

export default function AdminNav() {
    return (
        <div className={"admin-sidebar-container"}>
            <div className="admin-sidebar">
                {/*TODO: Refactor admin sidebar out into separate layout for admin pages*/}

                    <Collapsable title={"Dashboard"} defaultOpen={true}>
                        <nav id="dashboard">
                        <ul>
                            <li>
                                <Link to={"/admin"}>Overview</Link>
                            </li>
                            <li>
                                <Link to={"/admin/course"}>Courses</Link>
                            </li>
                        </ul>
                        </nav>
                    </Collapsable>



                <Collapsable title={"Management"} defaultOpen={true}>
                    <nav id="Management">
                        <ul>
                            <li>
                                <Link>Providers</Link>
                            </li>
                            <li>
                                <Link>Users</Link>
                            </li>
                        </ul>
                    </nav>
                </Collapsable>

            </div>
            <Outlet/>
        </div>
    )
}