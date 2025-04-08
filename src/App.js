import './App.css';
import Index from "./page";
import Search from "./page/search/search";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./page/layout";
import CourseAdd from "./page/admin/course/add/courseAdd";
import AdminNav from "./page/admin/adminNav";
import OfferableCourses from "./page/admin/course/offerableCourses";
import CourseEdit from "./page/admin/course/edit/courseEdit";
import AdminDashboard from "./page/admin/adminDashboard";
import UserPage from "./page/userPage";
import About from "./page/about";
import Checkout from "./page/checkout";
import Course from "./page/course";
import Providers from "./page/admin/management/providers/providers";
import Courses from "./page/admin/management/courses/courses";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Index/>}/>
                    <Route path={"search"} element={<Search/>}/>
                    <Route path={"course/:id"} element={<Course/>}/>
                    <Route path={"userpage"} element={<UserPage/>}/>
                    <Route path={"about"} element={<About/>}/>
                    <Route path={"checkout"} element={<Checkout/>}/>
                    <Route path={"/admin"} element={<AdminNav/>}>
                        {/*<Route index element={<AdminDashboard/>}/>*/}
                        <Route path={"/admin/offerableCourses"}>
                            <Route index element={<OfferableCourses/>}/>
                            <Route path={"add"} element={<CourseAdd/>}/>
                            <Route path={"edit/:id"} element={<CourseEdit/>}/>
                        </Route>
                        <Route path={"/admin/management"}>
                            <Route path={"providers"}>
                                <Route index element={<Providers/>}/>
                                <Route path={"add"} element={<div>Add Provider</div>}/>
                                <Route path={"edit/:id"} element={<div>Edit Provider</div>}/>
                            </Route>
                            <Route path={"courses"}>
                                <Route index element={<Courses/>}/>
                                <Route path={"add"} element={<div>Add Course</div>}/>
                                <Route path={"edit/:id"} element={<div>Edit Course</div>}/>
                            </Route>
                            <Route path={"users"} element={<div>Users</div>}/>
                        </Route>
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
