import "./courseProviderCard.css"
import {Link} from "react-router-dom";
import {setCourseObject} from "../../dataSlice";
import { useDispatch } from 'react-redux';
import {Skeleton} from "@mui/material";
export function CourseProviderCard (offerableCourse ){
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

export function CourseProviderCardSkeleton() {
    return (
        <div className="provider-card cta-button">
            <div className="provider-card-text">
                <Skeleton variant={"text"} width={"6rem"} height={"2.5rem"}/>
                <Skeleton variant={"text"} width={"10rem"} height={"1.5rem"}/>
                <div className="provider-card-price-section">
                    <div className={"provider-card-price-and-discount"}>
                        <Skeleton variant={"text"} width={"8rem"} height={"1.2rem"}/>
                        <Skeleton variant={"text"} width={"10rem"} height={"1.5rem"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}