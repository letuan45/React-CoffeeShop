import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/index";

import NumberInput from "../../UI/Input/NumberInput";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const totalPrice = (props.item.price * props.item.quantity).toFixed(2);
  const [total, setTotal] = useState(totalPrice);

  const newValueHandler = (value) => {
    setTotal((props.item.price * value).toFixed(2));
    dispatch(
      cartActions.setNewQuantity({ id: props.item.id, quantity: +value })
    );
  };

  const removeProductHandler = (event) => {
    event.preventDefault();
    dispatch(cartActions.removeEntireItem({ id: props.item.id }));
  };

  console.log(props.item)

  return (
    <li className={classes.item}>
      <Link to={`/products/${props.item.id}`} className={classes.image}>
        <img
          src={require(`../../../assets/${props.item.image}`)}
          alt={props.item.name}
        ></img>
      </Link>
      <div className={classes.desc}>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Link
            to={`/products/${props.item.id}`}
            className={classes.name}
          >
            {props.item.name}
          </Link>
          <button className={classes.remove} onClick={removeProductHandler}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <NumberInput
          quantity={20}
          value={props.item.quantity}
          setNewQuantity={newValueHandler}
        />
        <span className={classes.total}>Total: ${total}</span>
      </div>
    </li>
  );
};

export default CartItem;
