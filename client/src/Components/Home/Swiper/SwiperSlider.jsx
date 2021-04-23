import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper'
import { CategoriesHome } from '../Categories/CategoriesHome'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/lazy/lazy.scss'
import './SwiperSlider.scss'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade])

const SwiperSlider = (products) => {
  return (
    <Swiper
      navigation
      pagination={false}
      scrollbar={false}
      autoHeight={false}
      loop={true}
      breakpoints={
        {
          //Solo celulares
          300: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          //Tablets medianas y Celulares grandes
          768: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          //Laptops pequeñas y tablets grandes
          992: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          //Laptops grandes y PC
          1200: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 0
          },
        }
      }
    >
      {
        products && products.products.map((item, i) => {
          {
            return (
              <SwiperSlide key={i}>
                <CategoriesHome
                  key={item.id}
                  stock={item.stock} title={item.name} price={item.price} images={item.images[0]?.url} id={item.id}
                />
              </SwiperSlide>
            );
          }
        })
      }
    </Swiper>
  )
}

export default SwiperSlider
