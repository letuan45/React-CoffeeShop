import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Backgound from "../components/Background/Backgound";
import Details from "../components/sections/ProductDetails/Details";
import useHttp from "../hooks/use-http";

const ProductDetails = () => {
  //get product
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const productURL = `https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Product/${productId}.json`;
  const { fetchHandler: fetchProduct } = useHttp();

  useEffect(() => {
    fetchProduct({ url: productURL }, (data) => {
      setProduct({
        id: productId,
        description: data.description,
        image: data.image,
        name: data.name,
        price: data.price,
        rating: data.rating,
        quantity: data.quantity,
        categories: data.categories,
        tags: data.tags,
        nutrition: data.nutrition
      });
    });
  }, [fetchProduct, productURL, productId]);

  if(!product) {
    return <p>This is not a product</p>
  }

  const breakcumbAddition = {
    title: product.name,
    link: `products/${productId}`,
  };

  return (
    <React.Fragment>
      <Backgound
        title={product.name}
        breakcumbAddition={breakcumbAddition}
        backgroundType={1}
      />
      <Details item={product} />
    </React.Fragment>
  );
};

export default ProductDetails;
