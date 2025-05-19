import {Link, Outlet} from "react-router-dom";
import "./adminNav.css"
import Collapsable from "../../component/Collapsable/collapsable";
import {useState} from "react";
import ProtectedRoute from "../../component/routing/ProtectedRoute";

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
                                <Link to={"/admin"} onClick={() => setIsOpen(false)}>Overview</Link>
                            </li>
                            <li>
                                <Link to={"/admin/offerablecourses"} onClick={() => setIsOpen(false)}>Offerable Courses</Link>
                            </li>
                        </ul>
                    </nav>
                </Collapsable>
                <Collapsable title={"Management"} defaultOpen={true}>
                    <nav id="Management">
                        <ul>
                            <li>
                                <Link to={"/admin/management/providers"} onClick={() => setIsOpen(false)}>Providers</Link>
                            </li>
                            <li>
                                <Link to={"/admin/management/courses"} onClick={() => setIsOpen(false)}>Courses</Link>
                            </li>
                            <li>
                                <Link to={"/admin/management/users"} onClick={() => setIsOpen(false)}>Users</Link>
                            </li>
                            <li>
                                <Link to={"/admin/management/transactions"} onClick={() => setIsOpen(false)}>Transactions</Link>
                            </li>

                        </ul>
                    </nav>
                </Collapsable>
            </div>

            <ProtectedRoute className={"testclass"}><Outlet/></ProtectedRoute>
        </div>
    )
}