import React from "react";
import classes from "./NormalButton.module.css";

const NormalButton = (props) => {
  const classesBtn = `${props.className} ${classes.btn} ${
    props.color ? classes[`${props.color}`] : ""
  } ${props.disabled ? classes.disabled : ""}`;

  return (
    <button
      className={classesBtn}
      onClick={props.onClick}
      type={props.type ? props.type : "button"}
      disabled={props.disabled && props.disabled}
    >
      {props.children}
    </button>
  );
};

export default NormalButton;
