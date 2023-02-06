import React from "react";
import classes from "./CheckoutSuccess.module.css";

import Beans from "../../../assets/icons/beans.png";
import GreenWhiteButtonLg from "../../UI/Button/GreenWhiteButtonLg";

const CheckoutSuccess = () => {
  return (
    <section className="checkout-success">
      <div className="container">
        <div className="row">
          <div className={classes["main-container"]}>
            <img src={Beans} alt="beans" className={classes.beans}></img>
            <span className={classes.notify}>
              We've received your order, thanks for shopping with us !
            </span>
            <div className={classes["button-group"]}>
              <GreenWhiteButtonLg to="/">Return to shop</GreenWhiteButtonLg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
