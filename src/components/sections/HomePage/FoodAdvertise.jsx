import React from "react";
import { Link } from "react-router-dom";

import classes from "./FoodAdvertise.module.css";

import type1 from "../../../assets/type_01.jpg";
import type2 from "../../../assets/type_02.jpg";
import type3 from "../../../assets/type_03.jpg";

const FoodAdvertise = () => {
  const mainRowClasses = `row ${classes["ad-wrapper"]}`;

  const itemClasses = `col-xl-4 col-lg-4 col-sm-12 ${classes['navi-item']}`

  return (
    <section className="food-advertise">
      <div className="container">
        <div className={mainRowClasses}>
          <Link
            to="/something1"
            className={itemClasses}
          >
            <div className={classes.item}>
              <img src={type1} alt="type 1" className={classes["ad-img"]} />
            </div>
            <div className={classes["item-desc"]}>
              <h6>Hot drinks</h6>
              <h3>Tea and coffee</h3>
            </div>
          </Link>
          <Link
            to="/something2"
            className={itemClasses}
          >
            <div className={classes.item}>
              <img src={type2} alt="type 1" className={classes["ad-img"]} />
            </div>
            <div className={classes["item-desc"]}>
              <h6>For mood</h6>
              <h3>Chocolate & Sweets</h3>
            </div>
          </Link>
          <Link
            to="/something3"
            className={itemClasses}
          >
            <div className={classes.item}>
              <img src={type3} alt="type 1" className={classes["ad-img"]} />
            </div>
            <div className={classes["item-desc"]}>
              <h6>For eating</h6>
              <h3>Cakes & Bakery</h3>
            </div>
          </Link>
        </div>
        <div className={classes.spacer}></div>
      </div>
    </section>
  );
};

export default FoodAdvertise;
