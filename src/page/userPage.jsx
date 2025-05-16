import "./userPage.css"
import React, {useEffect, useRef, useState} from 'react';
import Review from "../component/Rating/review";
import {AsyncApiRequest} from "../utils/requests";
import {Link, useParams} from "react-router-dom";
import FavoriteCard from "../component/favoriteCard/favoriteCard";
import {useDispatch, useSelector} from "react-redux";
import {createPortal} from "react-dom";
import {uploadImage} from "../utils/commonRequests";
import { setUserImage} from "../dataSlice";
import {Dialog, Skeleton} from "@mui/material";
import {useFocusTrap} from "../utils/useFocusTrap";
import Course from "./course/course";
import ConfirmChoiceDialog from "../component/modals/confirmChoice/confirmChoiceDialog";


export function UserImageModal({close, uid}) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const modalRef = useRef(null)
    useFocusTrap(modalRef, true, close) // Passes true to isOpen due to this modal only being open when it is rendered


    function dialogChooser() {
        setOpen(true)

    }

    function deletePfp(value) {
        if (value) {
            let defImg = "https://localhost:8081/uploads/images/default_img.png"
            dispatch(setUserImage(defImg))
            const userDto = AsyncApiRequest("PUT", `/user/image`, defImg)
                .then(response => response.json())
            close();
        }

        setOpen(false)
        close();
    }

    function changePfp(link) {

        const userDto = AsyncApiRequest("PUT", `/user/image`, link)
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
        <div className={"user-page-modal-background"}
             ref={modalRef}
             onClick={(c) => {
                 if (c.target === modalRef.current) {
                     close()
                 }
             }}>
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
                        <ConfirmChoiceDialog callback={deletePfp} choice={"Are you sure you want to delete your " +
                            "profile picture?"} open={setOpen}/>
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // after the DOM is ready
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            if (!user) return; // Don't fetch unless user is set
            try{
                await new Promise(r => setTimeout(r, 150));
                await Promise.all([
                    handleFavoritesData(),
                    handleCourseData()
                ])
                setLoading(false);

            } catch (err) {
                throw new Error("Error fetching user: ", err);
            }
        }
        fetchData();
    }, [user]);

        async function handleCourseData() {
            try {
                const courseData = await AsyncApiRequest("GET", `/userCourses/user`, null)
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
                const favoritesData = await AsyncApiRequest("GET", `/favorite/user`, null)
                    .then(response => response.json())
                setFavorites(favoritesData)
            } catch (e) {
                console.error(e)
            }
        }


    function profileImageClickHandler() {
        setShowUserModal(true)
    }

    return (

        <div className="user-page">
            {user && (
                <section id="user-page-content">
                    <div id="user-page-content-info">
                        <section id="user-page-caret">
                            <div id="user-caret">
                                <picture onClick={profileImageClickHandler}>
                                    <img className="user-page-user-image" src={user.profilePicture} alt="user"/>
                                </picture>
                                <p id="user-name"> {user.name} </p>
                            </div>
                        </section>

                        <section id="user-page-user-courses">
                            <h3 className="userpage-heading">Previous courses</h3>

                            {loading ?
                                <Skeleton variant={"rectangular"} width={"100%"} height={"80%"}/>
                                :
                                <div className="user-page-user-courses-content">
                                    {courses.map(item => (
                                        <div className="user-course-item" key={item.id}>
                                            <Link className="user-page-course-hotlink" to={`/course/${item.course.id}`}>
                                                <div className="image-wrapper">
                                                    <img className="user-page-course-image" src={item.course.imgLink}
                                                         alt={"image " + item.course.title}/>
                                                </div>
                                                <p>{item.course.title}</p>
                                            </Link></div>
                                    ))}
                                </div>
                            }


                        </section>
                    </div>

                    <section className="users-reviews">
                        <h3 className="userpage-heading">Your reviews</h3>

                        {loading ?
                            <Skeleton variant={"rectangular"} width={"100%"} height={"60%"}/>
                            :
                            <div className="user-page-reviews">
                                {ratings.map(item => <Review key={item.id} rating={item} title={true}/>)}
                            </div>
                        }
                    </section>

                    <section id="users-favorites">
                        <h3 className="userpage-heading">Favorites</h3>

                        {loading ?
                            <Skeleton variant={"rectangular"} width={"100%"} height={"50%"}/>
                            :
                            <div id="user-page-favorites-content">
                                {favorites.map(item => <FavoriteCard key={item.id} {...item.course}/>)}
                            </div>
                        }

                    </section>
                </section>)
            }

            {
                mounted && showUserModal && createPortal(
                    <UserImageModal uid={user.id} close={() => setShowUserModal(false)}/>,
                    document.getElementById("sacrificial-div-for-modal")
                )
            }
            <div id="sacrificial-div-for-modal"/>
        </div>

    )
}