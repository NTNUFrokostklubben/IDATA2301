import * as React from 'react';
import {useEffect, useState} from 'react';
import {PieChart} from '@mui/x-charts/PieChart';
import {AdminReview, AdminReviewSkeleton} from "../../component/Review/adminReview";
import "./adminDashboard.css";
import {AsyncApiRequest} from "../../utils/requests";
import {useNavigate} from "react-router-dom";
import {reviewEntity} from "../../utils/Classes/commonClasses";
import {CourseCardSkeleton} from "../../component/card/courseCard";
import {CircularProgress, circularProgressClasses, Skeleton, Typography} from "@mui/material";
import GradientCircularProgress from "../../component/loader/loader";

export default function AdminDashboard() {
    const navigate = useNavigate();

    // Stats in overview
    const [providerStats, setProviderStats]=useState([]);
    const [totalCourses, setTotalCourses]=useState([0]);
    const [totalUsers, setTotalUsers]=useState([0]);
    const [totalRevenue, setTotalRevenue]=useState([0]);
    const [avgRevenue, setAvgRevenue]=useState([0]);
    const [reviews, setReviews]=useState([0]);
    const [revenueLast30Days, setRevenueLast30Days] = useState([0]);
    const [newUsers, setNewUsers] = useState([0]);
    const [loading, setLoading] = useState(true);

    const [size, setSize] = useState(screenSetSize());
    const [hidden, setHidden] = useState(screenSetHidden());

    /**
     * Use to resize the course shown based on window size
     */
    useEffect(() => {
        const handleResize=() => {
            setSize(screenSetSize());
            setHidden(screenSetHidden());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /**
     * Fetches all stats from the API
     */
    useEffect(() => {
        const fetchdata = async() => {
            try{
                await new Promise(r => setTimeout(r, 150));
                await Promise.all([
                    fetchProviderStats(),
                    fetchReviews(),
                    fetchTotalRevenue(),
                    fetchTotalCourses(),
                    fetchTotalUsers(),
                    fetchAvgRevenue(),
                    fetchRevenueLast30Days(),
                    fetchNewUsers()
                ]);
                setLoading(false);
            } catch (err){
                console.error("Error fetching admin dashboard data: ", err);
            }
        }
        fetchdata();
    },[]);

    /**
     * Fetches all revenue data from the API
     */
    async function fetchProviderStats() {
        try{
            const data = await AsyncApiRequest("GET","/transaction/providersStats", null)
                .then(response => response.json());
            const revenue = data.map((providerStat) => ({
                id: providerStat.ID_PROVIDER,
                value: providerStat.REVENUE,
                label: providerStat.PROVIDER_NAME
            }));
            setProviderStats(revenue);
        } catch (err){
            throw new Error("Error fetching revenue data: ", err);
        }
    }

    /**
     * Fetches the recent reviews from the API
     */
    async function fetchReviews(){
        try{
            const data = await AsyncApiRequest("GET", "/userCourses/lastUserCourses", null)
                .then(response => response.json());
            const reviews = data.map((userCourse) => new reviewEntity(userCourse.id, userCourse.review?.rating,
                userCourse.review?.comment, userCourse.course?.title, userCourse.user?.name, userCourse.user?.profilePicture,
                userCourse.course?.id));
            // only show the last 10 reviews
            setReviews(reviews.slice(0, 6));
        } catch (err){
            throw new Error("Error fetching reviews: ", err);
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
            throw new Error("Error fetching total revenue: ", err);
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
            throw new Error("Error fetching total courses: ", err);
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
            throw new Error("Error fetching total users: ", err);
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
            throw new Error("Error fetching total revenue: ", err);
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
            throw new Error("Error fetching total revenue last 30 days: ", err);
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
            throw new Error("Error fetching new users: ", err);
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
                width: 1220,
                height: 300,
            }
        }
    }
    function screenSetHidden() {
        let hidden = false;
         if (window.matchMedia("(max-width: 1024px)").matches) {
             hidden = true;
         } else if(providerStats.length >= 6){
             hidden = true;
         }
         return hidden;
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
                        {loading ?
                            <GradientCircularProgress {...size}/>
                            :
                            <PieChart
                                series={[
                                    {
                                        data: providerStats,
                                        highlightScope: {fade: 'global', highlight: 'item'},
                                        faded: {innerRadius: 30, additionalRadius: -30, color: 'gray'}
                                    },
                                ]}
                                {...size}
                                slotProps={{
                                    legend: {hidden: hidden},
                                }}
                            />
                        }

                    </div>
                    &nbsp; &nbsp;
                    <hr className={"solid"}/>

                    {loading ?
                        <div className={"admin-dash-result"}>
                            <Skeleton variant={"rectangular"} className={"loader"} height={"2rem"} width={"100%"} />
                            &nbsp;
                            <Skeleton variant={"rectangular"} className={"loader"} height={"2rem"} width={"100%"} />
                        </div>
                        :
                        <div className={"admin-dash-result"}>
                            <h5 className={"admin-dash-title"}>Total Revenue</h5>
                            <h6 className={"admin-dash-total"}>{totalRevenue} NOK</h6>
                            &nbsp;
                            <h5 className={"admin-dash-title"}>Total revenue last 30 days</h5>
                            <h6 className={"admin-dash-total"}>{revenueLast30Days} NOK</h6>
                        </div>
                    }
                </div>

                <div className={"admin-dash-reviews"}>
                    <h3>Recent Reviews</h3>
                    <hr className={"solid"}/>
                    {loading ?
                        <div className={"admin-dash-reviews-list"}>
                            {Array.from({length: 6}).map((_, index) => (
                                <AdminReviewSkeleton key={index}/>
                            ))}
                        </div>
                        :
                        <div className={"admin-dash-reviews-list"}>
                            {reviews.map((review) => (
                                <AdminReview key={review.id} {...review}/>
                            ))}
                        </div>
                    }

                </div>

                <div className={"admin-dash-overview"}>
                    <div className={"admin-dash-users"}>
                        <h3>Users</h3>
                        <hr className={"solid"}/>

                        {loading ?
                            <div className={"admin-dash-result"}>
                                <Skeleton variant={"rectangular"} className={"loader"} height={"2rem"} width={"100%"}/>
                                &nbsp;
                                <Skeleton variant={"rectangular"} className={"loader"} height={"2rem"} width={"100%"}/>
                            </div>
                            :
                            <div className={"admin-dash-result"}>
                                <h5 className={"admin-dash-title"}>Total registered users</h5>
                                <h6 className={"admin-dash-total"}>{totalUsers}</h6>
                                &nbsp;
                                <h5 className={"admin-dash-title"}>New users last 30 days</h5>
                                <h6 className={"admin-dash-total"}> {newUsers} </h6>
                            </div>
                        }

                    </div>
                    <div className={"admin-dash-courses"}>
                        <h3>Courses</h3>
                        <hr className={"solid"}/>

                        {loading ?
                            <div className={"admin-dash-result"}>
                                <Skeleton variant={"rectangular"} className={"loader"} height={"2rem"} width={"100%"}/>
                                &nbsp;
                                <Skeleton variant={"rectangular"} className={"loader"} height={"2rem"} width={"100%"}/>
                            </div>
                            :
                            <div className={"admin-dash-result"}>
                                <h5 className={"admin-dash-title"}>Total courses</h5>
                                <h6 className={"admin-dash-total"}>{totalCourses}</h6>
                                &nbsp;
                                <h5 className={"admin-dash-title"}>Average revenue</h5>
                                <h6 className={"admin-dash-total"}> {avgRevenue} NOK</h6>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}