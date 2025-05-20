import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../aggregateTable.css";
import "./providers.css"
import {createPortal} from "react-dom";
import DeleteModal from "../../../../component/modals/deleteModal";
import {Skeleton} from "@mui/material";
import {getProviders} from "../../../../utils/commonRequests";
import GradientCircularProgress from "../../../../component/loader/loader";

function ProviderTableContent({providers}) {

    const [showDeleteModal, setShowDeleteModal] = useState();
    const [focusedId, setFocusedId] = useState()

    return (
        <>
            {providers.map((provider) => (
                <tr key={provider.id}>
                    <td>
                        <img src={provider.altLogoLink}
                             alt={"image" + provider.name}/>
                        <p>{provider.name}</p>
                    </td>
                    <td>
                        <div className={"button-group"}>
                            <Link to={`/admin/management/providers/edit/${provider.id}`}>
                                <button>
                                    <img src={"/icons/pencil-sharp.svg"} alt={"edit"}/>
                                </button>
                            </Link>
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
    const [showDeleteModal, setShowDeleteModal] = useState();
    const [focusedId, setFocusedId] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                //Sleep to simulate loading
                await new Promise(resolve => setTimeout(resolve, 150));
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
                        {loading ?
                            <ProviderTableSkeleton/>
                            :
                            <ProviderTableContent providers={providers}/>
                        }
                    </tbody>
                </table>
                <div className="admin-management-cards">
                    {loading ?
                        <div className="admin-management-loader">
                            <GradientCircularProgress/>
                        </div>
                        :
                        <div className="admin-management-cards-loaded">
                            {providers.map((provider) => (
                                <div className="admin-management-card" id="providers" key={provider.id}>
                                    <div className="card-row">
                                        <img src={provider.altLogoLink}
                                             alt={"image" + provider.name}/>
                                        <p>{provider.name}</p>
                                    </div>
                                    <div className="card-row">
                                        <div className={"button-group"}>
                                            <Link to={`/admin/management/providers/edit/${provider.id}`}>
                                                <button>
                                                    <img src={"/icons/pencil-sharp.svg"} alt={"edit"}/>
                                                </button>
                                            </Link>
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
                             apiEndpoint={"/provider/"}/>,
                document.getElementById("delete-modal")
            )
        }
        <div id={"delete-modal"}/>
    </div>

    )
}