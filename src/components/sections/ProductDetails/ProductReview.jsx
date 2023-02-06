import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";

import NormalButton from "../../UI/Button/NormalButton";
import TextArea from "../../UI/Input/TextArea";
import classes from "./ProductReview.module.css";
import useHttp from "../../../hooks/use-http";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import LoadingIcon from "../../LoadingIcon/LoadingIcon";
import ProductReviewList from "./ProductReviewList";

const validate = (values) => {
  const errors = {};

  if (!values.review || values.review.trim().length === 0) {
    errors.review = "Please type your review !";
  }

  return errors;
};

const ProductReview = (props) => {
  const productURL = `https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Product/${props.productId}/review/.json`;
  const {
    isLoading: isPosting,
    error: postHasErr,
    fetchHandler: postReview,
  } = useHttp();
  const auth = useSelector((state) => state.auth);
  const user = auth.user ? auth.user : null;
  const [ratingValue, setRatingValue] = useState(0);
  const ratingURL = `https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Product/${props.productId}/rating/.json`;
  const { isLoading: isRating, fetchHandler: putRating } = useHttp();

  const handleRatingChange = (event) => {
    setRatingValue(+event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      review: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      //Send review
      if (!user) {
        alert("You have been expired ! Please login again");
        return;
      }
      resetForm();
      setRatingValue(0);

      const customerReview = {
        review: values.review,
        ratingValue: ratingValue,
      };
      const userReview = {
        id: user.id,
        date: new Date().getTime(),
        review: customerReview,
      };
      postReview(
        {
          url: productURL,
          method: "POST",
          body: userReview,
          headers: {
            "Content-Type": "application/json",
          },
        },
        () => {
          const reviewsTrans = props.reviews;
          const ratingAVG =
            reviewsTrans.reduce(
              (acc, review) => acc + review.value.ratingValue,
              0
            ) / reviewsTrans.length;
          let ratingResult = Math.floor(ratingAVG * 2) / 2;
          if(!ratingResult) { //First rating
            ratingResult = ratingValue;
          }

          putRating(
            {
              url: ratingURL,
              method: "PUT",
              body: ratingResult,
              headers: { "Content-Type": "application/json" },
            },
            (data) => {}
          );

          resetForm();
          formik.ratingValue = "";
          props.reload();
        }
      );

      // putRating(
      //   {
      //     url: ratingURL,
      //     method: "PUT",
      //     body: ratingResult,
      //     headers: { "Content-Type": "application/json" },
      //   },
      //   (data) => {}
      // );
    },
  });

  if (props.isLoading) {
    return <LoadingIcon />;
  }

  if (!user) {
    return (
      <div className={classes["login-required"]}>
        You Have to Login in order to see all review and review product !
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <ProductReviewList reviews={props.reviews} />
      <div className={classes["form-wrapper"]}>
        <h2>Add a review</h2>
        <form onSubmit={formik.handleSubmit}>
          <div classes={classes.controls}>
            <label
              style={{
                fontFamily: '"Jost", sans-serif',
              }}
            >
              Your rating *
            </label>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                sx={{
                  "& .MuiSvgIcon-root": {
                    width: "2.5rem",
                    height: "2.5rem",
                  },
                }}
                name="ratingValue"
                value={ratingValue}
                precision={1}
                onChange={handleRatingChange}
              />
            </Box>
            <TextArea
              name="review"
              cols={45}
              rows={8}
              label="Your Review"
              value={formik.values.review}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className={classes["validate-err"]}>
              {formik.touched.review && formik.errors.review
                ? formik.errors.review
                : null}
              <br></br>
              {postHasErr ? "Review failed ! Please try again later !" : ""}
            </div>
          </div>
          <div className={classes["btn-wrapper"]}>
            <NormalButton type="submit">
              {isPosting || isRating ? <LoadingIcon /> : "Submit"}
            </NormalButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductReview;
