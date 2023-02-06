import React from "react";

import classes from "./BlackWhiteButtonLg.module.css";

const BlackWhiteButton = (props) => {
  const classesBtn = `${props.className} ${classes.btn}`;

  return (
    <button
      to={props.to}
      className={classesBtn}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
    >
      <p>{props.children}</p>
    </button>
  );
};

export default BlackWhiteButton;
