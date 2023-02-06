import React from "react";
import { Link } from "react-router-dom";
import { cartActions } from "../../store";
import { useDispatch } from "react-redux";

import classes from "./ProductItem.module.css";
import GreenWhiteButton from "../UI/Button/GreenWhiteButton";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const itemClasses = `${classes.item} ${classes[`${props.className}`]}`;

  const addToCart = (event) => {
    event.preventDefault();

    const item = {
      id: props.item.id,
      name: props.item.name,
      image: props.item.image,
      quantity: 1,
      price: props.item.price,
    };
    dispatch(cartActions.setIsLoadingOneItemOn(item));
  };

  return (
    <div className={itemClasses}>
      {/* {isShowLoad && <Backdrop onClose={closeLoadHandler} />}
      {isShowLoad && (
        <AddCartLoading className={`${isOnAnimation ? "show" : ""}`} />
      )} */}
      <Link to={`/products/${props.item.id}`}>
        <img
          className={classes.image}
          src={require(`../../assets/${props.item.image}`)}
          alt={props.item.name}
        />
        <div className={classes.overlay}>
          <img
            src={require(`../../assets/${props.item.image}`)}
            alt={props.item.name}
          />
        </div>
        <div className={classes["button-group"]}>
          <GreenWhiteButton onClick={addToCart}>Add to cart</GreenWhiteButton>
        </div>
      </Link>
      <div className={classes.description}>
        <Link to={`/products/${props.item.id}`}>
          <h2>{props.item.name}</h2>
        </Link>
        <span className={classes.price}>${props.item.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductItem;
