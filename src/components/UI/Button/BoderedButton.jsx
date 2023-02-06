import React from "react";
import { Link } from "react-router-dom";

import classes from "./BorderedButton.module.css";

const BorderedButton = (props) => {
  return (
    <Link to={props.to} className={classes.btn}>
      {props.children}
    </Link>
  );
};

export default BorderedButton;