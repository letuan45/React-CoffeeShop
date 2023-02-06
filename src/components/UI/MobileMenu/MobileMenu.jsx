import React from "react";
import classes from "./MobileMenu.module.css";
import logo from "../../../assets/kaffa_logo_dark.png";
import MobileMenuItem from "./MobileMenuItem";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/index";
import useAuth from "../../../hooks/use-auth";
import { useNavigate } from "react-router-dom";

const MobileMenu = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = useSelector((state) => state.auth).user;

  const wrapperClasses = `${classes.wrapper} ${
    props.active ? classes.active : ""
  }`;

  const onAuth = () => {
    if (user) {
      return;
    }
    props.onClose();
    dispatch(modalActions.openAuth());
  };

  const logoutHandler = (event) => {
    event.preventDefault();

    auth.logoutHandler();
    navigate("/");
  };

  const cartItems = useSelector((state) => state.cartItems.items);
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  //Initial Menu items list
  const menuItems = [
    {
      to: "/",
      title: "Home",
    },
    {
      title: "About us",
      subMenu: [
        {
          title: "Testimonials",
          to: "/testimonials",
        },
        {
          title: "FAQ",
          to: "/faq",
        },
        {
          title: "Gallery",
          to: "/gallery",
        },
      ],
    },
    {
      title: "Products",
      subMenu: [
        {
          title: "Shop",
          to: "/products",
        },
        {
          title: "Cart",
          to: "/cart",
        },
        {
          title: "Check out",
          to: "/checkout",
        },
        {
          title: "My account",
          to: "/account",
        },
      ],
    },
    {
      to: "/contacts",
      title: "Contacts",
    },
  ];

  const menuItemList = (
    <ul>
      {menuItems.map((menuItem, index) => (
        <MobileMenuItem item={menuItem} key={index}></MobileMenuItem>
      ))}
    </ul>
  );

  return (
    <div className={wrapperClasses}>
      <div className={classes["menu-header"]}>
        <div className={classes.logo}>
          <img src={logo} alt="logo" />
        </div>
        <button
          className={classes["nav-mobile__close"]}
          onClick={props.onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      {menuItemList}
      <div className={classes["short-cuts"]}>
        <Link to="/cart" className={classes["cart-shortcut"]}>
          <i className="fa-solid fa-cart-shopping"></i>
          <span className={classes["cart-quantity"]}>{cartQuantity}</span>
        </Link>
        <button className={classes["user-shortcut"]} onClick={onAuth}>
          <i className="fa-solid fa-user"></i>
        </button>
      </div>
      {user && (
        <div className={classes["user-interact"]}>
          <p>Hello! {user.displayName}</p>
          <button className={classes["log-out"]} onClick={logoutHandler}>
            Logout
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      )}
      <form className={classes["search-form"]}>
        <input placeholder="Search" className={classes["search-input"]}></input>
        <button type="submit" className={classes["search-btn"]}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default MobileMenu;
