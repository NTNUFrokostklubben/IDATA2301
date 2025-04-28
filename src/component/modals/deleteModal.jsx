import {useRef, useState} from "react";
import {useFocusTrap} from "../../utils/useFocusTrap";
import "./deleteModal.css";
import {AsyncApiRequest} from "../../utils/requests";
import {useNavigate} from "react-router-dom";

export default function DeleteModal({onClose, deleteId, apiEndpoint}) {

    const modalRef = useRef(null)
    useFocusTrap(modalRef, true, onClose) // Passes true to isOpen due to this modal only being open when it is rendered

    const navigate = useNavigate();

    function handleDelete() {
        deleteObject().then(navigate(0));

    }

    async function deleteObject() {
        try {
            console.log(apiEndpoint + deleteId)
            await AsyncApiRequest("DELETE", apiEndpoint + deleteId, null);
        } catch (e) {
            console.error("Error fetching offerable courses:", e);
        }
    }



    return(
        <div className={"auth-background"}
             ref={modalRef}
             onClick={(c) => {
                 if (c.target === modalRef.current) {
                     onClose()
                 }
             }}>

            <div className="delete-modal">
                <button id={"delete-close-button"} className={"secondary-button"} onClick={onClose}>
                    <img alt={"X"} src={"/icons/close-sharp.svg"}/>
                </button>
                <h3>
                    Are you sure?
                </h3>
                <p>
                    This action will <strong>permanently</strong> delete the object with id: <strong>{deleteId}</strong>
                </p>
                <section id="delete-CTA">
                    <button className="delete-button cta-button" type="submit" onClick={handleDelete}>Delete</button>
                    <button onClick={onClose} className="cta-button secondary-button" type="button">Cancel</button>
                </section>
            </div>
        </div>
    )
}