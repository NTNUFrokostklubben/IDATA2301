import React, {useEffect, useState} from "react";
import {getTransactions} from "../../../../utils/commonRequests";
import {Skeleton} from "@mui/material";
import "./transactions.css"
import GradientCircularProgress from "../../../../component/loader/loader";
import {Link} from "react-router-dom";
import {createPortal} from "react-dom";
import DeleteModal from "../../../../component/modals/deleteModal";

function TransactionTableSkeleton() {

    return (
        <>
            {Array.from({length: 10}).map((_, index) => (
                <tr key={`skeleton-${index}`}>
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                    <td >
                        <Skeleton variant="text"/>
                    </td>
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                    <td>
                        <Skeleton variant="text"/>
                    </td>
                </tr>
            ))}
        </>
    )
}

function TransactionTableContent({transactions}) {

    return(
        <>
            {transactions.map((transaction) => (
                <tr key={transaction.id}>
                    <td>
                        <img src={transaction.user.profilePicture} alt={"image " + transaction.user.name}/>
                        <p>{transaction.user.name}</p>
                    </td>
                    <td>
                        <img src={transaction.offerableCourses.course.imgLink} alt={"image " + transaction.offerableCourses.course.title}/>
                        <p>{transaction.offerableCourses.course.title}</p>
                    </td>
                    <td>
                        <img src={transaction.offerableCourses.provider.altLogoLink} alt={"image " + transaction.offerableCourses.provider.name}/>
                        <p>{transaction.offerableCourses.provider.name}</p>
                    </td>
                    <td>
                        <p>
                            {new Date(transaction.timeOfTransaction).toLocaleDateString("de-DE",{
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit"
                            })}
                        </p>
                    </td>
                    <td><p>{transaction.pricePaid} NOK</p></td>

                </tr>
            ))}
        </>
    )
}

export default function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchTransactions()
                ]);
                setLoading(false);
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, []);

    async function fetchTransactions() {
        const p = await getTransactions();
        // Sort p by date, newest first
        const sorted = p.sort((a, b) => new Date(b.timeOfTransaction) - new Date(a.timeOfTransaction));

        setTransactions(sorted)
    }

    return (
        <div id={"transactions-page"}>
            <h2>Transactions</h2>
            <div id="table-header">

                <table className={"admin-table"}>
                    <thead>
                    <tr>
                        <th data-label="User" className={"User"}><p>User</p></th>
                        <th data-label="Course" className={"Course"}><p>Course</p></th>
                        <th data-label="Provider" className={"Provider"}><p>Provider</p></th>
                        <th data-label="Timestamp" className={"Timestamp"}><p>Timestamp</p></th>
                        <th data-label="Price Paid" className={"Price paid"}><p>Price paid</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? <TransactionTableSkeleton/> : <TransactionTableContent transactions={transactions}/>}
                    </tbody>
                </table>

                <div className="admin-management-cards">
                    {loading ?
                        <div className="admin-management-loader">
                            <GradientCircularProgress/>
                        </div>
                        :
                        <div className="admin-management-cards-loaded">
                            {transactions.map((transaction) => (
                                <div className="admin-management-card" key={transaction.id}>
                                    <div className="card-row">
                                        <h6>User:</h6>
                                        <img src={transaction.user.profilePicture} alt={transaction.user.name}/>
                                        <p>{transaction.user.name}</p>
                                    </div>
                                    <div className="card-row">
                                        <h6>Course:</h6>
                                        <p>{transaction.offerableCourses.course.title}</p>
                                        <img src={transaction.offerableCourses.course.imgLink}
                                             alt={transaction.offerableCourses.course.title}/>
                                    </div>
                                    <div className="card-row">
                                        <h6>Provider:</h6>
                                        <p>{transaction.offerableCourses.provider.name}</p>
                                        <img src={transaction.offerableCourses.provider.altLogoLink}
                                             alt={transaction.offerableCourses.provider.name}/>
                                    </div>
                                    <div className="card-row">
                                        <h6>Timestamp:</h6>
                                        <p>{new Date(transaction.timeOfTransaction).toLocaleDateString("de-DE", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit"
                                        })}</p>
                                    </div>
                                    <div className="card-row">
                                        <h6>Price Paid:</h6>
                                        <p>{transaction.pricePaid} NOK</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}