import './App.css';
import Index from "./page";
import Search from "./page/search/search";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./page/layout";
import CourseAdd from "./page/admin/management/courses/add/courseAdd";
import AdminNav from "./page/admin/adminNav";
import CourseEdit from "./page/admin/management/courses/edit/courseEdit";
import AdminDashboard from "./page/admin/adminDashboard";
import UserPage from "./page/userPage";
import About from "./page/about";
import Checkout from "./page/checkout";
import Course from "./page/course";

import {UserContext} from "./userContext";
import Providers from "./page/admin/management/providers/providers";
import Courses from "./page/admin/management/courses/courses";
import ProviderAdd from "./page/admin/management/providers/add/providerAdd";
import ProviderEdit from "./page/admin/management/providers/edit/providerEdit";
import OfferableCourses from "./page/admin/course/offerableCourses";
import OfferableCourseAdd from "./page/admin/course/add/offerableCourseAdd";
import OfferableCourseEdit from "./page/admin/course/edit/offerableCourseEdit";
import {useState} from "react";
import {deleteAuthorizationCookies, getAuthenticatedUser} from "./utils/authentication/authentication";
import OrderComplete from "./page/orderComplete";
import NoAccess from "./page/NoAccess";
import ProtectedRoute from "./page/ProtectedRoute";

function App() {

    const [user, setUser] = useState({});

    // function userLogin(user){
    //     setUser(user)
    // }

    return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route index element={<Index/>}/>
                <Route path={"search"} element={<Search/>}/>
                <Route path={"course/:id"} element={<Course/>}/>
                <Route path={"userpage/:id"} element={<UserPage/>}/>
                <Route path={"order-complete"} element={<OrderComplete/>}/>
                <Route path={"about"} element={<About/>}/>
                <Route path={"checkout/:id"} element={<Checkout/>}/>
                <Route path={"noAccess"} element={<NoAccess/>}/>
                <Route path={"/admin"} element={<AdminNav/>}>
                    <Route index element={<AdminDashboard/>}/>
                    <Route path={"/admin/offerableCourses"}>
                        <Route index element={<OfferableCourses/>}/>
                        <Route path={"add"} element={<OfferableCourseAdd/>}/>
                        <Route path={"edit/:id"} element={<OfferableCourseEdit/>}/>
                    </Route>
                    <Route path={"/admin/management"}>
                        <Route path={"providers"}>
                            <Route index element={<Providers/>}/>
                            <Route path={"add"} element={<ProviderAdd /> }/>
                            <Route path={"edit/:id"} element={<ProviderEdit/>}/>
                        </Route>
                        <Route path={"courses"}>
                            <Route index element={<Courses/>}/>
                            <Route path={"add"} element={<CourseAdd/> }/>
                            <Route path={"edit/:id"} element={<CourseEdit/>}/>
                        </Route>
                        <Route path={"users"} element={<div>Users</div>}/>
                    </Route>
                </Route>
            </Route>

        </Routes>
    </BrowserRouter>

    );

    /**
     * Logs the user out
     */
    function logoutUser(){
        console.log("Logout User");
        deleteAuthorizationCookies();
        setUser(null);
    }

    /**
     * Check cookies if is user logged in
     */
    function tryRestoreUserSession() {
        if (!user) {
            const loggedInUser = getAuthenticatedUser();
            if (loggedInUser) {
                console.log("User session found in cookies, restoring");
                setUser(loggedInUser);
            }
        }
    }
}

export default App;
