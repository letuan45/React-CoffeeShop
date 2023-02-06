import React from "react";
import classes from "./TextArea.module.css";

const TextArea = (props) => {
  return (
    <React.Fragment>
      <label htmlFor={props.name}>{props.label} {props.isRequired ? "*" : ""}</label>
      <textarea
        id={props.name}
        name={props.name}
        cols={props.cols}
        rows={props.rows}
        className={classes.text}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      ></textarea>
    </React.Fragment>
  );
};

export default TextArea;
