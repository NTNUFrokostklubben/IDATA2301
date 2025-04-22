import "./courseProviderCard.css"
import {Link} from "react-router-dom";
import {setSharedObject} from "../../dataSlice";
import { useDispatch } from 'react-redux';
export default function CourseProviderCard (offerableCourse ){
    const dispatch = useDispatch();

    const handleClick = () =>{
        dispatch(setSharedObject(offerableCourse))
    }
    return(

        <Link to={`/checkout/${offerableCourse.id}`} onClick={handleClick} className="provider-card cta-button">
            <div className="provider-card-text">
                <p className="provider-name">{offerableCourse.provider.name}</p>
                <p className="provider-card-price">{offerableCourse.price},- nok</p>
            </div>
            {// <img className="provider-logo-small" src={offerableCourse.provider.logoLink}/>
            }
            <img className="provider-logo-placeholder" src="/icons/mail-sharp.svg"/>
        </Link>
    )
}