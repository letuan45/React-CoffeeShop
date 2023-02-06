import React from "react";
import { Link } from "react-router-dom";

import classes from "./GreenWhiteButtonLg.module.css";

const GreenWhiteButtonLg = (props) => {
  const classesBtn = `${props.className} ${classes.btn}`;

  return (
    <Link to={props.to} className={classesBtn}>
      <p>{props.children}</p>
    </Link>
  );
};

export default GreenWhiteButtonLg;
