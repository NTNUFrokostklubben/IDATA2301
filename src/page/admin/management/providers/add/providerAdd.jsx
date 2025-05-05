import "./providerAdd.css"
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../../../utils/Classes/commonClasses";
import {AsyncApiRequest} from "../../../../../utils/requests";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ProviderFormSkeleton} from "../edit/providerEdit";

function ProviderFormAdd() {

    const navigate = useNavigate();

    function handleFormSubmission(event) {
        event.preventDefault();


        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        const provider = new ProviderEntity(null, value.name, value.imgLink, value.imgLinkAlt);

        postProvider(provider)
            .then(alert("Successfully added Provider")).then(navigate(-1))
    }

    async function postProvider(provider) {
        // console.log(offerableCourse)
        try {
            const p = await AsyncApiRequest("POST", "/provider", provider);
        } catch (e) {
            throw e
        }
    }

    return (
        <form className="providerInfo-form" onSubmit={handleFormSubmission}>
            <section id="provider-info">
                <div className="input-wrapper"><label htmlFor="provider-name">Provider Name</label>
                    <input type="text" id="provider-name" name="name" required/></div>


                <div className="group-2">
                    {/*TODO: Add preview of uploaded image (javascript component)*/}
                    <div className="input-wrapper">
                        <label htmlFor="provider-image">Provider Image</label>
                        <input type="file" id="provider-image" name="imgLink" required/>
                    </div>

                    {/*TODO: Add preview of uploaded image (javascript component)*/}
                    <div className="input-wrapper">
                        <label htmlFor="provider-alt-image">Alternative Provider Image</label>
                        <input type="file" id="provider-alt-image" name="imgLinkAlt" required/>
                    </div>
                </div>


                <button type="submit" className={"button cta-button"}>Add Provider</button>
            </section>

        </form>
    )
}

export default function ProviderAdd() {

    // TODO: Add a check to set this true if there is no connection to the server
    const [loading, setLoading] = useState(false)

    return(
        <div className="providerInfo-page">
            <h2>Add Provider</h2>
            {loading ? <ProviderFormSkeleton/> : <ProviderFormAdd/>}
        </div>
    )
}