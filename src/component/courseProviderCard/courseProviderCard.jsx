import "./courseProviderCard.css"
import {Link} from "react-router-dom";
export default function CourseProviderCard (offerableCourse ){

    return(

        <Link to={`/checkout/${offerableCourse.id}`} className="provider-card cta-button" >
            <p className="provider-name">{offerableCourse.provider.name}</p>
            <img className="provider-logo-small" src={offerableCourse.provider.logoLink}/>
            <p className="price">{offerableCourse.price},- nok</p>
        </Link>
    )
}