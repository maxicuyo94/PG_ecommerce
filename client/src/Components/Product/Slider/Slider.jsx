import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from "./Slider.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect } from "react";

const Slider = ({ images }) => {
  const [res, setRes] = useState(true)
  useEffect(() => {
    window.innerWidth < 601 ? setRes(false) : setRes(true)
  },[])
  return (
    <div className={styles.carousel}>
      <Carousel
        //axis={'vertical'}
        //centerMode={true}
        //centerSlidePercentage={50}
        showArrows={!res}
        showThumbs={res}
        dynamicHeight={false}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={res}
        useKeyboardArrows={true}
        interval={1000}
      //width={'80%'}
      >
        {images?.map((slide, i) => {
          return (
            <div key={i}>
              <img src={slide} alt="." />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;
