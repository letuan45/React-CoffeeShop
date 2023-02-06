import React, { useEffect } from "react";
import classes from "./ScrollToTop.module.css";

import CoffeeBean from "../../assets/icons/coffee-beans.png";

const ScrollToTop = () => {
  //Fixed button
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const header = document.querySelector(`.${classes.top}`);
      header.classList.toggle(`${classes.sticky}`, window.scrollY > 100);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <button className={classes.top} onClick={scrollToTop}>
      <img src={CoffeeBean} alt="coffee icon"></img>
      <span>Go Top</span>
    </button>
  );
};

export default ScrollToTop;
