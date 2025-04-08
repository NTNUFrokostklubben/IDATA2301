import "./courseProviderCard.css"
export default function CourseProviderCard (offerableCourse ){

    return(

        <button className="provider-card cta-button" >
            <p className="provider-name">{offerableCourse.provider.name}</p>
            <img className="provider-logo-small" src={offerableCourse.provider.logoLink}/>
            <p className="price">{offerableCourse.price},- nok</p>
        </button>
    )
}