import {useParams} from "react-router-dom";


export default function ProviderEdit(courseId) {
    const { id } = useParams();

    return(
        <div className="providerInfo-page">
            <h1>Edit Provider</h1>
            <form className="providerInfo-form">
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
        </div>
    )
}