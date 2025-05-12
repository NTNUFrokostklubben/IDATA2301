import "./courseProviderCard.css"
import {Link} from "react-router-dom";
import {setCourseObject} from "../../dataSlice";
import { useDispatch } from 'react-redux';
export default function CourseProviderCard (offerableCourse ){
    const dispatch = useDispatch();

    const handleClick = () =>{
        dispatch(setCourseObject(offerableCourse))
    }
    const formattedDate = new Date(offerableCourse.date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });
    const hasDiscount = offerableCourse.discount > 0;
    const discountedPrice = (offerableCourse.price * (1 - offerableCourse.discount)).toFixed(2);
    return(

        <Link to={`/checkout/${offerableCourse.id}`} onClick={handleClick} className="provider-card cta-button">
            <div className="provider-card-text">
                <b className="provider-card-name">{offerableCourse.provider.name}</b>
                <p className={"provider-card-date"} >Start date: {formattedDate}</p>
                <div className="provider-card-price-section">
                    {hasDiscount ? (
                        <div className={"provider-card-price-and-discount"}>

                            <p className="original-price">{offerableCourse.price},- NOK</p>
                            <p className="discounted-price">{discountedPrice},- NOK</p>
                        </div>
                    ) : (
                        <p className="provider-card-price">{offerableCourse.price},- NOK</p>
                    )}
                </div>
            </div>


        </Link>
    )
}