import React from "react";
import { Link } from "react-router-dom";

import classes from "./BlackWhiteButtonLg.module.css";

const BlackWhiteButtonLg = (props) => {
  const classesBtn = `${props.className} ${classes.btn}`;

  return (
    <Link to={props.to} className={classesBtn}>
      <p>{props.children}</p>
    </Link>
  );
};

export default BlackWhiteButtonLg;
