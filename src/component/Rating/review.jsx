import "./review.css"
import {Link} from "react-router-dom";
export default function Review ({rating: userCourse, title= false}){
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options).replace(' ', ' ');
    }

    if (!userCourse) {
        return <div>data is missing.</div>;
    };
    let array =  Array(userCourse.review?.rating).fill(0);


    return (
        <div className="one-review">
            {title &&  ( <Link to={`/course/${userCourse.id}` }>
                <h3 className="review-title">{userCourse.course.title}</h3>
            </Link>)
            }
            <h4 className="review-title">{userCourse.review?.title}</h4>
            <div className="user-review-section">
                <picture>
                    <img className="user-review-image" src={userCourse.user.profilePicture} alt="user"/>
                </picture>
                <p className="user-name-review">{userCourse.user.name}</p>
                <div className="stars">
                    {
                        array.map((value, index, array) =>
                            <img key={index} className="star" src="/icons/star-sharp.svg" alt="review star"/>
                        )
                    }
                </div>
                <p className="review-date">Reviewed on {formatDate(userCourse.review?.date)} </p>
            </div>
            <p className="review-text">{userCourse.review?.comment}</p>
        </div>
    )

}