import "./rating.css"
import {Link} from "react-router-dom";
export default function Rating (rating){

    function formatDate(dateString) {
        const date = new Date(dateString);

        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options).replace(' ', ' ');
    }

    if (!rating) {
        return <div>data is missing.</div>;
    };
    let array =  Array(rating.rating).fill(0);


    return (
        <div className="one-review">
            <Link to={ `/course/${rating.id}` /* should link to user review */}>
        <h5 className="review-title">{rating.course.title}</h5>
            </Link>
            <div className="user-review-section">
                <picture>
                    <img className="user-review-image" src={rating.user.profilePicture} alt="user"/>
                </picture>
                <p className="user-name-review">{rating.user.name}</p>
                <div className="stars">
                    {
                        array.map(() =>
                            <img className="star" src="/icons/star-sharp.svg" alt="review star"/>
                        )
                    }
                </div>
                <p className="review-date">Reviewed on {formatDate(rating.date)} </p>
            </div>
            <p className="review-text">{rating.comment}</p>
        </div>
    )

}