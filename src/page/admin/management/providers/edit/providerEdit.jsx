import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../../../../utils/requests";
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../../../utils/Classes/commonClasses";


export default function ProviderEdit(courseId) {
    const {id} = useParams();

    const [provider, setProvider] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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
            const p = await AsyncApiRequest("GET", "/provider/" + id, null);
            setProvider(p)
        } catch (e) {
            console.error("Error fetching offerable courses:", e);
        }
    }

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

    if (loading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="providerInfo-page">
            <h1>Edit Provider</h1>
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
        </div>
    )
}