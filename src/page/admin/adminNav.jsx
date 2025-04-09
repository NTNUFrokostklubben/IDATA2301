import {Link, Outlet} from "react-router-dom";
import "./adminNav.css"
import Collapsable from "../../component/Collapsable/collapsable";
import {useState} from "react";

export default function AdminNav() {

    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={"admin-sidebar-container"}>
            <button className={"sidebar-toggle"} onClick={toggleSidebar}>
                <img src="/icons/menu-sharp.svg" width={"24px"} alt="toggle sidebar"/>
            </button>
            <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
                <Collapsable title={"Dashboard"} defaultOpen={true}>
                    <nav id="dashboard">
                        <ul>
                            <li>
                                <Link>Overview</Link>
                            </li>
                            <li>
                                <Link to={"/admin/offerablecourses"}>Offerable Courses</Link>
                            </li>
                            <li>
                                <Link>Analytics</Link>
                            </li>
                        </ul>
                    </nav>
                </Collapsable>
                <Collapsable title={"Management"} defaultOpen={true}>
                    <nav id="Management">
                        <ul>
                            <li>
                                <Link to={"/admin/management/providers"}>Providers</Link>
                            </li>
                            <li>
                                <Link to={"/admin/management/courses"}>Courses</Link>
                            </li>
                            <li>
                                <Link>Users</Link>
                            </li>

                        </ul>
                    </nav>
                </Collapsable>
            </div>

            <div className={"testclass"}><Outlet/></div>
        </div>
    )
}