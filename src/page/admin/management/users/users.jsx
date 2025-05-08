import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getProviders, getUsers} from "../../../../utils/commonRequests";
import "./users.css"
import {Skeleton} from "@mui/material";

function UserTableSkeleton() {

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

function UserTableContent({users}) {

    const [showDeleteModal, setShowDeleteModal] = useState();
    const [focusedId, setFocusedId] = useState();


    return (
        <>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>
                        <img src={user.profilePicture}/>
                        <p>{user.email}</p>
                    </td>
                    <td ><p>{user.name}</p></td>
                    <td ><p>{user.role.map((role) => (
                        <p key={role.id} className={"role"}>{role.name}</p>
                    ))}</p></td>
                    <td><p>{user.active ? "Yes" : "No"}</p></td>
                    <td>
                        <div className={"button-group"}>
                            <Link to={`/admin/management/users/edit/${user.id}`}>
                                <button>
                                    <img src={"/icons/pencil-sharp.svg"}/>
                                </button>
                            </Link>

                            <button id={"delete" + user.id} onClick={() => {
                                setFocusedId(user.id)
                                setShowDeleteModal(true);
                            }}><img src={"/icons/trash-sharp.svg"}/>
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )


}


export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchUsers()
                ]);
                setLoading(false);
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()

    }, [])

    /**
     * Fetches all providers from the API
     *
     * @returns {Promise<void>}
     */
    async function fetchUsers() {
        const p = await getUsers();
        console.log(p)
        setUsers(p)
    }

    return (
        <div id={"users-page"}>
            <h2>Users</h2>
            <div id={"table-header"}>

                <table className={"admin-table"}>
                    <thead>
                    <tr>
                        <th className={"email"}><p>Email</p></th>
                        <th className={"full-name"}><p>Full Name</p></th>
                        <th className={"roles"}><p>Roles</p></th>
                        <th className={"active"}><p>Active</p></th>
                        <th className={"actions"}><p>Actions</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? <UserTableSkeleton/> : <UserTableContent users={users}/>}
                    </tbody>
                </table>
            </div>


            <div id={"delete-modal"}/>
        </div>

    )
}