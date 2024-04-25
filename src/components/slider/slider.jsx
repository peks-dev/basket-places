// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/swiper-bundle.css";
import "./slider.css";

const SliderImgsCourt = ({ imgs }) => {
  return (
    <Swiper
      modules={[Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      pagination={{ clickable: true }}
      slidesPerView={1}
      id="slider__court-details"
    >
      {imgs.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderImgsCourt;
