import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../../../../utils/requests";
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../../../utils/Classes/commonClasses";
import {Skeleton} from "@mui/material";
import {getProvider} from "../../../../../utils/commonRequests";

/**
 * Skeleton component for the ProviderForm
 *
 * @returns {JSX.Element}
 * @constructor
 */
export function ProviderFormSkeleton() {
    return (
        // Uses same ID as loaded form for styling purposes. Only 1 can be loaded at a time so this should be fine
            <div className={"provider-skeleton"} id="provider-info">
                <div className="input-wrapper"><label htmlFor="provider-name">Provider Name</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"} /></div>


                <div className="group-2">
                    {/*TODO: Add preview of uploaded image (javascript component)*/}
                    <div className="input-wrapper">
                        <label htmlFor="provider-image">Provider Image</label>
                        <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"} />
                    </div>

                    {/*TODO: Add preview of uploaded image (javascript component)*/}
                    <div className="input-wrapper">
                        <label htmlFor="provider-alt-image">Alternative Provider Image</label>
                        <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"} />
                    </div>
                </div>


                <Skeleton variant={"rectangular"} className={"cta-button"} height={"2.5rem"} sx={"background-color: var(--cta)"} />
            </div>
    )
}

function ProviderEditForm({provider}) {
    const navigate = useNavigate();

    function handleFormSubmission(event) {
        event.preventDefault();


        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        const provider = new ProviderEntity(value.id, value.name, value.imgLink, value.imgLinkAlt);

        postProvider(provider)
            .then(alert("Successfully added Offerable Course")).then(navigate(-1))
    }

    async function postProvider(provider) {
        try {
            await AsyncApiRequest("POST", "/provider", provider);
        } catch (e) {
            throw e
        }
    }

    return (
        <form className="providerInfo-form" onSubmit={handleFormSubmission}>

            <section id="provider-info">
                <input id={"id"} name={"id"} type={"number"} hidden={true} value={provider.id}/>
                <div className="input-wrapper"><label htmlFor="provider-name">Provider Name</label>
                    <input type="text" id="provider-name" name="name" defaultValue={provider.name} required/></div>


                <div className="group-2">
                    {/*TODO: Add preview of uploaded image (javascript component)*/}
                    <div className="input-wrapper">
                        <label htmlFor="provider-image">Provider Image</label>
                        <input type="file" id="provider-image" name="imgLink" defaultValue={provider.imgLink}
                               required/>
                    </div>

                    {/*TODO: Add preview of uploaded image (javascript component)*/}
                    <div className="input-wrapper">
                        <label htmlFor="provider-alt-image">Alternative Provider Image</label>
                        <input type="file" id="provider-alt-image" name="imgLinkAlt"
                               defaultValue={provider.imgAltLink} required/>
                    </div>
                </div>


                <button type="submit" className={"button cta-button"}>Update Provider</button>
            </section>

        </form>
    )

}

export default function ProviderEdit(courseId) {
    const {id} = useParams();

    const [provider, setProvider] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchProvider();
                setLoading(false);
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, []);


    /**
     * Fetches all providers from the API
     *
     * @returns {Promise<void>}
     */
    async function fetchProvider() {
        try {
            const p = await getProvider(id);
            setProvider(p)
        } catch (e) {
            throw new Error("Error fetching provider: " + e);
        }
    }


    return (
        <div className="providerInfo-page">
            <h2>Edit Provider</h2>
            {loading ? <ProviderFormSkeleton/> : <ProviderEditForm provider={provider}/>}
        </div>
    )
}