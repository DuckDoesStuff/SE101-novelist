import React from "react";
import NovelCard from "./NovelCard.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Carousel.css";
import styles from "../styles/Carousel.module.css";
import { useRef, useEffect } from "react";

const Carousel = ({ title, novel, onClick }) => {
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
    // customPaging: (i, currentSlide) => (
    //     <div
    //       className={`${styles["pagination"]} ${
    //         i === currentSlide ? styles["active"] : ""
    //       }`}
    //       style={{
    //         /* Thêm các thuộc tính CSS tùy chỉnh ở đây */
    //         fontSize: "18px",
    //         fontWeight: i === currentSlide ? "bold" : "normal",
    //         // ...Thêm thuộc tính khác tùy theo ý muốn của bạn
    //       }}
    //     >
    //       {i + 1}
    //     </div>
    //   )
  };

  return (
    <div className={styles["container"]}>
      <h2 className={styles["title"]}> {title} </h2>
      <Slider {...settings} dotsClass="slick-dots pagination" ref={ref}>
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
