import "./rating.css"
export default function Rating (rating){

    if (!rating) {
        return <div>data is missing.</div>;
    };
    let array =  Array(rating.rating).fill(0);


    return (
        <div className="one-review">
        <h5 className="review-title">{rating.course.title}</h5>
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
                <p className="review-date">Reviewed on January 1, 2025 </p>
            </div>
            <p className="review-text">{rating.comment}</p>
        </div>
    )

}