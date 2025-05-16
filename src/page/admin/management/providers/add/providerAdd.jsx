import "./providerAdd.css"
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../../../utils/Classes/commonClasses";
import {AsyncApiRequest} from "../../../../../utils/requests";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ProviderFormSkeleton} from "../edit/providerEdit";
import {uploadImage} from "../../../../../utils/commonRequests";

function ProviderFormAdd() {

    const navigate = useNavigate();

    const [providerImage, setProviderImage] = useState([])
    const [providerImageAlt, setProviderImageAlt] = useState([])

    function handleFormSubmission(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        const image = data.get("imgLink")
        const altImg = data.get("imgLinkAlt")

        const provider = new ProviderEntity(null, value.name, value.imgLink, value.imgLinkAlt);


        uploadImage(image).then((r) => {
            provider.logoLink = r;
        }).then(() => {
            uploadImage(altImg).then((r) => {
                provider.altLogoLink = r;
            }).then(() => {

                postProvider(provider).then(navigate("../"));
            })
        })
    }

    async function postProvider(provider) {
        try {
            const p = await AsyncApiRequest("POST", "/provider", provider);
        } catch (e) {
            throw e
        }
    }

    /**
     * Handles image change event.
     * Used to indicate that a new image needs to be uploaded to server.
     *
     * @param image
     * @returns {Promise<void>}
     */
    async function handleChangeImage(image, alt) {

        const img = new Image();
        img.src = URL.createObjectURL(image[0]);

        if (alt) {
            setProviderImageAlt(img)
        } else {
            setProviderImage(img);
        }
    }

    return (
        <form className="providerInfo-form" onSubmit={handleFormSubmission}>
            <section id="provider-info">
                <div className="input-wrapper"><label htmlFor="provider-name">Provider Name</label>
                    <input type="text" id="provider-name" name="name" required/></div>


                <div className={"imageUpload-wrapper"}>
                    <div className="input-wrapper">
                        <label htmlFor="provider-image">Provider Image</label>
                        <input type="file" id="provider-image" name="imgLink" accept={"image/png,image/jpeg,image/webp"}
                               onChange={(e) => handleChangeImage(e.target.files, false)} required/>
                    </div>
                    <img className={"img-preview"} src={providerImage.src}/>
                </div>

                <div className={"imageUpload-wrapper"}>
                    <div className="input-wrapper">
                        <label htmlFor="provider-alt-image">Alternative Provider Image</label>
                        <input type="file" id="provider-alt-image" name="imgLinkAlt"
                               accept={"image/png,image/jpeg,image/webp"}
                               onChange={(e) => handleChangeImage(e.target.files, true)} required/>
                    </div>
                    <img className={"img-preview"} src={providerImageAlt.src}/>
                </div>


                <button type="submit" className={"button cta-button"}>Add Provider</button>
            </section>

        </form>
    )
}

export default function ProviderAdd() {

    // TODO: Add a check to set this true if there is no connection to the server
    const [loading, setLoading] = useState(false)

    return (
        <div className="providerInfo-page">
            <h2>Add Provider</h2>
            {loading ? <ProviderFormSkeleton/> : <ProviderFormAdd/>}
        </div>
    )
}