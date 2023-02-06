import React from "react";
import MySlider from "../components/Slider/MySlider";
import Menu from "../components/sections/HomePage/Menu";
import CoffeeAddress from "../components/sections/HomePage/CoffeeAddress";
import FoodAdvertise from "../components/sections/HomePage/FoodAdvertise";
import Banner from "../components/sections/HomePage/Banner";
import Products from "../components/sections/HomePage/Products";
import CoffeeMachine from "../components/sections/HomePage/CoffeeMachine";
import Booking from "../components/sections/HomePage/Booking";
import Sponcor from "../components/sections/HomePage/Sponcor";
import Blog from "../components/sections/HomePage/Blog";

const HomePage = () => {
  return (
    <React.Fragment>
      <MySlider />
      <FoodAdvertise/>
      <Menu />
      <CoffeeAddress />
      <Banner/>
      <CoffeeMachine/>
      <Products />
      <Booking/>
      <Blog/>
      <Sponcor/>
    </React.Fragment>
  );
};

export default HomePage;
