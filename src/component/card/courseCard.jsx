import "./courseCard.css"
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useRef} from "react";
import {Skeleton} from "@mui/material";

export function CourseCard(courseCard) {
    const navigate = useNavigate();
    const imgRef = useRef(null);
    const coursePrice = Math.round(courseCard.minDiscountedPrice * 100) / 100;
    const linkToCourse = "/course/" + courseCard.course.id;

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        const handleLoad = () => {
            const isPortrait = img.naturalHeight > img.naturalWidth;
            img.classList.toggle("portrait", isPortrait);
            img.classList.toggle("landscape", !isPortrait);
        };

        if (img.complete) {
            handleLoad();
        } else {
            img.addEventListener("load", handleLoad);
        }

        return () => {
            img.removeEventListener("load", handleLoad);
        };
    }, [courseCard.course.imgLink]);

    return (
        <section className="index-card" id={courseCard.course.id}>
            <div className="index-course-card">
                <Link to={linkToCourse}><img className="index-course-img" src={courseCard.course.imgLink}
                                             alt="Course Card" ref={imgRef}/></Link>
                <h6 className="index-course-content-heading">{courseCard.course.title}</h6>

                <div className={"index-card-footer"}>
                    <p className="index-card-desc"> {courseCard.course.description}</p>
                    <p className="index-price">{coursePrice} NOK</p>
                </div>
            </div>
        </section>
    );
}

export function CourseCardSkeleton() {
    return (
        <section className="index-card">
            <div className="index-course-card-skeleton">
                <Skeleton variant="rectangular" height="10rem" width="100%" />
                &nbsp;
                <Skeleton variant="rectangular" height="2rem" width="100%" />
                &nbsp;
                <div className="index-card-footer-skeleton">
                    <Skeleton variant="rectangular" height="5rem" width="100%" />
                    &nbsp;
                    <Skeleton variant="rectangular" height="1rem" width="20%" />
                </div>
            </div>
        </section>
    );
}