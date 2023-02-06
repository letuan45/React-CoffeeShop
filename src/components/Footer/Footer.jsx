import React from "react";
import { Link } from "react-router-dom";

import classes from "./Footer.module.css";
import logo from "../../assets/kaffa_logo_light.png";
import footerBg from "../../assets/footer-bg.jpg";
import InputNoLabel from "../UI/Input/InputNoLabel";
import GreenWhiteButton from "../UI/Button/GreenWhiteButton";
import ScrollToTop from "../Interactor/ScrollToTop";

const Footer = () => {
  const lastItemClass = `col-lg-6 col-xl-4 ${classes["last"]}`

  return (
    <footer style={{position: "relative"}}>
      <div
        style={{ backgroundImage: `url(${footerBg})` }}
        className={classes["wrapper"]}
      >
        <div className="container" style={{ padding: "50px 15px" }}>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 col-xl-4">
              <div className={classes["footer-item"]}>
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
                <p>
                  Contact us for more infomation, also visit our social media to
                  follow and receive many updates
                </p>
                <ul className={classes["social-media"]}>
                  <li className={classes["social-media-item"]}>
                    <Link to="#">
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                  </li>
                  <li className={classes["social-media-item"]}>
                    <Link to="#">
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li className={classes["social-media-item"]}>
                    <Link to="#">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                  <li className={classes["social-media-item"]}>
                    <Link to="#">
                      <i className="fa-brands fa-youtube"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
              <div className={classes["footer-item"]}>
                <h3 className={classes["footer-item__header"]}>Contact Info</h3>
                <ul className={classes["footer-contacts"]}>
                  <li className={classes["footer-contacts__item"]}>
                    <i className="fa-solid fa-location-dot"></i>
                    <Link to="#" className={classes["footer-addr"]}>
                      <span>Our location: </span>
                      <span>
                        230/14 Man Thien, Thu Duc city, Ho Chi Minh city, Viet
                        Nam
                      </span>
                    </Link>
                  </li>
                  <li className={classes["footer-contacts__item"]}>
                    <i className="fa-solid fa-phone"></i>
                    <Link to="#">
                      <span>Phone: </span>
                      <span>+84 981 756 860 (Le Tuan)</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={lastItemClass}>
              <div className={classes["footer-item"]}>
                <h3 className={classes["footer-item__header"]}>Subscribe</h3>
                <ul className={classes["footer-contacts"]}>
                  <li className={classes["footer-contacts__item"]}>
                    <div className={classes["subcribe-form"]}>
                      <form action="/subcribe">
                        <div className={classes["form-wrapper"]}>
                          <InputNoLabel
                            placeholder="Your Email ..."
                            type="email"
                            name="subcribe-email"
                          />
                          <div className={classes["subcribe-btn-group"]}>
                            <GreenWhiteButton>Subscribe</GreenWhiteButton>
                          </div>
                        </div>
                        <label className={classes["subcribe-label"]}>
                          <input
                            name="AGREE_TO_TERMS"
                            type="checkbox"
                            value="1"
                            required=""
                          />
                          <Link to="#">
                            I have read and agree to the terms &amp; conditions
                          </Link>
                        </label>
                      </form>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <div className="container">
            <p className={classes.author}>
              © All Rights Reserved - 2022
              <span> By Le Tuan</span>
            </p>
          </div>
        </div>
      </div>
      <ScrollToTop/>
    </footer>
  );
};

export default Footer;
