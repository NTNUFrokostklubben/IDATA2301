import "./favoriteCard.css"
import {Link} from "react-router-dom";

export default function FavoriteCard(item) {

    return (
        <div className="one-favorite">
            <Link to={`/course/${item.id}`}>
                <h4 className="favorite-course-title">{item.title}</h4>
            </Link>
            <div className="favorite-image-and-text">
                <Link to={`/course/${item.id}`} className={"image-wrapper"}>
                    <img className="favorite-course-image" src={item.imgLink}
                         alt={"image " + item.title}/>
                </Link>
                <p className="favorite-course-text">
                    {item.description}
                </p>
            </div>

        </div>
    )
}