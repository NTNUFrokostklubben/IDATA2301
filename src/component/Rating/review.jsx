import "./review.css"
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
export default function Review ({rating: userCourse, title= false}){

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options).replace(' ', ' ');
    }
    console.log(userCourse)
    if (!userCourse) {
        return <div>data is missing.</div>;
    }
    let rating =  Array(userCourse.review?.rating).fill(0);
    const userName = userCourse.user.name.charAt(0).toUpperCase() + userCourse.user.name.slice(1);


    return (
        <div className="one-review">
            <div className="review-content">
                <h5 className="review-title">{userCourse.review?.title}</h5>
                <div className="user-review-section">
                    <picture>
                        {userCourse.user && (<img className="user-review-image" src={userCourse.user.profilePicture} alt="user"/>)}
                    </picture>
                    <p className="user-name-review">{userName}</p>
                    <div className="review-stars">
                        {
                            rating.map((value, index, array) =>
                                <img key={index} id="star" className="filter-cta" src="/icons/star-sharp.svg" alt="review star"/>
                            )}
                        &nbsp;<p className="review-rating"> {userCourse.review?.rating}</p>
                    </div>
                </div>
                <p className="review-date"> Reviewed on {formatDate(userCourse.review?.date)} </p>
                <p className="review-text">{userCourse.review?.comment}</p>
            </div>

            {title && (
                <div className="user-review-go-to-course">
                    <Link to={`/course/${userCourse.course.id}`}>
                        <img id="go-to-course-img" className="filter-cta" src="/icons/arrow-up-right-box-sharp.svg"
                             alt="Go to course"/>
                    </Link>

                </div>
            )}
        </div>
    )

}