import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../../../../utils/requests";
import {courseEntity, OfferableCourse, ProviderEntity} from "../../../../../utils/Classes/commonClasses";
import {Skeleton} from "@mui/material";
import {getProvider, uploadImage} from "../../../../../utils/commonRequests";

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
                <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/></div>


            <div className="group-2">
                <div className="input-wrapper">
                    <label htmlFor="provider-image">Provider Image</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="provider-alt-image">Alternative Provider Image</label>
                    <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/>
                </div>
            </div>


            <Skeleton variant={"rectangular"} className={"cta-button"} height={"2.5rem"}
                      sx={"background-color: var(--cta)"}/>
        </div>
    )
}

function ProviderEditForm({provider}) {
    const navigate = useNavigate();
    const [providerImage, setProviderImage] = useState([])
    const [providerImageAlt, setProviderImageAlt] = useState([])

    const [imageChanged, setImageChanged] = useState(false)
    const [altImgChanged, setAltImgChanged] = useState(false)

    useEffect(() => {
        const img = new Image();
        img.src = provider.logoLink;
        setProviderImage(img);

        const imgAlt = new Image();
        imgAlt.src = provider.altLogoLink;
        setProviderImageAlt(imgAlt);

    }, [provider.logoLink, provider.altLogoLink]);

    function handleFormSubmission(event) {
        event.preventDefault();


        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        const image = data.get("imgLink")
        const altImg = data.get("imgLinkAlt")
        const builtProvider = new ProviderEntity(value.id, value.name, value.imgLink, value.imgLinkAlt);


        if (imageChanged && altImgChanged) {
            uploadImage(image).then((r) => {
                builtProvider.logoLink = r;
            }).then(() => {
                uploadImage(altImg).then((r) => {
                    builtProvider.altLogoLink = r;
                }).then(() => {
                    postProvider(builtProvider).then(navigate(-1));
                })
            })

        } else if (imageChanged) {
            uploadImage(image).then((r) => {
                builtProvider.logoLink = r;
            }).then(() => {
                builtProvider.altLogoLink = provider.altLogoLink;
                postProvider(builtProvider).then(navigate(-1));
            })
        } else if (altImgChanged) {
            uploadImage(altImg).then((r) => {
                builtProvider.altLogoLink = r;
            }).then(() => {
                builtProvider.logoLink = provider.logoLink;
                postProvider(builtProvider).then(navigate(-1));
            })
        } else {
            builtProvider.logoLink = provider.logoLink;
            builtProvider.altLogoLink = provider.altLogoLink;
            postProvider(builtProvider).then(navigate(-1));
        }


    }

    /**
     * Handles form submission after successful Image Upload for Course
     *
     * @param provider
     * @returns {Promise<void>}
     */
    async function postProvider(provider) {
        try {
            await AsyncApiRequest("POST", "/provider", provider);
        } catch (e) {
            throw new Error("Error posting provider: " + e);
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
            setAltImgChanged(true);
        } else {
            setProviderImage(img);
            setImageChanged(true);
        }
    }

    return (
        <form className="providerInfo-form" onSubmit={handleFormSubmission}>

            <section id="provider-info">
                <input id={"id"} name={"id"} type={"number"} hidden={true} value={provider.id}/>
                <div className="input-wrapper"><label htmlFor="provider-name">Provider Name</label>
                    <input type="text" id="provider-name" name="name" defaultValue={provider.name} required/></div>


                <div className={"imageUpload-wrapper"}>
                    <div className="input-wrapper">
                        <label htmlFor="provider-image">Provider Image</label>
                        <input type="file" id="provider-image" name="imgLink" accept={"image/png,image/jpeg,image/webp"}
                               onChange={(e) => handleChangeImage(e.target.files, false)} required={imageChanged}/>
                    </div>
                    <img className={"img-preview"} src={providerImage.src}/>
                </div>

                <div className={"imageUpload-wrapper"}>
                    <div className="input-wrapper">
                        <label htmlFor="provider-alt-image">Alternative Provider Image</label>
                        <input type="file" id="provider-alt-image" name="imgLinkAlt" accept={"image/png,image/jpeg,image/webp"}
                               onChange={(e) => handleChangeImage(e.target.files, true)} required={altImgChanged}/>
                    </div>
                    <img className={"img-preview"} src={providerImageAlt.src}/>
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