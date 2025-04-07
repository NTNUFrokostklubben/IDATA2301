import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function AdminDashboard() {

    return (
        <div>
            {/*Css class and id name starts with "admin-dash" to avoid conflicts with other pages*/}
            <h2>Dashboard</h2>
            <p> On this page you will find the overview over your courses</p>

            <div className={"admin-dash-revenue"}>
                <h3>Revenue</h3>
                <p>Revenue overview</p>
                <div className={"admin-dash-revenue-graph"}>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </div>
            </div>



        </div>

    )
}



