import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import "./MySlider.css";

import slideImage1 from "../../assets/slide_01.jpg";
import slideImage2 from "../../assets/slide_02.jpg";
import slideImage3 from "../../assets/slide_03.jpg";
import slogan1 from "../../assets/slogan_01.png";
import slogan2 from "../../assets/slogan_02.png";
import slogan3 from "../../assets/slogan_03.png";
import GreenWhiteButtonLg from "../UI/Button/GreenWhiteButtonLg";

const PrevArow = (props) => {
  return (
    <button className="prev-btn" onClick={props.onClick}>
      <span className="prev">
        <i className="fa-solid fa-arrow-left-long"></i>
      </span>
    </button>
  );
};

const NextArow = (props) => {
  return (
    <button className="next-btn" onClick={props.onClick}>
      <span className="next">
        <i className="fa-solid fa-arrow-right-long"></i>
      </span>
    </button>
  );
};

const MySlider = () => {
  const swiperRef = useRef();

  return (
    <section className="slider">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        speed={600}
        effect={"fade"}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="mySwiper"
        navigation={true}
        modules={[Navigation, EffectFade, Autoplay]}
        loop={true}
      >
        <SwiperSlide>
          <div
            className="slide-item"
            style={{ backgroundImage: `url(${slideImage1})` }}
          ></div>
          <div className="slide-slogan">
            <img src={slogan1} alt="slogan1" className="slide-slogan__image" />
            <div className="slide-slogan__disc">
              <p>
                Every Tuesday in our cafe is tasting of different varieties of
                coffee and lectures from our barista. You will always find out
                something new here.
              </p>
            </div>
            <GreenWhiteButtonLg to="/products">Taste Coffee</GreenWhiteButtonLg>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="slide-item"
            style={{ backgroundImage: `url(${slideImage2})` }}
          ></div>
          <div className="slide-slogan">
            <img src={slogan2} alt="slogan2" className="slide-slogan__image" />
            <div className="slide-slogan__disc">
              <p>
                Cold brew coffee for hot summer or perfect filter coffee from
                fresh roasted sort of craft bean are always in in our cafe.
              </p>
            </div>
            <GreenWhiteButtonLg to="/products">Taste Coffee</GreenWhiteButtonLg>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="slide-item"
            style={{ backgroundImage: `url(${slideImage3})` }}
          ></div>
          <div className="slide-slogan">
            <img src={slogan3} alt="slogan3" className="slide-slogan__image" />
            <div className="slide-slogan__disc">
              <p>
                Discount for fresh desserts for large companies. The promotion
                starts after 6pm every day except weekends and holidays.
              </p>
            </div>
            <GreenWhiteButtonLg to="/products">Taste Coffee</GreenWhiteButtonLg>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="arrow-wrapper">
        <NextArow onClick={() => swiperRef.current.slideNext()} />
        <PrevArow onClick={() => swiperRef.current.slidePrev()} />
      </div>
    </section>
  );
};

export default MySlider;
