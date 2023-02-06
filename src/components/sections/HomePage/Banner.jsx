import React from "react";

import classes from "./Banner.module.css";
import coffeCup from "../../../assets/icons/coffee-cup.png";
import compliant from "../../../assets/icons/compliant.png";
import natural from "../../../assets/icons/natural.png";
import dry from "../../../assets/icons/dry.png";

const Banner = () => {
  const containerClasses = `container ${classes.container}`;

  return (
    <section className="banner">
      <div className={containerClasses}>
        <ul className="row">
          <li className="col-lg-3 col-sm-6 p-3">
            <div className={classes.item}>
              <img src={coffeCup} alt="coffee cup" />
              <span className={classes.content}>
                <h6>Awesome Aroma</h6>
                <p>
                  Created by the coffee's volatile components vapors and
                  gases.
                </p>
              </span>
            </div>
          </li>
          <li className="col-lg-3 col-sm-6 p-3">
            <div className={classes.item}>
              <img src={compliant} alt="coffee cup" />
              <span className={classes.content}>
                <h6>High Quality</h6>
                <p>
                  You cannot inspect quality into the product, it is already
                  there.
                </p>
              </span>
            </div>
          </li>
          <li className="col-lg-3 col-sm-6 p-3">
            <div className={classes.item}>
              <img src={natural} alt="coffee cup" />
              <span className={classes.content}>
                <h6>Pure Grades</h6>
                <p>
                  The purity determined for an individual product can vary
                  slightly from lot to lot.
                </p>
              </span>
            </div>
          </li>
          <li className="col-lg-3 col-sm-6 p-3">
            <div className={classes.item}>
              <img src={dry} alt="coffee cup" />
              <span className={classes.content}>
                <h6>Proper Roasting</h6>
                <p>
                  Seeking what is best, and doing what is right in pursuit of
                  the ultimate cup.
                </p>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Banner;
