import React from "react";
import RatingPoint from "../sections/ProductDetails/RatingPoint";
import classes from "./ReviewItem.module.css";

import userImage from "../../assets/icons/user.jpg";

const getFormattedDate = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return day + "/" + month + "/" + year;
};

const ReviewItem = (props) => {
  const review = props.item.value;
  const userName = props.item.user.userDisplayName;
  const date = new Date(props.item.date);

  return (
    <li className={classes.item}>
      <img src={userImage} alt="user" className={classes.image}></img>
      <div className={classes.wrapper}>
        <div className={classes["user-meta"]}>
          <div className={classes["user-info"]}>
            <strong>{userName}</strong>
            <span className={classes["user-info__dash"]}>–</span>
            <span className={classes["review-date"]}>
              {getFormattedDate(date)}
            </span>
          </div>
          <RatingPoint val={review.ratingValue} />
        </div>
        <div className={classes["user-comment"]}>
          <p>{review.review}</p>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
