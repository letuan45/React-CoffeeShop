import React from "react";
import classes from "./MenuItem.module.css";

const MenuItem = (props) => {
  return (
    <li className={classes["menu-item"]}>
      <div className={classes["item-image"]}>
        <img src={require(`../../assets/Menu/${props.item.image}`)} alt={props.item.description} />
      </div>
      <div className={classes["item-description"]}>
        <div className={classes["item-title"]}>
          <h6 className={classes["item-name"]}>{props.item.name}</h6>
          <span className={classes["three-dots"]}></span>
          <h6 className={classes["item-price"]}>${props.item.price.toFixed(2)}</h6>
        </div>
        <div className={classes["item-desc"]}>
          <p>{props.item.ingredient}</p>
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
