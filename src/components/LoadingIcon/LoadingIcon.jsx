import React from "react";
import classes from "./LoadingIcon.module.css";

import CoffeeBean from "../../assets/icons/coffee-beans.png";

const LoadingIcon = () => {
  return (
    <div className={classes["lds-ellipsis"]}>
      <div>
        <img src={CoffeeBean} alt="coffe-icon"></img>
      </div>
      <div>
        <img src={CoffeeBean} alt="coffe-icon"></img>
      </div>
      <div>
        <img src={CoffeeBean} alt="coffe-icon"></img>
      </div>
      <div>
        <img src={CoffeeBean} alt="coffe-icon"></img>
      </div>
    </div>
  );
};

export default LoadingIcon;
