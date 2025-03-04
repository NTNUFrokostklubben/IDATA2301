import './App.css';
import Index from "./page";
import Search from "./page/search/search";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./page/layout";
import CourseAdd from "./page/admin/course/add/courseAdd";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Layout/>}/>
            <Route index element={<Index/>}/>
            <Route path={"search"} element={<Search/>}/>
            <Route path={"admin/course/add"} element={<CourseAdd/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
