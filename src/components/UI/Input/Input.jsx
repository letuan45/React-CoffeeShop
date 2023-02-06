import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div
      className={classes["input-wrapper"]}
      style={props.half ? { width: "49%" } : null}
    >
      <input
        className={classes.input}
        type={props.type}
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <p className={classes["error"]}>{props.error}</p>
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  );
};

export default Input;
