import React from "react";
import NovelCard from "../NovelCard/NovelCard.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import styles from "./Carousel.module.css";
import { useRef, useEffect } from "react";

const Carousel = ({user, title, novel, onClick }) => {
    const ref = useRef(null);
    useEffect(() => {
        console.log(ref);
    }, []);

    const NextArrow = ({ onClick }) => {
        return (
            <div className={styles["slick-next"]} onClick={onClick}>
                <i className="fa-solid fa-arrow-right"></i>
            </div>
        );
    };
    const PrevArrow = ({ onClick }) => {
        return (
            <div className={styles["slick-prev"]} onClick={onClick}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
        );
    };
    const settings = {
        customPaging: function (i) {
            return <a>{i + 1}</a>;
        },
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        centerPadding: 100,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className={styles["container"]}>
            <h2 className={styles["title"]}> {title} </h2>
            <Slider {...settings} dotsClass="slick-dots pagination" ref={ref}>
                {novel.map((novel) => (
                    <div key={novel.id}>
                        <NovelCard
                            user = {user}
                            novel={novel}
                            onClick={() => onClick(novel)}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
