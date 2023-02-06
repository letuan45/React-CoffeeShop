import React from "react";
import classes from "./Notify.module.css";

const Notify = (props) => {
  const styledClasses = `${classes["notify-wapper"]} ${
    props.notify.type === "error" ? classes.error : "" 
  } ${props.notify.type === "success" ? classes.success : ""}`;

  return <div className={styledClasses}>{props.notify.message}</div>;
};

export default Notify;
