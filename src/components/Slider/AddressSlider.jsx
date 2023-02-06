import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";

import coffeeBag from "../../assets/black-coffee.png";
import "./AddressSlider.css";

const AddressSlider = () => {
  return (
    <section className="slider">
      <Swiper
        speed={600}
        autoplay={{ delay: 3000}}
        className="mySwiper"
        modules={[Autoplay]}
        loop={true}
      >
        <SwiperSlide>
          <div className="coffee-bag">
            <img src={coffeeBag} alt="coffee bag"></img>
          </div>
        </SwiperSlide>
        <SwiperSlide data-swiper-autoplay="6000">
          <div className="open-hour">
            <h4 className="open-header">Opening hour</h4>
            <ul className="open-list">
              <li>
                <strong>Monday: </strong>
                <strong>9:00 – 19:00</strong>
              </li>
              <li>
                <strong>Tuesday: </strong>
                <strong>9:00 – 19:00</strong>
              </li>
              <li>
                <strong>Wednesday: </strong>
                <strong>9:00 – 19:00</strong>
              </li>
              <li>
                <strong>Thursday: </strong>
                <strong>9:00 – 19:00</strong>
              </li>
              <li>
                <strong>Friday: </strong>
                <strong>9:00 – 19:00</strong>
              </li>
              <li>
                <strong>Saturday: </strong>
                <strong>11:00 – 16:00</strong>
              </li>
              <li>
                <strong>Sunday: </strong>
                <strong className="closed">CLOSED</strong>
              </li>
            </ul>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default AddressSlider;
