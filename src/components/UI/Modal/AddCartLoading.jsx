import React from "react";
import ReactDOM from "react-dom";
import classes from "./AddCartLoading.module.css";
import coffeeFill from "../../../assets/icons/coffee-fill.png";

const AddCartLoadingElement = (props) => {
  const item = props.item;
  const isLoading = props.isLoading;

  const elementClasses = `${classes.wrapper} ${classes[`${props.className}`]}`;
  return (
    <div className={elementClasses}>
      <h1 className={classes.header}>ADD TO CART</h1>
      {isLoading && (
        <div className={classes.body}>
          <h3 className={classes["sub-header"]}>Please wait ...</h3>
          <div>
            <div
              className={classes.cup}
              style={{ backgroundImage: `url(${coffeeFill})` }}
            >
              <div className={classes.handle}></div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && item && (
        <div className={classes["item-body"]}>
          <h1 className={classes["success-header"]}>Added successfully !</h1>
          <div className={classes["item-wrapper"]}>
            <div className={classes.image}>
              <img
                src={require(`../../../assets/${item.image}`)}
                alt="product"
              />
            </div>
            <div className={classes.info}>
              <p className={classes["product-title"]}>{item.name}</p>
              <p className={classes["cart-info"]}>
                <span>Price: </span>
                ${item.price}
              </p>
              <p className={classes["cart-info"]}>
                <span>Quantity: </span>
                {item.quantity}
              </p>
              <p className={classes["cart-info"]}>
                <span>Total: </span>
                ${item.quantity * item.price}
              </p>
            </div>
            <button className={classes["close"]} onClick={props.onClose}>CONTINUE SHOPPING</button>
            <div className={classes["down-side-bg"]}></div>
          </div>
        </div>
      )}
    </div>
  );
};

const AddCartLoading = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <AddCartLoadingElement
          item={props.item}
          className={props.className}
          isLoading={props.isLoading}
          onClose={props.onClose}
        />,
        document.getElementById("load-to-cart-root")
      )}
    </React.Fragment>
  );
};

export default AddCartLoading;
