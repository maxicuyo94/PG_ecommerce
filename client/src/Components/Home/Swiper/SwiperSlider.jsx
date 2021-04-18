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
            spaceBetween={0}
            navigation
            pagination={false}
            scrollbar={false}
            autoHeight={false}
            loop={true}
            breakpoints={
                {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },

                    640: {
                        slidesPerView: 3,
                        spaceBetween: 0
                    }
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
