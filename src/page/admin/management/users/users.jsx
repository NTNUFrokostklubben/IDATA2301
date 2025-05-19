import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getProviders, getUsers} from "../../../../utils/commonRequests";
import "./users.css"
import {Skeleton} from "@mui/material";
import {createPortal} from "react-dom";
import DeleteModal from "../../../../component/modals/deleteModal";
import GradientCircularProgress from "../../../../component/loader/loader";

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
                        <img src={user.profilePicture} alt={"image " + user.name}/>
                        <p>{user.email}</p>
                    </td>
                    <td ><p>{user.name}</p></td>
                    <td ><p>{user.role.map((role) => (
                        <p key={role.id} className={"role"}>{role.name}</p>
                    ))}</p>
                    </td>
                    <td><p>{user.active ? "Yes" : "No"}</p></td>
                    <td>
                        <div className={"button-group"}>
                            <Link to={`/admin/management/users/edit/${user.id}`}>
                                <button>
                                    <img src={"/icons/pencil-sharp.svg"} alt={"edit"}/>
                                </button>
                            </Link>

                            <button id={"delete" + user.id} onClick={() => {
                                setFocusedId(user.id)
                                setShowDeleteModal(true);
                            }}><img src={"/icons/trash-sharp.svg"} id={"delete"}/>
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            {
                showDeleteModal && createPortal(
                    <DeleteModal onClose={() => setShowDeleteModal(false)} deleteId={focusedId}
                                 apiEndpoint={"/user/"}/>,
                    document.getElementById("delete-modal")
                )
            }
        </>
    )


}


export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [focusedId, setFocusedId] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                //Sleep to simulate loading
                await new Promise(resolve => setTimeout(resolve, 150));
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

                <div className="admin-management-cards">
                    {loading ?
                        <div className="admin-management-loader">
                            <GradientCircularProgress/>
                        </div>
                        :
                        <div>
                            {users.map((user) => (
                                <div className="admin-management-card" key={user.id}>
                                    <div className="card-row">
                                        <h6>User:</h6>
                                        <img src={user.profilePicture} alt={"image " + user.name}/>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="card-row">
                                        <h6>User roles:</h6>
                                        <p>
                                            {user.role.map((role) => (
                                                <p key={role.id} className={"role"}>{role.name}</p>
                                            ))}
                                        </p>
                                    </div>
                                    <div className="card-row">
                                        <h6>Active:</h6>
                                        <p>{user.active ? "Yes" : "No"}</p>
                                    </div>
                                    <div className="card-row">
                                        <div className={"button-group"}>
                                            <Link to={`/admin/management/users/edit/${user.id}`}>
                                                <button>
                                                    <img src={"/icons/pencil-sharp.svg"} alt={"edit"}/>
                                                </button>
                                            </Link>
                                            <button id={"delete" + user.id} onClick={() => {
                                                setFocusedId(user.id)
                                                setShowDeleteModal(true);
                                            }}>
                                                <img src={"/icons/trash-sharp.svg"} alt={"delete"}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
            {
                showDeleteModal && createPortal(
                    <DeleteModal onClose={() => setShowDeleteModal(false)} deleteId={focusedId}
                                 apiEndpoint={"/user/"}/>,
                    document.getElementById("delete-modal")
                )
            }

            <div id={"delete-modal"}/>
        </div>

    )
}