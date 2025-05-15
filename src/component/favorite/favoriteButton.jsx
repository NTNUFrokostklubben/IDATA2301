import {useEffect, useState} from "react";
import {AsyncApiRequest} from "../../utils/requests";
import "./favoriteButton.css"

export default function FavoriteButton ({uid, cid, isFav}){
    const [isFilled, setIsFilled] = useState(isFav);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showFav, setShowFav] = useState(false);

    const handleFavorite = async () => {
        setIsFilled(!isFilled)
        setIsDisabled(true)


        try{
       if (isFilled){
           const RemoveFav = await AsyncApiRequest("DELETE", `/favorite/remove/course/${cid}`, null )
       }else {
           const addFav = await AsyncApiRequest("POST", `/favorite/add/course/${cid}`, null )
       }
        }catch (e){console.error(e)}

        setTimeout(() => {
            setIsDisabled(false); // Re-enable after 1 seconds
        }, 1000);
    }

    const FavoriteHeart = () => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                //onClick={() => setIsFilled(!isFilled)}
                style={{cursor: "pointer"}}
            >
                <path
                    fill={isFilled ? "#75b980" : "white"}
                    stroke="black"
                    strokeWidth="4"
                    d="M256,448l-9-6c-42.78-28.57-96.91-60.86-137-108.32-42.25-50-62.52-101.35-62-157C48.63,114.54,98.46,64,159.08,64c48.11,0,80.1,28,96.92,48.21C272.82,92,304.81,64,352.92,64,413.54,64,463.37,114.54,464,176.65c.56,55.68-19.71,107-62,157C361.91,381.14,307.78,413.43,265,442Z"/>
                />
            </svg>
        );
    };

    return (
        <div className={"favorites-button-container"}>
            <button onClick={handleFavorite} disabled={isDisabled} className="favorite-component"><FavoriteHeart/></button>
        </div>
    )

}