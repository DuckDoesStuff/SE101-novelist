import React from "react";
import NovelCard from "./NovelCard.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/Carousel.module.css";

const Carousel = ({title, novel, onClick }) => {
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
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    centerPadding: 100,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className={styles["container"]}>
        <h2 className={styles["title"]}> {title} </h2>
      <Slider {...settings}>
        {novel.map((novel) => (
          <div key={novel.id}>
            <NovelCard novel={novel} onClick={() => onClick(novel)} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
