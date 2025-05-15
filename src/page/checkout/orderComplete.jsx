import "./orderComplete.css"
import {useDispatch} from "react-redux";
import {clearCourseObject} from "../../dataSlice";
import {useNavigate} from "react-router-dom";

export default function OrderComplete (){
    const dispatch = useDispatch();
    dispatch(clearCourseObject)
    const navigate = useNavigate();

    const navToUserpage = () => {
        navigate("/userpage");
    }


    return (
        <div id="order-complete-page">
            <div id="order-complete-checkmark">
                <img id="checkmark-order-complete" className={"filter-cta"} src={"/icons/checkmark-circle-sharp.svg"}  alt="Checkmark"/>
            </div>

            <h3 id="thank-you-header"> Thank you for your purchase!</h3>
            <p id="thank-you-text">
                Your payment was successful and your order is complete. We have sent an email as proof of purchase.
                The email will provide further purchase details.
            </p>
            &nbsp;
            <div id="order-complete-button">
                <button className={"cta-button"} id={"go-to-userpage"} onClick={navToUserpage}>
                    <p>Go back to course page</p>
                </button>
            </div>

        </div>
    )
}