import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../aggregateTable.css";
import "./providers.css"
import {createPortal} from "react-dom";
import DeleteModal from "../../../../component/modals/deleteModal";
import {Skeleton} from "@mui/material";
import {getProviders} from "../../../../utils/commonRequests";

function ProviderTableContent({providers}) {

    const [showDeleteModal, setShowDeleteModal] = useState();
    const [focusedId, setFocusedId] = useState()

    return (
        <>
            {providers.map((provider) => (
                <tr key={provider.id}>
                    <td>
                        <img src={provider.altLogoLink}
                             alt={""}/>
                        <p>{provider.name}</p>
                    </td>
                    <td >
                        <div className={"button-group"}><Link
                            to={`/admin/management/providers/edit/${provider.id}`}>

                            <button><img src={"/icons/pencil-sharp.svg"}/></button>
                        </Link>


                            <button id={"delete" + provider.id} onClick={() => {
                                setFocusedId(provider.id)
                                setShowDeleteModal(true);
                            }}><img src={"/icons/trash-sharp.svg"}/>
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            {
                showDeleteModal && createPortal(
                    <DeleteModal onClose={() => setShowDeleteModal(false)} deleteId={focusedId}
                                 apiEndpoint={"/provider/"}/>,
                    document.getElementById("delete-modal")
                )
            }
        </>
    )
}

/**
 * Renders skeletons for the provider table
 *
 * @returns {Element}
 * @constructor
 */
function ProviderTableSkeleton() {
    return (

        <>
            {Array.from({length: 10}).map((_, index) => (
                <tr key={`skeleton-${index}`}>
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

export default function Providers() {

    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchProviders()
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
    async function fetchProviders() {
        const p = await getProviders();
        setProviders(p)
    }

    return (
        <div id={"providers-page"}>
            <h2>Course Providers</h2>
            <div id={"table-header"}>
                <Link to={"/admin/management/providers/add"}>
                    <button id={"addProvider"} className={"cta-button"}>Add Provider</button>
                </Link>

                <table className={"admin-table"}>
                    <thead>
                    <tr>
                        <th className={"provider"}><p>Name</p></th>
                        <th className={"actions"}><p>Actions</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? <ProviderTableSkeleton/> : <ProviderTableContent providers={providers}/>}
                    </tbody>
                </table>
            </div>


            <div id={"delete-modal"}/>
        </div>

    )
}