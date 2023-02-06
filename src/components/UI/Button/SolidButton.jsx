import React from "react";
import { Link } from "react-router-dom";

import classes from "./SolidButton.module.css";

const SolidButton = (props) => {
  return (
    <Link to={props.to} className={classes.btn}>
      {props.children}
    </Link>
  );
};

export default SolidButton;
