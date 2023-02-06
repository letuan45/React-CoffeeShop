import React from "react";
import classes from "./InputNoLabel.module.css";

const InputNoLabel = (props) => {
  const inputClasses = `${props.className} ${classes["control-input"]}`;
  return (
    <input
      className={inputClasses}
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      id={props.name}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    ></input>
  );
};

export default InputNoLabel;
