import './App.css';
import Index from "./page";
import Search from "./page/search/search";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./page/layout";
import CourseAdd from "./page/admin/course/add/courseAdd";
import AdminNav from "./page/admin/adminNav";
import CourseIndex from "./page/admin/course/courseIndex";
import CourseEdit from "./page/admin/course/edit/courseEdit";
import AdminDashboard from "./page/admin/adminDashboard";
import UserPage from "./page/userPage";
import About from "./page/about";
import Checkout from "./page/checkout";
import Course from "./page/course";

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
                        <Route path={"/admin/course"}>
                            <Route index element={<CourseIndex/>}/>
                            <Route path={"add"} element={<CourseAdd/>}/>
                            <Route path={"edit/:id"} element={<CourseEdit/>}/>
                        </Route>
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
