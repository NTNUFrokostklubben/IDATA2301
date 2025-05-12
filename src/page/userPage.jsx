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
import {Dialog} from "@mui/material";


export function UserImageModal({close, uid}) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);


    function dialogChooser() {
        setOpen(true)

    }

    function deletePfp(value) {
        if (value) {
            dispatch(setUserImage("http://localhost:8081/uploads/images/default_img.png"))
        }
        setOpen(false)
        close();
    }
  
    function changePfp(link){

        const userDto =  AsyncApiRequest("PUT" ,`/user/image/${uid}`,link )
            .then(response => response.json())
        close();
    }


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const imgLink = await uploadImage(file).then(r => {
            changePfp(r);
            dispatch(setUserImage(r))
        })

    };


    function removeStyles() {
        return {
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

    return (
        <div className={"user-page-modal-background"}>
            <div className={"user-page-modal"}>

                <div className={`user-page-modal-option-container`}>
                    <label className="file-upload-button">
                        Change profile picture
                        <input className={"user-page-picture-picker"} accept={"image/png,image/jpeg,image/webp"}
                               type="file" style={{display: "none"}} onChange={handleFileChange}/>
                    </label>
                </div>
                <div className={`user-page-modal-option-container`} onClick={dialogChooser}>
                    <button style={removeStyles()}>
                        <Dialog open={open}>
                            <div className={"user-page-modal-delete-dialog"}>
                                <p className={"user-page-modal-delete-dialog-confirmation-text"}>
                                    Are you sure you want to delete your profile picture?
                                </p>
                                <div className={"user-page-modal-delete-dialog-all-buttons"}>
                                    <button className={"user-page-modal-delete-dialog-button"} onClick={() => {
                                        deletePfp(true)
                                    }}>
                                        Confirm
                                    </button>
                                    <button className={"user-page-modal-delete-dialog-button"} onClick={() => {
                                        deletePfp(false)
                                    }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Dialog>
                        <p className={"user-page-modal-delete-pfp"}>
                            delete profile picture
                        </p>
                    </button>
                </div>
                <div className={"user-page-modal-option-container"} onClick={close}>
                    <button style={removeStyles()}>
                        <p className={"user-page-modal-cancel"}>
                            Cancel
                        </p>
                    </button>
                </div>
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
            } catch (e) {
                console.error(e)
            }
        }


        async function handleFavoritesData() {
            try {
                const favoritesData = await AsyncApiRequest("GET", `/userFavorites/${user.id}`, null)
                    .then(response => response.json())
                setFavorites(favoritesData)
            } catch (e) {
                console.error(e)
            }
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
                        <h5 id={"review-heading"}>Your reviews</h5>

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