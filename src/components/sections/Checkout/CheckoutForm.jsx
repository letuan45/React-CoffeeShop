import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./CheckoutForm.module.css";
import useHttp from "../../../hooks/use-http";
import GreenWhiteButtonLg from "../../UI/Button/GreenWhiteButtonLg";
import NormalButton from "../../UI/Button/NormalButton";
import { cartActions } from "../../../store/index";
import { callAsync } from "../../../services/CallAsync";
import { putAsync } from "../../../services/CallAsync";

const validate = (values) => {
  const errors = {};

  if (!values.fname || values.fname.trim().length === 0) {
    errors.fname = "Please type your first name !";
  } else if (
    !/^[a-zA-Z ]+$/g.test(values.fname) ||
    values.fname.trim().length > 50
  ) {
    errors.fname = "First name is not valid !";
  }

  if (!values.lname || values.lname.trim().length === 0) {
    errors.lname = "Please type your last name !";
  } else if (
    !/^[a-zA-Z]+$/g.test(values.lname) ||
    values.lname.trim().length > 20
  ) {
    errors.lname = "Last name is not valid !";
  }

  if (!values.country || values.country.trim().length === 0) {
    errors.country = "Please type your country !";
  } else if (!/^[a-zA-Z ]+$/g.test(values.country)) {
    errors.country = "Country is not valid !";
  }

  if (!values.street || values.street.trim().length === 0) {
    errors.street = "Please type your street !";
  }

  if (!values.city || values.city.trim().length === 0) {
    errors.city = "Please type your town or city !";
  } else if (!/^[a-zA-Z ]+$/g.test(values.city)) {
    errors.city = "Town or City is not valid !";
  }

  if (!/[0-9]{6}/.test(values.postcode) || values.postcode.trim().length > 6) {
    errors.postcode = "Post code or ZIP is not valid !";
  }

  if (!values.phone || values.phone.trim().length === 0) {
    errors.phone = "Please type your phone !";
  } else if (
    !/0[0-9]{9}/.test(values.phone) ||
    values.phone.trim().length > 10
  ) {
    errors.phone = "Phone is not valid !";
  }

  if (!values.checkoutemail || values.checkoutemail.trim().length === 0) {
    errors.checkoutemail = "Please type your email !";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.checkoutemail)
  ) {
    errors.checkoutemail = "Email is not valid !";
  }

  return errors;
};

const Input = (props) => {
  return (
    <React.Fragment>
      <label htmlFor={props.name} className={classes.label}>
        {props.label}
      </label>
      {props.error && <span className={classes.error}>{props.error}</span>}
      <input
        value={props.value}
        type={props.type}
        id={props.name}
        name={props.name}
        className={classes["control-input"]}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </React.Fragment>
  );
};

const CheckoutMainForm = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [formHasError, setFormHasError] = useState(false);
  const userEmail = user ? user.email : "";
  const sendOrderUrl =
    "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/CartOrder.json";
  const { cart } = props;
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [products, setProducts] = useState([]);
  const [urls, setUrls] = useState([]);
  const { error: orderHasError, fetchHandler: sendOrder } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangePayment = (event) => {
    setPaymentMethod(event.target.value);
  };

  //Get multiple Products
  useEffect(() => {
    const baseProductUrl =
    "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Product/";
    let urls = [];
    for (const index in cart) {
      urls.push(baseProductUrl + `${cart[index].id}.json`);
    }
    setUrls(urls);

    callAsync(urls).then((data) => {
      setProducts(data);
    });
  }, [cart])

  //INPUT STATES
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      company: "",
      country: "",
      street: "",
      city: "",
      postcode: "",
      phone: "",
      checkoutemail: userEmail,
      additionalInfo: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      const order = { ...values, payment: paymentMethod, cart };
      //Change quantity if quantity is negative, return
      for (const idx in products) {
        products[idx].quantity -= cart[idx].quantity;
        if(products[idx].quantity < 0 ) {
          setFormHasError(true);
          return;
        }
      }
      if (urls.length > 0 && products.length > 0) {
        const data = putAsync(urls, products);
        if(!data) {
          setFormHasError(true);
          return;
        }
      }

      //Send order to firebase
      sendOrder(
        {
          url: sendOrderUrl,
          method: "POST",
          body: order,
          header: {
            "Content-Type": "application/json",
          },
        },
        (data) => {}
      );
      navigate("/checkout-success");
      dispatch(cartActions.clearCart());
      resetForm();
    },
  });

  useEffect(() => {
    setFormHasError(!formik.isValid);
  }, [formik.isValid]);

  return (
    <form className={classes["control-form"]} onSubmit={formik.handleSubmit}>
      <div>
        <h3 className={classes.header}>Billing Details</h3>
        <div className="row">
          <div className="col-xl-6">
            <Input
              name="fname"
              label="First Name *"
              type="text"
              placeholder="First Name 50 character"
              value={formik.values.fname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fname && formik.errors.fname
                  ? formik.errors.fname
                  : null
              }
            />
          </div>
          <div className="col-xl-6">
            <Input
              name="lname"
              label="Last Name *"
              type="text"
              placeholder="Last Name"
              value={formik.values.lname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.lname && formik.errors.lname
                  ? formik.errors.lname
                  : null
              }
            />
          </div>
          <div className="col-xl-12">
            <Input
              name="company"
              label="Company Name (optional)"
              type="text"
              placeholder="Company Name"
              value={formik.values.company}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-xl-12">
            <Input
              name="country"
              label="Country / Region *"
              type="text"
              placeholder="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.country && formik.errors.country
                  ? formik.errors.country
                  : null
              }
            />
          </div>
          <div className="col-xl-12">
            <Input
              name="street"
              label="Street address *"
              type="text"
              placeholder="House number & street"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.street && formik.errors.street
                  ? formik.errors.street
                  : null
              }
            />
          </div>
          <div className="col-xl-12">
            <Input
              name="city"
              label="Town / City *"
              type="text"
              placeholder=""
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.city && formik.errors.city
                  ? formik.errors.city
                  : null
              }
            />
          </div>
          <div className="col-xl-12">
            <Input
              name="postcode"
              label="Postcode / ZIP (optional)"
              type="text"
              placeholder="Postcode"
              value={formik.values.postcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.postcode && formik.errors.postcode
                  ? formik.errors.postcode
                  : null
              }
            />
          </div>
          <div className="col-xl-6">
            <Input
              name="phone"
              label="Phone *"
              type="text"
              placeholder="Enter your number ..."
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : null
              }
            />
          </div>
          <div className="col-xl-6">
            <Input
              name="checkoutemail"
              label="Email *"
              type="email"
              placeholder="Enter your email ..."
              value={formik.values.checkoutemail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.checkoutemail && formik.errors.checkoutemail
                  ? formik.errors.checkoutemail
                  : null
              }
            />
          </div>
          <div className="col-xl-12">
            <label htmlFor="note" className={classes.label}>
              Additional Information (optional)
            </label>
            <textarea
              id="additionalInfo"
              value={formik.values.additionalInfo}
              onChange={formik.handleChange}
              className={classes["control-text"]}
              placeholder="Note about your order, Special note for delivery !"
            ></textarea>
          </div>
        </div>
      </div>
      <div className={classes["sub-wrapper"]}>
        <h3 className={classes.header}>Your Order</h3>
        <div className="row">
          <table className={classes["order-table"]}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.name} x {item.quantity}
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th className={classes.total}>Total</th>
                <td>
                  $
                  {cart
                    .reduce(
                      (prev, curr) => prev + curr.price * curr.quantity,
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className={classes["sub-wrapper"]}>
        <h3 className={classes.header}>Payment Method</h3>
        <div className="row">
          <ul className={classes["methods-list"]}>
            <li className={classes["payment-method_item"]}>
              <div>
                <input
                  type="radio"
                  name="payment_method"
                  value="cod"
                  defaultChecked="checked"
                  id="cod"
                  onChange={onChangePayment}
                />
                <label htmlFor="cod">COD (Cash on delivery) </label>
              </div>
              {paymentMethod === "cod" && (
                <p className={classes["payment-des"]}>
                  A type of transaction where the recipient pays for a good at
                  the time of delivery. Make sure you have cash at delivery time
                </p>
              )}
            </li>
            <li className={classes["payment-method_item"]}>
              <div>
                <input
                  type="radio"
                  name="payment_method"
                  value="check"
                  id="check"
                  onChange={onChangePayment}
                />
                <label htmlFor="check">Check payments </label>
              </div>
              {paymentMethod === "check" && (
                <p className={classes["payment-des"]}>
                  Please send a check to Store Name, Store Street, Store Town,
                  Store State / County, Store Postcode
                </p>
              )}
            </li>
            <li className={classes["payment-method_item"]}>
              <div>
                <input
                  type="radio"
                  name="payment_method"
                  value="paypal"
                  id="paypal"
                  onChange={onChangePayment}
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
              {paymentMethod === "paypal" && (
                <img
                  className={classes.paypal}
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
                  alt="paypal"
                ></img>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <NormalButton type="submit">PLACE ORDER</NormalButton>
        {formHasError && (
          <span
            style={{
              color: "var(--red)",
              fontSize: "1.6rem",
              marginLeft: "20px",
            }}
          >
            Failed to process your order !
          </span>
        )}
      </div>
      {orderHasError && (
        <div
          className={classes.error}
          style={{ marginTop: "20px", display: "block" }}
        >
          Sending order has error detected, please try again later !
        </div>
      )}
    </form>
  );
};

const CheckoutForm = () => {
  const cartItems = useSelector((state) => state.cartItems.items);

  let content = (
    <p className={classes.empty}>
      Your cart is currently empty. Please add to cart to proceed checkout
    </p>
  );

  if (cartItems.length > 0) {
    content = (
      <div className={classes["form-wrapper"]}>
        <CheckoutMainForm cart={cartItems} />
      </div>
    );
  }

  return (
    <section className="checkout">
      <div className={classes.wrapper}>
        <div className="container">
          <div className="row">
            {content}
            <div className={classes["button-group"]}>
              <GreenWhiteButtonLg to="/products">Return to shop</GreenWhiteButtonLg>
              <GreenWhiteButtonLg to="/cart">Cart</GreenWhiteButtonLg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
