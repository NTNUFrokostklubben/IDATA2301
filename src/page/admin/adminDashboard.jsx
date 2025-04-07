import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import "./adminDashboard.css";

export default function AdminDashboard() {

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
                                    data: [
                                        {id: 0, value: 1000, label: 'Course 1', color: "#86b6c2"},
                                        {id: 1, value: 1500, label: 'Course 2', color: "#4D7E8A"},
                                        {id: 2, value: 2000, label: 'Course 3', color: "#DAF0F4"},
                                    ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </div>
                    <h6> Total Revenue: 5500 NOK</h6>
                </div>

                <div className={"admin-dash-reviews"}>
                    <h3>Recent Reviews</h3>
                    <hr className={"solid"}/>

                    <div className={"admin-dash-reviews-list"}>

                        {/*TODO: separate the reviews into a component*/}
                        <div className={"admin-dash-review"}>
                            <div className={"admin-dash-review-text"}>
                                <span className={"admin-dash-dot"}></span> &nbsp;
                                <p>Course 1 - &nbsp; </p>
                                <p>Great course, learned a lot!</p>
                            </div>
                            &nbsp;
                            <div className={"admin-dash-review-rating"}>
                                <img width="24" src="/icons/star-sharp.svg" alt=""/>
                                &nbsp;
                                <p>5</p>
                            </div>
                        </div>

                        <div className={"admin-dash-review"}>
                            <div className={"admin-dash-review-text"}>
                                <span className={"admin-dash-dot"}></span> &nbsp;
                                <p>Course 2 - &nbsp; </p>
                                <p>Great course!</p>
                            </div>
                            &nbsp;
                            <div className={"admin-dash-review-rating"}>
                                <img width="24" src="/icons/star-sharp.svg" alt=""/>
                                &nbsp;
                                <p>4</p>
                            </div>
                        </div>

                        <div className={"admin-dash-review"}>
                            <div className={"admin-dash-review-text"}>
                                <span className={"admin-dash-dot"}></span> &nbsp;
                                <p>Course 3 - &nbsp; </p>
                                <p>Could be better tbh...</p>
                            </div>
                            &nbsp;
                            <div className={"admin-dash-review-rating"}>
                                <img width="24" src="/icons/star-sharp.svg" alt=""/>
                                &nbsp;
                                <p>3</p>
                            </div>
                        </div>

                    </div>

                </div>

                <div className={"admin-dash-users"}>
                    <h3>Users</h3>
                    <hr className={"solid"}/>

                    <div className={"admin-dash-users-result"}>
                        <h5 className={"admin-dash-user-title"}>Total registered users</h5>
                        <h6 className={"admin-dash-user-total"}>605</h6>
                        &nbsp;
                        <h5 className={"admin-dash-user-title"}>New users last 30 days</h5>
                        <h6 className={"admin-dash-user-total"}>25</h6>
                    </div>

                </div>

            </div>
        </div>

    )
}



