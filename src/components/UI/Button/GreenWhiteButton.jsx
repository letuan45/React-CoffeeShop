import React from "react";
import classes from "./GreenWhiteButton.module.css";


const GreenWhiteButton = (props) => {
  const classesBtn = `${props.className} ${classes.btn}`;

  return (
    <button className={classesBtn} onClick={props.onClick}>
      <p>{props.children}</p>
    </button>
  );
};

export default GreenWhiteButton;
