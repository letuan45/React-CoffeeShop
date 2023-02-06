import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cartActions } from "./store/index";

import Layout from "./components/Layouts/Layout";
import Footer from "./components/Footer/Footer";
import RouterToTop from "./components/Interactor/RouterToTop";
import Backdrop from "./components/UI/Modal/Backdrop";
import AddCartLoading from "./components/UI/Modal/AddCartLoading";
import CheckoutSuccessfull from "./pages/CheckoutSuccessfull";
import LoadingIcon from "./components/LoadingIcon/LoadingIcon";
import NotFound from "./pages/NotFound";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));

function App() {
  const dispatch = useDispatch();
  const [isShowLoad, setIsShowLoad] = useState(false);
  const [isLoadAnimation, setIsLoadAnimation] = useState(false);

  const itemIsLoading = useSelector(
    (state) => state.cartItems.isLoadingOneItem
  );

  // localStorage.removeItem("token");
  // localStorage.removeItem("expiredTime");
  // localStorage.removeItem("user");

  const loadingItem = useSelector((state) => state.cartItems.loadingItem);
  const cart = useSelector((state) => state.cartItems.items);

  //Loading cart item when click add cart
  useEffect(() => {
    if (itemIsLoading) {
      setIsShowLoad(true);
      setTimeout(() => {
        setIsLoadAnimation(true);
      }, 200);
    }

    //After turn off, add to cart
    const turnOffLoading = setTimeout(() => {
      dispatch(cartActions.setIsLoadingOneItemOff());
      if (loadingItem && itemIsLoading && isShowLoad) {
        dispatch(cartActions.addToCart(loadingItem));
      }
    }, 5000);

    return () => {
      clearTimeout(turnOffLoading);
    };
  }, [itemIsLoading, loadingItem, dispatch, isShowLoad, cart]);

  const closeLoadHandler = () => {
    //force close
    if (itemIsLoading) {
      setIsShowLoad(false);
      dispatch(cartActions.setIsLoadingOneItemOff());
      dispatch(cartActions.setLoadingItemToNull());
      return;
    }
    setTimeout(() => {
      setIsLoadAnimation(false);
    }, 100);

    setTimeout(() => {
      setIsShowLoad(false);
    }, 300);
  };

  //Load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));

    if (storedCart) {
      dispatch(cartActions.replaceCart(storedCart));
    } else {
      dispatch(cartActions.replaceCart([]));
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Layout>
        <RouterToTop>
          {isShowLoad && <Backdrop onClose={closeLoadHandler} />}
          {isShowLoad && (
            <AddCartLoading
              onClose={closeLoadHandler}
              className={`${isLoadAnimation ? "show" : ""}`}
              item={loadingItem}
              isLoading={itemIsLoading}
            />
          )}
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                }}
              >
                <LoadingIcon />
              </div>
            }
          >
            <Routes>
              <Route path="*" element={<NotFound />} />

              <Route path="/" element={<HomePage />} />
              <Route path="/about-us">
                <Route path="new-user"></Route>
              </Route>
              <Route path="/products" element={<ShopPage />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/checkout-success"
                element={<CheckoutSuccessfull />}
              />
            </Routes>
          </Suspense>
        </RouterToTop>
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default App;
