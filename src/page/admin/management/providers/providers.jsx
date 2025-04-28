import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../aggregateTable.css";
import "./providers.css"
import {createPortal} from "react-dom";
import DeleteModal from "../../../../component/modals/deleteModal";

export default function Providers() {

    const [providers, setProviders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState();
    const [focusedId, setFocusedId] = useState()

    useEffect(() => {
        fetch("http://localhost:8080/api/providers")
            .then((response) => response.json())
            .then((data) => {
                setProviders(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching providers:", error);
                setLoading(false);
            });
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div id={"providers-page"}>
            <h2>Course Providers</h2>
            <div id={"table-header"}>
                <button id={"addProvider"} className={"cta-button"}><Link to={"/admin/management/providers/add"}>Add
                    Provider</Link></button>
                <table className={"admin-table"}>
                    <thead>
                    <tr>
                        <th className={"provider"}><p>Name</p></th>
                        <th className={"actions"}><p>Actions</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    {providers.map((provider) => (
                        <tr key={provider.id}>
                            <td>
                                <img src={"https://picsum.photos/50?random=" + provider.id}
                                     alt={provider.imgAltLink}
                                     width={50} height={50}/>
                                <p>{provider.name}</p>
                            </td>
                            <td >
                                <button className={"cta-button edit-button"}><Link
                                    to={`/admin/management/providers/edit/${provider.id}`}>Edit</Link></button>
                                <button id={"delete" + provider.id} className={"delete-button"} onClick={() => {
                                    setFocusedId(provider.id)
                                    setShowDeleteModal(true);
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {
                showDeleteModal && createPortal(
                    <DeleteModal onClose={() => setShowDeleteModal(false)} deleteId={focusedId} apiEndpoint={"/provider/"}/>,
                    document.getElementById("delete-modal")
                )
            }

            <div id={"delete-modal"}/>
        </div>

    )
}