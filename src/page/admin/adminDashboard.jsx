import * as React from 'react';
import {useEffect, useState} from 'react';
import {PieChart} from '@mui/x-charts/PieChart';
import AdminReview from "../../component/Rating/adminReview";
import "./adminDashboard.css";
import {AsyncApiRequest} from "../../utils/requests";
import {useNavigate} from "react-router-dom";
import {getAuthenticatedUser, isAdmin} from "../../utils/authentication/authentication";
// import {runOnLoad} from "../../utils/tools";

class reviewEntity {
      constructor(id, rating, comment, courseTitle, userName, profilePicture, courseID){
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.title = courseTitle;
        this.user = userName;
        this.profilePicture = profilePicture;
        this.courseId = courseID;
    }
}

export default function AdminDashboard() {
    const navigate = useNavigate();


    // Stats in overview
    const [revenueData, setRevenueData]=useState([]);
    const [totalCourses, setTotalCourses]=useState([]);
    const [totalUsers, setTotalUsers]=useState([]);
    const [totalRevenue, setTotalRevenue]=useState([]);
    const [avgRevenue, setAvgRevenue]=useState([]);
    const [reviews, setReviews]=useState([]);
    const [revenueLast30Days, setRevenueLast30Days] = useState([])
    const [newUsers, setNewUsers] = useState([])

    const [size, setSize] = useState(screenSetSize());
    const [hidden, setHidden] = useState(screenSetHidden());

    // Use to resize the course shown based on window size
    useEffect(() => {
        const handleResize=() => {
            setSize(screenSetSize());
            setHidden(screenSetHidden());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetches all stats from the API
    useEffect(() => {
        if (revenueData.length === 0) {
            fetchRevenueData();
        }
        if (reviews.length === 0){
            fetchReviews();
        }
        if (totalRevenue<=0){
            fetchTotalRevenue();
        }
        if (totalCourses<=0){
            fetchTotalCourses();
        }
        if (totalUsers<=0){
            fetchTotalUsers();
        }
        if (avgRevenue<=0){
            fetchAvgRevenue();
        }
        if (revenueLast30Days<=0){
            fetchRevenueLast30Days();
        }
        if (newUsers<=0){
            fetchNewUsers();
        }
    },);

    /**
     * Fetches all revenue data from the API
     */
    async function fetchRevenueData() {
        try{
            const data = await AsyncApiRequest("GET","/transaction/providersStats", null)
                .then(response => response.json());
            const revenue = data.map((providerStat) => ({
                id: providerStat.ID_PROVIDER,
                value: providerStat.REVENUE,
                label: providerStat.PROVIDER_NAME
            }));
            setRevenueData(revenue);
        } catch (err){
            console.error("Error fetching provider stats : ", err);
        }
    }

    /**
     * Fetches the recent reviews from the API
     */
    async function fetchReviews(){
        try{
            const data = await AsyncApiRequest("GET", "/userCourses/lastReviews", null)
                .then(response => response.json());
            const reviews = data.map((review) => new reviewEntity(review.id, review.rating,
                review.comment, review.course.title, review.user.name, review.user.profilePicture,
                review.course.id));
            setReviews(reviews);
        } catch (err){
            console.log("Error fetching reviews: ", err)
        }
    }

    /**
     * Fetches the total revenue from the API
     */
    async function fetchTotalRevenue(){
        try{
            const data = await AsyncApiRequest("GET", "/transaction/totalRevenue", null)
                .then(response => response.json());
            setTotalRevenue(data);
        } catch (err){
            console.log("Error fetching total revenue: ", err);
        }
    }

    /**
     * Fetches the total courses from the API
     */
    async function fetchTotalCourses(){
        try{
            const data = await AsyncApiRequest("GET", "/courses/total", null)
                .then(response => response.json());
            setTotalCourses(data);
        } catch (err){
            console.log("Error fetching total courses: ", err);
        }
    }

    /**
     * Fetches the total users from the API
     */
    async function fetchTotalUsers(){
        try{
            const data = await AsyncApiRequest("GET", "/users/total", null)
                .then(response => response.json());
            setTotalUsers(data);
        } catch (err){
            console.log("Error fetching total revenue: ", err);
        }
    }

    /**
     * Fetches the average revenue from the API
     */
    async function fetchAvgRevenue(){
        try{
            const data = await AsyncApiRequest("GET", "/transaction/averageRevenuePerCourse", null)
                .then(response => response.json());
            setAvgRevenue(data);
        } catch (err){
            console.log("Error fetching total revenue: ", err);
        }
    }

    /**
     * Fetches the total courses from the API
     */
    async function fetchRevenueLast30Days(){
        try{
            const data = await AsyncApiRequest("GET", "/transaction/revenueLast30Days", null)
                .then(response => response.json());
            setRevenueLast30Days(data);
        } catch (err){
            console.log("Error fetching total courses: ", err);
        }
    }

    /**
     * Fetches the total users from the API
     */
    async function fetchNewUsers(){
        try{
            const data = await AsyncApiRequest("GET", "/users/newUsers", null)
                .then(response => response.json());
            setNewUsers(data);
        } catch (err){
            console.log("Error fetching total revenue: ", err);
        }
    }

    function screenSetSize() {
        let innerWidth = window.innerWidth;
        if (window.matchMedia("(max-width: 1024px)").matches) {
            return {
                width: innerWidth* 0.8,
                height: 200,
            };
        }  else if (window.matchMedia("(max-width: 1600px)").matches) {
            return {
                width: innerWidth * 0.55,
                height: 200,
            };
        }  else if (window.matchMedia("(max-width: 2000px)").matches) {
            return {
                width: innerWidth * 0.6,
                height: 250,
            };
        } else {
            return {
                width: 1200,
                height: 300,
            }
        }
    }
    function screenSetHidden() {
         return !!(window.matchMedia("(max-width: 700px)").matches);
    }

    return (
        <div className={"admin-dash"}>
            {/*Css class and id name starts with "admin-dash" to avoid conflicts with other pages*/}
            <h2>Dashboard</h2>
            <p> On this page you will find the overview over your courses</p>

            <div className={"admin-dash-content"}>

                <div className={"admin-dash-revenue"}>
                    <h3>Revenue</h3>
                    <p>Revenue overview</p>
                    <div className={"admin-dash-revenue-graph"}>
                        <PieChart
                            series={[
                                {
                                    data: revenueData,
                                    highlightScope: {fade: 'global', highlight: 'item'},
                                    faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'}
                                },
                            ]}
                            {...size}
                            slotProps={{
                                legend: {hidden: hidden},
                            }}
                        />
                    </div>
                    &nbsp; &nbsp;
                    <hr className={"solid"}/>

                    <div className={"admin-dash-result"}>
                        <h5 className={"admin-dash-title"}>Total Revenue</h5>
                        <h6 className={"admin-dash-total"}>{totalRevenue} NOK</h6>
                        &nbsp;
                        <h5 className={"admin-dash-title"}>Total revenue last 30 days</h5>
                        <h6 className={"admin-dash-total"}>{revenueLast30Days} NOK</h6>
                    </div>
                </div>


                <div className={"admin-dash-reviews"}>
                    <h3>Recent Reviews</h3>
                    <hr className={"solid"}/>
                    <div className={"admin-dash-reviews-list"}>
                        {reviews.map((review) => (
                            <AdminReview key={review.id} {...review}/>
                        ))}
                    </div>
                </div>

                <div className={"admin-dash-overview"}>
                    <div className={"admin-dash-users"}>
                        <h3>Users</h3>
                        <hr className={"solid"}/>
                        <div className={"admin-dash-result"}>
                            <h5 className={"admin-dash-title"}>Total registered users</h5>
                            <h6 className={"admin-dash-total"}>{totalUsers}</h6>
                            &nbsp;
                            <h5 className={"admin-dash-title"}>New users last 30 days</h5>
                            <h6 className={"admin-dash-total"}> {newUsers} </h6>
                        </div>
                    </div>
                    <div className={"admin-dash-courses"}>
                        <h3>Courses</h3>
                        <hr className={"solid"}/>

                        <div className={"admin-dash-result"}>
                            <h5 className={"admin-dash-title"}>Total courses</h5>
                            <h6 className={"admin-dash-total"}>{totalCourses}</h6>
                            &nbsp;
                            <h5 className={"admin-dash-title"}>Average revenue</h5>
                            <h6 className={"admin-dash-total"}> {avgRevenue} NOK</h6>
                        </div>
                    </div>
                 </div>
             </div>
        </div>
    )
}



