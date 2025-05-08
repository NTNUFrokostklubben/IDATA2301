import "./userPage.css"
import React, {useEffect, useRef, useState} from 'react';
import Review from "../component/Rating/review";
import {AsyncApiRequest} from "../utils/requests";
import {Link, useParams} from "react-router-dom";
import FavoriteCard from "../component/favoriteCard/favoriteCard";
import {useDispatch, useSelector} from "react-redux";
import {createPortal} from "react-dom";
import {uploadImage} from "../utils/commonRequests";
import {setCourseObject, setUserImage, setUserObject} from "../dataSlice";

export function UserImageModal ({ close , uid}){
    const dispatch = useDispatch();
    function deletePfp(){

    }
    function changePfp(link){
        const finLink = {
            profilePicture: link.toString()
        };
        const userDto =  AsyncApiRequest("PUT" ,`/user/image/${uid}`, finLink )
            .then(response => response.json())

        close();
    }


    const handleFileChange = async (event)  => {
        const file = event.target.files[0];
        const imgLink = await uploadImage(file).then(r =>{ changePfp(r); dispatch(setUserImage(r))} )

    };

    function removeStyles(){
        return{
            background: "none",
            border: "none",
            padding: 0,
            margin: 0,
            font: "inherit",
            color: "inherit",
            cursor: "pointer",
            outline: "none",
            appearance: "none",
        }
    }

    return(
        <div className={"user-page-modal-background"}>
            <div className={"user-page-modal"}>

                <label className="file-upload-button">
                    Change profile picture
                    <input type="file" style={{display: "none"}} onChange={handleFileChange}/>
                </label>

                <button style={removeStyles()} onClick={deletePfp()}>
                    <p className={"user-page-modal-delete-pfp"}>
                        delete profile picture
                    </p>
                </button>
                <button style={removeStyles()} onClick={close}>
                    <p className={"user-page-modal-cancel"}>
                        Cancel
                    </p>
                </button>

            </div>

        </div>
    )
}

export default function UserPage() {
    const [courses, setCourses] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false)
    const user = useSelector((state) => state.data.user)
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const sacrificialDivRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // after the DOM is ready
    }, []);

    useEffect(() => {
        if (!user) return;  // Don't fetch unless user is set

        async function handleCourseData() {
            try {
                const courseData = await AsyncApiRequest("GET", `/userCourses/${user.id}`, null)
                    .then(response => response.json())

                const filteredAndSorted = courseData
                    .filter(item => item.review?.rating > 0)
                    .sort((a, b) => b.review.rating - a.review.rating);

                setCourses(courseData)
                setRatings(filteredAndSorted)
            }catch (e){console.error(e)}
        }


        async function handleFavoritesData() {
            try {
                const favoritesData = await AsyncApiRequest("GET", `/userFavorites/${user.id}`, null)
                    .then(response => response.json())
                setFavorites(favoritesData)
            }catch (e){console.error(e)}
        }

        handleFavoritesData();
        handleCourseData();
    }, [user]);


    function profileImageClickHandler() {
        setShowUserModal(true)
    }

    return (



        <div className="user-page">
            {console.log(user)}
            {user && (
            <section id="user-page-content">
                <section id="user-page-caret">

                    <div id="user-caret">

                        <picture onClick={profileImageClickHandler}>
                            <img className={"user-page-user-image"} src={user.profilePicture} alt="user"/>
                        </picture>
                        <p id="user-name">
                            User1
                        </p>

                    </div>
                </section>

                <section id="user-page-user-courses">
                    <h5 id="previous-courses-heading">Previous courses</h5>
                    <ul>
                        {courses.map(item => (
                            <li className="user-course-item" key={item.id}>
                                <Link className={"user-page-course-hotlink"} to={`/course/${item.course.id}`}>
                                    {item.course.title}
                                </Link></li>
                            ))}
                    </ul>
                </section>
                <div id={"sacrificial-div-for-modal"} ref={sacrificialDivRef}></div>
                <section className="users-reviews">
                    <h5 id={"review-heading"} >Your reviews</h5>

                    {ratings.map(item => <Review key={item.id} rating={item} title={true}/>)}

                </section>

                <section id="users-favorites">
                    <h5 id={"favorites-heading"}>Favorites</h5>

                    {favorites.map(item => <FavoriteCard key={item.id} {...item.course}/>)}

                </section>
            </section>)}
            {
                mounted && sacrificialDivRef.current && showUserModal && createPortal(
                    <UserImageModal uid={user.id} close={() => setShowUserModal(false)}/>,
                    document.getElementById("sacrificial-div-for-modal")
                )
            }
        </div>

    )
}