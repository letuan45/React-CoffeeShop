import useHttp from "../hooks/use-http";
import { useState, useEffect } from "react";

const useGetReview = (productId) => {
  const productReviewURL = `https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Product/${productId}/review/.json`;
  const { isLoading: isFetchingProduct, fetchHandler } = useHttp();
  const { isLoading: isFetchingUser, fetchHandler: getUser } = useHttp();
  const [reviews, setReviews] = useState([]);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    fetchHandler({ url: productReviewURL }, (review) => {
      let userUrl;
      let reviews = [];

      for (const reviewIdx in review) {
        userUrl = `https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/User/${review[reviewIdx].id}.json`;
        getUser({ url: userUrl }, (user) => {
          reviews.push({
            id: reviewIdx,
            date: review[reviewIdx].date,
            user: user,
            review: review[reviewIdx].review,
          });
          reviews.sort((review1, review2) => {
            return review2.date - review1.date;
          });

          setReviews(reviews);
        });
      }
    });
  }, [fetchHandler, productReviewURL, getUser, isReload]);

  return { isFetchingProduct, isFetchingUser, reviews, setIsReload };
};

export default useGetReview;
