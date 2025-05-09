import "./orderComplete.css"
import {useDispatch} from "react-redux";
import {clearCourseObject} from "../dataSlice";

export default function OrderComplete (){
    const dispatch = useDispatch();
    dispatch(clearCourseObject)
    const Checkmark  = () => {
        return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 512 512"
            fill= "current"
        >
            <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM218,360.38
                ,137.4,270.81l23.79-21.41,56,62.22L350,153.46,374.54,174Z"/>
        </svg>
        )
    };

    return (
        <div id="order-complete-page">
            <div id="order-complete-checkmark">
                <Checkmark/>
            </div>

            <h3 id="thank-you-header"> Thank you for your purchase!</h3>
            <p id="thank-you-text">
                Your payment was successful and your order is complete. <br/>
                We have sent an email as proof of purchase. <br/> The email will provide further purchase details.

            </p>
        </div>
    )
}