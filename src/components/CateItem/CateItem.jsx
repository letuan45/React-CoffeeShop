import React from "react";
import { Link } from "react-router-dom";
import classes from "./CateItem.module.css";

const CateItem = (props) => {
  return (
    <li className={classes.item}>
      <Link to={`/product-category/${props.path}`}>
        <i className="fa-solid fa-angle-right"></i>
        {props.children}
      </Link>
      {props.sub}
    </li>
  );
};

export default CateItem;
