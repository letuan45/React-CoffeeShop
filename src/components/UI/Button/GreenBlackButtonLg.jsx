import React from "react";
import { Link } from "react-router-dom";

import classes from "./GreenBlackButtonLg.module.css";

const GreenBlackButtonLg = (props) => {
  const classesBtn = `${props.className} ${classes.btn}`;

  return (
    <Link to={props.to} className={classesBtn}>
      <p>{props.children}</p>
    </Link>
  );
};

export default GreenBlackButtonLg;
