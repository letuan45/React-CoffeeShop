import React from "react";
import { useSelector } from "react-redux";

import classes from "./Cart.module.css";

import leaves_pattern from "../../assets/leaves_pattern.png";
import SolidButton from "../UI/Button/SolidButton";
import BorderedButton from "../UI/Button/BoderedButton";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cartItems.items);

  const cartWrapperClasses = `${classes.wrapper} ${
    classes[`${props.className}`]
  }`;

  let content;

  if (cartItems && cartItems.length > 0) {
    const subTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    content = (
      <div className={classes["content-body"]}>
        <div className={classes["cart-list-wrapper"]}>
          <ul className={classes["cart-list"]}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
        <div className={classes.controls}>
          <div className={classes.summary}>
            <span className={classes["subtotal-header"]}>Subtotal:</span>
            <span className={classes.subtotal}>${subTotal.toFixed(2)}</span>
          </div>
          <div className={classes["button-group"]}>
            <SolidButton to="/checkout">CHECK OUT</SolidButton>
            <BorderedButton to="/cart">CART</BorderedButton>
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={classes.empty}>
        <p>
          <i className="fa-solid fa-basket-shopping"></i>
          <br></br>
          There is no item in your cart...
        </p>
      </div>
    );
  }

  return (
    <div className={cartWrapperClasses}>
      <div
        className={classes.header}
        style={{ backgroundImage: `url(${leaves_pattern})` }}
      >
        <h2>SHOPPING CART</h2>
        <button className={classes["close-btn"]} onClick={props.onClose}>
          Close
          <div className={classes["icon-group"]}>
            <span className={classes["x-icon"]}></span>
            <span className={classes["x-icon"]}></span>
          </div>
        </button>
      </div>
      {content}
    </div>
  );
};

export default Cart;
