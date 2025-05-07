import "./courseProviderCard.css"
import {Link} from "react-router-dom";
import {setCourseObject} from "../../dataSlice";
import { useDispatch } from 'react-redux';
export default function CourseProviderCard (offerableCourse ){
    const dispatch = useDispatch();

    const handleClick = () =>{
        dispatch(setCourseObject(offerableCourse))
    }
    const formattedDate = new Date(offerableCourse.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });
    const hasDiscount = offerableCourse.discount > 0;
    const discountedPrice = (offerableCourse.price * (1 - offerableCourse.discount)).toFixed(2);
    return(

        <Link to={`/checkout/${offerableCourse.id}`} onClick={handleClick} className="provider-card cta-button">
            <div className="provider-card-text">
                <p className="provider-card-name">{offerableCourse.provider.name}</p>
                <p className={"provider-card-date"} >start date: {formattedDate}</p>
                <div className="provider-card-price-section">
                    {hasDiscount ? (
                        <div className={"provider-card-price-and-discount"}>

                            <span className="original-price">{offerableCourse.price},- NOK</span>
                            <span className="discounted-price">{discountedPrice},- NOK</span>
                        </div>
                    ) : (
                        <span className="provider-card-price">{offerableCourse.price},- NOK</span>
                    )}
                </div>
            </div>


        </Link>
    )
}