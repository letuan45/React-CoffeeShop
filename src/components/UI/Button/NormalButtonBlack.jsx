import React from "react";
import classes from "./NormalButtonBlack.module.css";

const NormalButtonBlack = (props) => {
  const classesBtn = `${props.className} ${classes.btn}`;

  return (
    <button className={classesBtn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default NormalButtonBlack;
