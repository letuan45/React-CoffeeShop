import React from "react";
import classes from "./BigCart.module.css";
import GreenWhiteButtonLg from "../../UI/Button/GreenWhiteButtonLg";
import CartItem from "./CartItem";

import { useSelector } from "react-redux";

const BigCart = () => {
  const cart = useSelector((state) => state.cartItems.items);
  let content = <p className={classes.empty}>Your cart is currently empty.</p>;

  const cartHaveItems = cart.length > 0;

  const grandTotal = cart
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  if (cartHaveItems) {
    content = (
      <ul>
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
    );
  }

  return (
    <section>
      <div className={classes.wrapper}>
        <div className="container">
          <div className="row">{content}</div>
          {cartHaveItems && (
            <div className={classes["grand-total"]}>
              GRAND TOTAL: <span>${grandTotal}</span>
            </div>
          )}
          <div className={classes["button-group"]}>
            <GreenWhiteButtonLg to="/">Return to shop</GreenWhiteButtonLg>
            {cartHaveItems && (
              <GreenWhiteButtonLg to="/checkout">Check out</GreenWhiteButtonLg>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigCart;
