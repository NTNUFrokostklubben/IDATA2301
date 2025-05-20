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
            await AsyncApiRequest("DELETE", apiEndpoint + deleteId, null);
        } catch (e) {
            throw new Error(formatError(apiEndpoint));
        }
    }

    function formatError(apiEndpoint) {
        switch (apiEndpoint) {
            case "/offerableCourse/":
                return "Cannot delete offerable course with id: " + deleteId;
            case "/course/":
                return "Cannot delete course with id: " + deleteId + ". It is used in offerable courses";
            case "/provider/":
                return "Cannot delete provider with id: " + deleteId;
            default:
                return "Cannot delete object with id: " + deleteId + " from endpoint: " + apiEndpoint + deleteId;
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