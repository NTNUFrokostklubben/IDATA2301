import "./favoriteCard.css"
import {Link} from "react-router-dom";
export default function FavoriteCard(item){

    return (
        <div className="one-favorite">
            <Link to={ `/course/${item.id}`}>
                <h2 className="favorite-course-title">{item.title}</h2>
            </Link>
            <div className="favorite-image-and-text">
                <img className="favorite-course-image" src={item.imgLink} alt="course image"/>
                <p className="favorite-course-text">
                    {item.description}
                </p>
            </div>
        </div>
    )
}