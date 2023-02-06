import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import useHttp from "../../../hooks/use-http";

import "swiper/css";
import "swiper/css/pagination";
import "./ProductSlide.css";

import ProductItem from "../../Product/ProductItem";
import classes from "./Products.module.css";
import GreenWhiteButtonLg from "../../UI/Button/GreenWhiteButtonLg";

const Products = () => {
  const baseURL =
    "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Product.json";
  const [productItems, setProductItems] = useState([]);

  const {erorr: productError, fetchHandler: fetchProducts } = useHttp();

  useEffect(() => {
    fetchProducts({ url: baseURL }, (data) => {
      const products = [];
      for(const index in data) {
        products.push({
          id: index,
          name: data[index].name,
          description: data[index].description,
          price: data[index].price,
          image: data[index].image,
          quantity: data[index].quantity
        });
        if(products.length === 9) break;
      }
      setProductItems(products);
    });
  }, [fetchProducts]);

  let content;

  if(!productError && productItems && productItems.length > 0) {
    content = productItems.map((item) => (
      <SwiperSlide key={item.id}>
        <ProductItem item={item} />
      </SwiperSlide>
    ));
  } 
  else if(productError) {
    content = <p>{productError}</p>;
  }
  else if(!productError && productItems.length === 0) {
    content = <p>WE STILL HAVE NO PRODUCT, PLEASE COMBACK LATER !</p>;
  }

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  const containerClass = `container ${classes.container}`;

  return (
    <section className="products">
      <div className={containerClass}>
        <div className="row" style={{ margin: "0 -15px" }}>
          <Swiper
            speed={600}
            className="mySwiper-3"
            navigation={true}
            loop={false}
            modules={[Pagination]}
            pagination={pagination}
            breakpoints={{
              // when window width is >= 1400px
              1400: {
                slidesPerView: 5,
              },
              // when window width is >= 992px
              992: {
                slidesPerView: 4,
              },
              // when window width is >= 1200px
              768: {
                slidesPerView: 3,
              },
              // when window width is >= 576px
              576: {
                slidesPerView: 2,
              },

              120: {
                slidesPerView: 2,
              },
            }}
          >
            {content}
          </Swiper>
          <div className={classes["button-group"]}>
            <GreenWhiteButtonLg to="/products">Read more</GreenWhiteButtonLg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
