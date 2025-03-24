import  './App.css';
import Index from "./page";
import Search from "./page/search/search";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./page/layout";
import CourseAdd from "./page/admin/course/add/courseAdd";
import AdminNav from "./page/admin/adminNav";
import CourseIndex from "./page/admin/course/courseIndex";
import CourseEdit from "./page/admin/course/edit/courseEdit";
import AdminDashboard from "./page/admin/adminDashboard";
import About from "./page/about";
import UserPage from "./page/userPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Index/>}/>
                    <Route path={"search"} element={<Search/>}/>
                    <Route path={"about"} element={<About/>}/>
                    <Route path={"userPage"} element={<UserPage/>}/>
                </Route>
                <Route path={"/admin"} element={<AdminNav/>}>
                    {/*<Route index element={<AdminDashboard/>}/>*/}
                    <Route path={"/admin/course"} element={<Layout/>}>
                        <Route index element={<CourseIndex/>}/>
                        <Route path={"add"} element={<CourseAdd/>}/>
                        <Route path={"edit/:id"} element={<CourseEdit/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
