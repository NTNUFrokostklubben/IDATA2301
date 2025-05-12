import React, {useEffect, useState} from "react";
import {getTransactions} from "../../../../utils/commonRequests";
import {Skeleton} from "@mui/material";
import "./transactions.css"

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
                    <td>{new Date(transaction.timeOfTransaction).toLocaleDateString("de-DE",{
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    })}</td>
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
            <div id={"table-header"}>

                <table className={"admin-table"}>
                    <thead>
                    <tr>
                        <th className={"User"}><p>User</p></th>
                        <th className={"Course"}><p>Course</p></th>
                        <th className={"Provider"}><p>Provider</p></th>
                        <th className={"Timestamp"}><p>Timestamp</p></th>
                        <th className={"Price paid"}><p>Price paid</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? <TransactionTableSkeleton/> : <TransactionTableContent transactions={transactions}/>}
                    </tbody>
                </table>
            </div>


            <div id={"delete-modal"}/>
        </div>

    )
}