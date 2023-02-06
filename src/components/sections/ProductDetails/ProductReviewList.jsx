import React from "react";

import classes from "./ProductReview.module.css";
import ReviewItem from "../../Product/ReviewItem";

const ProductReviewList = React.memo((props) => {
  if (props.reviews.length === 0) {
    return (
      <p className={classes["no-rv"]}>
        <i className="fa-solid fa-mug-hot"></i>
        There is no review for this product ...
      </p>
    );
  }

  return (
    <ul className={classes["review-list"]}>
      {props.reviews.map((review) => (
        <ReviewItem item={review} key={review.id} />
      ))}
    </ul>
  );
});

export default ProductReviewList;
