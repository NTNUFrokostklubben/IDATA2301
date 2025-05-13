import "./review.css"
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
export default function Review ({rating: userCourse, title= false}){
    const user = useSelector((state) => state.data.user)

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options).replace(' ', ' ');
    }

    if (!userCourse) {
        return <div>data is missing.</div>;
    }
    let rating =  Array(userCourse.review?.rating).fill(0);

    const userName = userCourse.user.name.charAt(0).toUpperCase() + userCourse.user.name.slice(1);


    return (
        <div className="one-review">
            {title && (
                <Link to={`/course/${userCourse.course.id}`}>
                    <h4 className="review-title">{userCourse.course.title}</h4>
                </Link>
            )}
            <h5 className="review-title">{userCourse.review?.title}</h5>
            <div className="user-review-section">
                <picture>
                    {user && (<img className="user-review-image" src={user.profilePicture} alt="user"/>)}
                </picture>
                <p className="user-name-review">{userName}</p>
                <div className="review-stars">
                    {
                        rating.map((value, index, array) =>
                            <img key={index} className="star" src="/icons/star-sharp.svg" alt="review star"/>
                        )}
                    &nbsp;<p className="review-rating"> {userCourse.review?.rating}</p>
                </div>
            </div>
            <p className="review-date"> Reviewed on {formatDate(userCourse.review?.date)} </p>
            <p className="review-text">{userCourse.review?.comment}</p>
        </div>
    )

}