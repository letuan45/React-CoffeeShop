import React from "react";
import Backgound from "../components/Background/Backgound";
import Products from "../components/sections/ShopPage/Products";

const ShopPage = () => {
  return <React.Fragment>
    <Backgound title="All Products" backgroundType={1}/>
    <Products/>
  </React.Fragment>;
};

export default ShopPage;
