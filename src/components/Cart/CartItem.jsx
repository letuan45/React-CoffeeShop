import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store";

import classes from "./CartItem.module.css";


const CartItem = (props) => {
  const dispatch = useDispatch();
  const subPrice = (props.item.quantity * props.item.price).toFixed(2);

  const removeItemHandler = (event) => {
    event.preventDefault();

    dispatch(cartActions.removeEntireItem({id: props.item.id}));
  }

  return (
    <li className={classes.item}>
      <button className={classes.remove} onClick={removeItemHandler}>
        <i className="fa-solid fa-circle-xmark"></i>
      </button>
      <div className={classes.info}>
        <Link
          to={`/products/${props.item.id}`}
          className={classes["image-wrapper"]}
        >
          <img
            src={require(`../../assets/${props.item.image}`)}
            alt={props.item.title}
          />
        </Link>
        <div className={classes.desc}>
          <Link to={`/products/${props.item.id}`} className={classes.name}>
            {props.item.name}
          </Link>
          <div className={classes.detail}>
            <span>{props.item.quantity}</span>
            <i className="fa-solid fa-xmark"></i>
            <span>${props.item.price.toFixed(2)}</span>
            <span className={classes["sub-price"]}> Total: ${subPrice}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
