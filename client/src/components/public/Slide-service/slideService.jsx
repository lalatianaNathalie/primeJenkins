import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./slideService.css";
import data from "./service-slide.json";
import { useTranslation } from "react-i18next";
const SlideService = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Swiper
        className="swiper"
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          1080: {
            slidesPerView: 3,
          },
          800: {
            slidesPerView: 2,
          },
        }}
      >
        {data.map((card, i) => (
          <SwiperSlide key={i}>
            <div className="r-card">
              <img src={card.image} alt="" />
              <span className=" primaryText">{t(card.title)}</span>
              <span className="secondaryText">{t(card.detail)}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideService;
