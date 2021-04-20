import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFlip,
} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/lazy/lazy.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import styles from "./Thumbs.module.scss";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFlip]);

const Thumbs = (images) => {
  return (
    <Swiper
      spaceBetween={0}
      navigation={true}
      pagination={true}
      scrollbar={false}
      autoHeight={true}
      grabCursor={true}
    >
      {images && console.log(images.images)}
      {images.images &&
        images.images.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <div className={styles.container1}>
                  <div className={styles.container2}>
                    <div className={styles.container3}>
                      <img src={image?.url} alt="This should be something graphic, but we can't find it. Sorry!" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        )}
    </Swiper>
  );
};

export default Thumbs;
