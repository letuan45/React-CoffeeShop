import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/kaffa_logo_light.png";
import logoDark from "../../assets/kaffa_logo_dark.png";

import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import useViewport from "../../hooks/use-viewport";
import Backdrop from "../UI/Modal/Backdrop";
import AuthModal from "../UI/Modal/AuthModal";
import Cart from "../Cart/Cart";
import { modalActions } from "../../store/index";
import useAuth from "../../hooks/use-auth";
import MobileMenu from "../UI/MobileMenu/MobileMenu";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth).user;
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);
  const mobileMenuIsOpen = useSelector(
    (state) => state.modalControls.mobileMenuIsOpen
  );
  const authIsOpen = useSelector((state) => state.modalControls.authIsOpen);
  const cartIsOpen = useSelector((state) => state.modalControls.cartIsOpen);
  const [isToggleDropdown1, setIsToggleDropdown1] = useState(false);
  const [isToggleDropdown2, setIsToggleDropdown2] = useState(false);
  const auth = useAuth();

  //Media
  const { width: viewPort } = useViewport();

  useEffect(() => {
    if (viewPort <= 1200) {
      setMobileMenuIsShown(true);
    } else {
      setMobileMenuIsShown(false);
    }
  }, [viewPort]);

  const navClasses = `container ${classes["nav-wrapper"]} 
  } ${mobileMenuIsOpen ? classes["open"] : classes["close"]}`;

  //CART
  const cartItems = useSelector((state) => state.cartItems.items);
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  let menuClasses = `${classes["menu-wrapper"]} 
  }`;

  const showMenuHandler = () => {
    dispatch(modalActions.openMenu());
  };

  const closeMobileNavHandler = () => {
    dispatch(modalActions.closeMenu());
  };

  //Submenu
  const toggleDropdown1 = () => {
    setIsToggleDropdown1((prevState) => !prevState);
  };

  const toggleDropDownClass1 = `${classes["nav-dropdown"]} ${
    isToggleDropdown1 ? classes["expanse-on"] : ""
  }`;

  const toggleDropdown2 = () => {
    setIsToggleDropdown2((prevState) => !prevState);
  };

  const toggleDropDownClass2 = `${classes["nav-dropdown"]} ${
    isToggleDropdown2 ? classes["expanse-on"] : ""
  }`;

  //Events
  const openAuthHandler = () => {
    if (user) {
      return;
    }
    dispatch(modalActions.openAuth());
  };

  const closeLoginFormHandler = () => {
    dispatch(modalActions.closeAuth());
  };

  const closeCartHandler = () => {
    dispatch(modalActions.closeCart());
  };

  const openCartHandler = () => {
    dispatch(modalActions.openCart());
  };

  //Active class for nav item
  const addClassHandler = (event) => {
    const activeNavLink = event.target;

    if (activeNavLink) {
      const parent = activeNavLink.closest(`.${classes["nav-item"]}`);
      const dropdownTitleElement = parent.querySelector(
        `.${classes["dropdown-title"]}`
      );

      dropdownTitleElement.classList.add(`${classes.active}`);
    }
  };

  const removeActiveHandler = (event) => {
    const activeNavLink = event.target;

    if (activeNavLink) {
      const parent = activeNavLink.closest(`.${classes["main-menu"]}`);
      const dropdownTitleElement = parent.querySelectorAll(
        `.${classes["dropdown-title"]}`
      );

      for (const element of dropdownTitleElement) {
        element.classList.remove(`${classes.active}`);
      }
    }
  };

  //User
  const logoutHandler = (event) => {
    event.preventDefault();

    auth.logoutHandler();
    navigate("/");
  };

  return (
    <React.Fragment>
      {authIsOpen && <Backdrop onClose={closeLoginFormHandler} />}
      {cartIsOpen && <Backdrop onClose={closeCartHandler} />}
      <AuthModal
        className={`${authIsOpen ? "active" : ""}`}
        onClose={closeLoginFormHandler}
      />
      <Cart
        className={`${cartIsOpen ? "active" : ""}`}
        onClose={closeCartHandler}
      />
      {mobileMenuIsShown && (
        <MobileMenu active={mobileMenuIsOpen} onClose={closeMobileNavHandler} />
      )}
      <header className={classes["main-header"]}>
        <nav>
          <div className={navClasses}>
            <div>
              <Link to="/" className={classes["logo"]}>
                <img src={logo} alt="kaffa-logo" />
              </Link>
            </div>
            <div className={menuClasses}>
              <div className={classes["nav-mobile-header"]}>
                <div className={classes["img-wrapper"]}>
                  <Link to="/" className={classes["logo-m"]}>
                    <img src={logoDark} alt="kaffa-logo-dark" />
                  </Link>
                </div>
              </div>
              <ul className={classes["main-menu"]}>
                <li className={classes["nav-item"]}>
                  <NavLink
                    to="/"
                    className={(navData) =>
                      navData.isActive ? classes.active : ""
                    }
                    onClick={removeActiveHandler}
                  >
                    Home
                  </NavLink>
                </li>
                <li className={classes["nav-item"]}>
                  <div className={toggleDropDownClass1}>
                    <span
                      className={classes["dropdown-title"]}
                      onClick={toggleDropdown1}
                    >
                      About us
                    </span>
                    <i className="fa-solid fa-angle-left"></i>
                    <ul className={classes["nav-inner-list"]}>
                      <li className={classes["nav-inner-item"]}>
                        <Link to="/about-us/testimonials">Testimonials</Link>
                      </li>
                      <li className={classes["nav-inner-item"]}>
                        <Link to="/about-us/faq">FAQ</Link>
                      </li>
                      <li className={classes["nav-inner-item"]}>
                        <Link to="/about-us/gallery">Gallery</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={classes["nav-item"]}>
                  <div className={toggleDropDownClass2}>
                    <span
                      className={classes["dropdown-title"]}
                      onClick={toggleDropdown2}
                    >
                      Products
                    </span>
                    <i className="fa-solid fa-angle-left"></i>
                    <ul className={classes["nav-inner-list"]}>
                      <li className={classes["nav-inner-item"]}>
                        <NavLink
                          to="/products"
                          className={(navData) =>
                            navData.isActive ? classes.active : ""
                          }
                          onClick={addClassHandler}
                        >
                          Shop
                        </NavLink>
                      </li>
                      <li className={classes["nav-inner-item"]}>
                        <NavLink
                          to="/cart"
                          className={(navData) =>
                            navData.isActive ? classes.active : ""
                          }
                          onClick={addClassHandler}
                        >
                          Cart
                        </NavLink>
                      </li>
                      <li className={classes["nav-inner-item"]}>
                        <NavLink
                          to="/checkout"
                          className={(navData) =>
                            navData.isActive ? classes.active : ""
                          }
                          onClick={addClassHandler}
                        >
                          Check out
                        </NavLink>
                      </li>
                      <li className={classes["nav-inner-item"]}>
                        <NavLink
                          to="/account"
                          className={(navData) =>
                            navData.isActive ? classes.active : ""
                          }
                          onClick={addClassHandler}
                        >
                          My account
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={classes["nav-item"]}>
                  <NavLink
                    to="/contact"
                    onClick={removeActiveHandler}
                    className={(navData) =>
                      navData.isActive ? classes.active : ""
                    }
                  >
                    Contacts
                  </NavLink>
                </li>
              </ul>
              <div className={classes["phone-wrapper"]}>
                <span className={classes.phone}>
                  <i className="fa-solid fa-phone"></i>098-175-686-0
                </span>
              </div>
              <ul className={classes["nav-fn-list"]}>
                <li className={classes["nav-fn-list__item"]}>
                  <button
                    className={classes["btn-nav"]}
                    onClick={openAuthHandler}
                  >
                    <i className="fa-solid fa-user"></i>
                  </button>
                  {user && (
                    <ul className={classes["user-actions"]}>
                      <li className={classes["user-actions__item"]}>
                        <span className={classes.user}>{user.displayName}</span>
                      </li>
                      <li className={classes["user-actions__item"]}>
                        <button
                          onClick={logoutHandler}
                          type="button"
                          className={classes["user-action__btn"]}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
                <li className={classes["nav-fn-list__item"]}>
                  <button
                    className={classes["btn-nav"]}
                    onClick={openCartHandler}
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className={classes["cart-quantity"]}>
                      {cartQuantity}
                    </span>
                  </button>
                </li>
                <li className={classes["nav-fn-list__item"]}>
                  <button className={classes["btn-nav"]}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </li>
              </ul>
              <div className={classes["nav-mobile-search"]}>
                <input placeholder="Search" type="text" />
                <button className={classes["btn-search"]}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
            <button
              className={classes["three-lines"]}
              onClick={showMenuHandler}
            >
              <span className={classes["line"]}></span>
              <span className={classes["line"]}></span>
              <span className={classes["line"]}></span>
            </button>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default MainNavigation;
