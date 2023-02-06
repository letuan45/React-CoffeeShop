import React, { useState } from "react";
import { useFormik } from "formik";

import classes from "./Booking.module.css";
import useHttp from "../../../hooks/use-http";

import bookingBackground from "../../../assets/booking-bg.png";
import blackLeaf from "../../../assets/black-leaf.png";
import coffeeMug from "../../../assets/coffee-mug.png";
import smoke from "../../../assets/smoke.png";
import stamp from "../../../assets/stamp.png";

import InputNoLabel from "../../UI/Input/InputNoLabel";
import BlackWhiteButton from "../../UI/Button/BlackWhiteButton";
import LoadingIcon from "../../LoadingIcon/LoadingIcon";
import { useEffect } from "react";

const validate = (values) => {
  const errors = {};

  if (!values.name || values.name.trim().length === 0) {
    errors.name = "Please type your name !";
  } else if (!/^[a-zA-Z ]+$/g.test(values.name)) {
    errors.name = "Name is not valid !";
  }

  if (!values.phone || values.phone.trim().length === 0) {
    errors.phone = "Please type your phone !";
  } else if (!/0[0-9]{9}/.test(values.phone)) {
    errors.phone = "Phone is not valid !";
  }

  if (!values.comment || values.comment.trim().length === 0) {
    errors.comment = "Please let we know something !";
  }

  return errors;
};

const Booking = () => {
  const {
    isLoading: bookingIsLoading,
    error: bookingError,
    fetchHandler: bookingTable,
  } = useHttp();

  const [bookingData, setBookingData] = useState(null);

  const bookingUrl =
    "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/BookingOrder.json";

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      comment: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      bookingTable(
        {
          url: bookingUrl,
          method: "POST",
          body: values,
          header: {
            "Content-Type": "application/json",
          },
        },
        (data) => {
          setBookingData(data);
        }
      );
      resetForm();
    },
  });

  let content;

  if (bookingIsLoading) {
    content = (
      <div className={classes["loading-wrapper"]}>
        <LoadingIcon />
        <div className={classes["loading-title"]}>Loading your order</div>
      </div>
    );
  } else if (bookingError) {
    content = <div className={classes["book-error"]}>{bookingError}</div>;
  } else {
    content = null;
  }

  useEffect(() => {
    setTimeout(() => {
      setBookingData(null);
    }, 5000);
  }, [bookingData]);

  const conatinerClasses = `container ${classes.container}`;

  const bookingFormClasses = `col-xl-6 col-lg-12 col-sm-12 ${classes['booking-from']}`

  return (
    <section className="booking">
      <div
        className={classes["main-bg"]}
        style={{ backgroundImage: `url(${bookingBackground})` }}
      >
        <div className={conatinerClasses}>
          <div
            className="row justify-content-center align-items-center"
            style={{ padding: "10px 0" }}
          >
            <div className="col-xl-6 col-lg-12 col-sm-12">
              <div className={classes["coffee-mug"]}>
                <img src={coffeeMug} alt="coffee-mug" />
                <div className={classes["smoke-wrap"]}>
                  <img src={smoke} alt="smoke" className={classes["smoke"]} />
                </div>
                <div className={classes["smoke-wrap"]}>
                  <img src={smoke} alt="smoke" className={classes["smoke2"]} />
                </div>
                <div className={classes["smoke-wrap-2"]}>
                  <img src={smoke} alt="smoke" className={classes["smoke2"]} />
                </div>
                <div className={classes["smoke-wrap-2"]}>
                  <img src={smoke} alt="smoke" className={classes["smoke3"]} />
                </div>
                <div className={classes["smoke-wrap-2"]}>
                  <img src={smoke} alt="smoke" className={classes["smoke3"]} />
                </div>
                <div className={classes["stamp"]}>
                  <img src={stamp} alt="stamp" />
                </div>
              </div>
            </div>
            <div
              className={bookingFormClasses}
              style={{ padding: "50px" }}
            >
              <div
                className={classes["contact-form"]}
                style={{ backgroundImage: `url(${blackLeaf})` }}
              >
                <h4 className={classes["title"]}>
                  <span>Contact us</span>
                  <span>for booking a table</span>
                </h4>
                <div className={classes["form-group"]}>
                  <form action="./booking-table" onSubmit={formik.handleSubmit}>
                    {formik.touched.name && formik.errors.name ? (
                      <div className={classes["error-message"]}>
                        {formik.errors.name}
                      </div>
                    ) : null}
                    <InputNoLabel
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className={classes["error-message"]}>
                        {formik.errors.phone}
                      </div>
                    ) : null}
                    <InputNoLabel
                      placeholder="Phone start with 0 and 10 digits"
                      type="text"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.comment && formik.errors.comment ? (
                      <div className={classes["error-message"]}>
                        {formik.errors.comment}
                      </div>
                    ) : null}
                    <InputNoLabel
                      placeholder="Comment"
                      type="text"
                      name="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {content}
                    {bookingData && (
                      <span className={classes["success-message"]}>
                        Booking successfully !
                      </span>
                    )}
                    <div className={classes["button-control"]}>
                      <BlackWhiteButton to="#" type="submit">
                        Book Now
                      </BlackWhiteButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
