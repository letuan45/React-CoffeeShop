import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import NumberInput from "../../UI/Input/NumberInput";
import { cartActions } from "../../../store/index";
import classes from "./Details.module.css";
import RatingPoint from "./RatingPoint";
import NormalButton from "../../UI/Button/NormalButton";
import CategoriesAndTags from "./CategoriesAndTags";
import Tab from "./Tab";
import ProductReview from "./ProductReview";
import useHttp from "../../../hooks/use-http";
import { callAsync } from "../../../services/CallAsync";

const AdditionalInfo = (props) => {
  if (!props.additionItem && props.additionItem.length === 0) {
    return <p>This infomation not yet added !</p>;
  }
  return (
    <table className={classes.table}>
      <tbody>
        {props.additionItem.map((item) => {
          return (
            <tr key={item.id}>
              <th className={classes.name}>{item.name}</th>
              <td className={classes.value}>
                <p>{item.value}</p>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

let alowLoadReview = true;

const Details = (props) => {
  const stock = props.item.quantity;
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { item } = props;

  const productReviewURL = `https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Product/${item.id}/review/.json`;
  const { isLoading: isFetchingProduct, fetchHandler } = useHttp();
  const [reviews, setReviews] = useState([]);
  const [finalReviews, setFinalReviews] = useState([]);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    if (alowLoadReview || isReload) {
      fetchHandler({ url: productReviewURL }, (dbreview) => {
        let reviews = [];
        for (const reviewIdx in dbreview) {
          reviews.push({
            date: dbreview[reviewIdx].date,
            fk: dbreview[reviewIdx].id,
            id: reviewIdx,
            value: dbreview[reviewIdx].review,
          });
        }

        setReviews(reviews);
      });
    }
  }, [fetchHandler, productReviewURL, isReload]);

  useEffect(() => {
    if (reviews.length > 0 || isReload) {
      let userUrl = [];
      const reviewsFK = reviews.map((review) => review.fk);
      const baseURL =
        "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/User/";

      for (const key of reviewsFK) {
        userUrl.push(`${baseURL}${key}.json`);
      }

      callAsync(userUrl).then((data) => {
        let reviewsTrans = reviews;

        for (const rvIdx in reviewsTrans) {
          reviewsTrans[rvIdx].user = data[rvIdx];
        }
        reviewsTrans.sort((review1, review2) => {
          return review2.date - review1.date;
        });

        setFinalReviews(reviewsTrans);
        setIsReload(false);
      });
    }
  }, [reviews, isReload]);

  const reloadReviews = () => {
    setIsReload(true);
  };

  let nutrition = [];

  if (item.nutrition) {
    for (const key in item.nutrition) {
      nutrition.push({
        id: key,
        name: item.nutrition[key].name,
        value: item.nutrition[key].value,
      });
    }
  }

  const tabs = [
    {
      id: 0,
      title: "Description",
      description: (
        <div className={classes.des}>
          <p>{item.description}</p>
        </div>
      ),
    },
    {
      id: 1,
      title: "More information",
      description: <AdditionalInfo additionItem={nutrition} />,
    },
    {
      id: 2,
      title: "Reviews",
      description: (
        <ProductReview
          isLoading={isFetchingProduct}
          reviews={finalReviews}
          productId={item.id}
          reload={reloadReviews}
        />
      ),
    },
  ];

  const addToCartHandler = (event) => {
    event.preventDefault();
    const quantity = +inputRef.current.value;

    dispatch(cartActions.setIsLoadingOneItemOn({ ...item, quantity }));
  };

  return (
    <section className="product-details">
      <div className="container">
        <div className={classes["main-container"]}>
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className={classes.image}>
                <img
                  src={require(`../../../assets/${item.image}`)}
                  alt={item.name}
                ></img>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className={classes.summary}>
                <div className={classes.rating}>
                  <RatingPoint val={item.rating} />
                </div>
                <p className={classes.price}>
                  <span>${item.price.toFixed(2)}</span>
                </p>
                <p className={classes.description}>{item.description}</p>
                <span className={classes.stock}>In stock: {stock}</span>
                <form onSubmit={addToCartHandler}>
                  <div className={classes.controls}>
                    <NumberInput
                      quantity={item.quantity}
                      value={1}
                      ref={inputRef}
                    />
                    <div className={classes["to-cart"]}>
                      <NormalButton type="submit" disabled={stock === 0}>
                        {stock === 0 ? "Out of stock" : "Add to cart"}
                      </NormalButton>
                    </div>
                  </div>
                </form>
                <CategoriesAndTags item={item} />
              </div>
            </div>
            <div className="col-xl-12">
              <Tab tabItems={tabs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
