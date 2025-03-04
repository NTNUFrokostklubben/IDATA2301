import './App.css';
import Index from "./page";
import Search from "./page/search/search";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./page/layout";
import CourseAdd from "./page/admin/course/add/courseAdd";
import AdminNav from "./page/admin/adminNav";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Index/>}/>
                    <Route path={"search"} element={<Search/>}/>
                </Route>
                <Route path={"/admin"} element={<AdminNav/>}>
                    <Route path={"course/add"} element={<CourseAdd/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
