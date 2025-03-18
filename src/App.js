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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Index/>}/>
                    <Route path={"search"} element={<Search/>}/>
                </Route>
                <Route path={"/admin"} element={<AdminNav/>}>
                    {/*<Route index element={<AdminDashboard/>}/>*/}
                    <Route path={"/admin/course"} element={<CourseIndex/>}>
                        <Route index element={<CourseIndex/>}/>
                        <Route path={"course/add"} element={<CourseAdd/>}/>
                        <Route path={"course/edit/:id"} element={<CourseEdit/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
