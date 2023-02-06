import React from "react";

import classes from "./CoffeeAddress.module.css";
import GreenWhiteButtonLg from "../../UI/Button/GreenWhiteButtonLg";
import blackLeaf from "../../../assets/black-leaf.png";
import AddressSlider from "../../Slider/AddressSlider";

const CoffeeAddress = () => {
  const elementClasses = `col-xl-6 col-lg-12 ${classes["item"]}`;

  return (
    <section className="coffee-quality">
      <div className={classes["wrapper-bg"]}>
        <div className="container">
          <div className={classes["spacer-1"]}></div>
          <div className="row">
            <div
              className={elementClasses}
              style={{
                backgroundImage: `url(${blackLeaf})`,
                backgroundPosition: "center right",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className={classes["section-title"]}>
                <div className={classes["main-title"]}>
                  <h2>
                    <span>Roasted Coffee</span>
                    <br />
                    <span>for Your Mood</span>
                  </h2>
                </div>
              </div>
              <div className={classes["title-desc"]}>
                <p>
                  Warm, comforting and satisfying. That’s the feeling you get
                  when you visit a neighbourhood coffeehouse. Each Roastery
                  captures that feeling through its own distinct character,
                  blending authentic customer service with craft coffee.
                </p>
              </div>
              <div className={classes["location"]}>
                <i className="fa-solid fa-location-dot"></i>
                <div className={classes["location-detail"]}>
                  <span>Our location</span>
                  <span>
                    230/14 Man Thien, Thu Duc city, Ho Chi Minh city, Viet Nam
                  </span>
                </div>
              </div>
              <div className={classes["button-group"]}>
                <GreenWhiteButtonLg to="/about-us">
                  Read more
                </GreenWhiteButtonLg>
              </div>
            </div>
            <div className={elementClasses}>
              <div className={classes["spacer-3"]}></div>
              {/* <div className={classes["coffee-bag"]}>
                <img src={coffeeBag} alt="coffee bag"></img>
              </div> */}
              <AddressSlider/>
            </div>
          </div>
          <div className={classes["spacer-2"]}></div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeAddress;
