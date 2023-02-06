import React from "react";
import classes from "./SimpleButton.module.css";

const SimpleButton = React.memo((props) => {
  let buttonClasses = `${classes.btn} `;

  if(props.isActive) {
    buttonClasses += `${classes.active}`;
  }

  return (
    <button onClick={props.onClick} className={buttonClasses}>
      {props.children}
    </button>
  );
});

export default SimpleButton;
