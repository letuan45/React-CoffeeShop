import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import useMediaQuery from "@mui/material/useMediaQuery";

import useHttp from "../../../hooks/use-http";

import classes from "./Products.module.css";
import leaves_pattern from "../../../assets/leaves_pattern.png";
import CateItem from "../../CateItem/CateItem";
import NormalButton from "../../UI/Button/NormalButton";
import ProductItem from "../../Product/ProductItem";
import CustomPagination from "./CustomPagination";
import Backdrop from "../../UI/Modal/Backdrop";
import { sortLowToHigh } from "../../../services/ProductSortAndFilter";
import { highLowToLow } from "../../../services/ProductSortAndFilter";
import { filterByPrice } from "../../../services/ProductSortAndFilter";

const valueFilter = (value) => {
  return value;
};

const Products = () => {
  //GET CATEGORIES
  const [categories, setCategories] = useState([]);
  const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);
  const cateURL =
    "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Categories.json";
  const { fetchHandler: fetchCategories } = useHttp();

  useEffect(() => {
    const innitData = (data) => {
      const categoriesArr = [];
      let item = {};
      for (const index in data) {
        item = {
          id: index,
          name: data[index].name,
          path: data[index].path,
        };
        if (data[index].subCategory) {
          let subCate = [];
          const dataSub = data[index].subCategory;
          for (const idx in dataSub) {
            subCate.push({
              id: idx,
              name: dataSub[idx].name,
              path: dataSub[idx].path,
            });
          }
          item["subCategory"] = subCate;
        }
        categoriesArr.push(item);
      }
      setCategories(categoriesArr);
    };
    fetchCategories({ url: cateURL }, innitData);
  }, [fetchCategories]);

  const categoriesContent = (
    <ul className={classes["product-categories"]}>
      {categories.map((item) => {
        if (item.subCategory) {
          const subCate = (
            <ul className={classes["sub-categories"]}>
              {item.subCategory.map((subItem) => (
                <CateItem
                  path={`${item.path}/${subItem.path}`}
                  key={subItem.id}
                >
                  {subItem.name}
                </CateItem>
              ))}
            </ul>
          );
          return (
            <CateItem path={item.path} sub={subCate} key={item.id}>
              {item.name}
            </CateItem>
          );
        }
        return (
          <CateItem path={item.path} key={item.id}>
            {item.name}
          </CateItem>
        );
      })}
    </ul>
  );

  const closeCateHandler = (event) => {
    event.preventDefault();
    setCategoriesIsOpen(false);
  };

  const openCategoryHandler = (event) => {
    event.preventDefault();
    setCategoriesIsOpen(true);
  };
  //END CATEGORIES

  //GET TAGS
  const [tags, setTags] = useState([]);
  const tagsURL =
    "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Tags.json";
  const { fetchHandler: fetchTags } = useHttp();

  useEffect(() => {
    const innitData = (data) => {
      const tags = [];
      for (const index in data) {
        tags.push({
          id: index,
          name: data[index].name,
        });
      }
      setTags(tags);
    };
    fetchTags({ url: tagsURL }, innitData);
  }, [fetchTags]);

  const tagContent = tags.map((item) => (
    <Link to="#" className={classes["tag-item"]} key={item.id}>
      {item.name}
    </Link>
  ));
  // END GET TAGS

  //FILTER
  const [filterValue, setFilterValue] = useState([0, 100]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setFilterValue(newValue);
  };

  const filterStyle = {
    width: "100%",
    color: "var(--white)",
    "& .MuiSlider-root": {
      color: "var(--white)",
    },
    "& .MuiSlider-rail": {
      backgroundColor: "#ccd5ae",
    },
    "& .responsiveMui": {
      "& .MuiSlider-root": {
        color: "black",
      },
      "& .MuiSlider-rail": {
        backgroundColor: "black",
      },
      "& .MuiSlider-thumb": {
        backgroundColor: "black",
      },
    },
  };

  //responsive filter
  const matches = useMediaQuery("(max-width:1200px)");
  //END FILTER

  //PRODUCTS
  //Products values
  const baseURL =
    "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Product.json";
  const [productItems, setProductItems] = useState([]); //old product
  const [primitiveItems, setPrimitiveItems] = useState([]);
  const [products, setProducts] = useState([]); //view's products
  const [countProducts, setCountProducts] = useState(null);

  const {
    isLoading: productIsLoading,
    erorr: productError,
    fetchHandler: fetchProducts,
  } = useHttp();

  useEffect(() => {
    const innitData = (data) => {
      const products = [];
      for (const index in data) {
        products.push({
          id: index,
          name: data[index].name,
          description: data[index].description,
          price: data[index].price,
          image: data[index].image,
          quantity: data[index].quantity,
        });
      }

      setPrimitiveItems([...products]);
      setProductItems([...products]);
    };
    fetchProducts({ url: baseURL }, innitData);
  }, [fetchProducts]);

  let content;

  const setProductsHandler = useCallback(
    (pageObj, from) => {
      setCountProducts({
        from: from + 1,
        to: pageObj.data.length + from,
        count: productItems.length,
      });
      setProducts([...pageObj.data]);
    },
    [productItems.length]
  );

  if (productIsLoading) {
    content = <p className={classes["no-product"]}>LOADING...</p>;
  } else if (!productError && productItems && productItems.length > 0) {
    content = products.map((item) => (
      <div
        key={item.id}
        className="col-xl-3 col-md-4 col-sm-6 col-6"
        style={{ padding: "0 15px" }}
      >
        <ProductItem item={item} className="custom-mar" />
      </div>
    ));
  } else if (productError) {
    content = <p>{productError}</p>;
  } else if (!productError && productItems.length === 0) {
    content = <p className={classes["no-product"]}>WE HAVE NO PRODUCTS! PLEASE TRY AGAIN LATER!</p>;
  }

  const sortHandler = (event) => {
    const value = event.target.value;

    if (value === "price") {
      setProductItems(sortLowToHigh(productItems));
    } else if (value === "price-desc") {
      setProductItems(highLowToLow(productItems));
    } else {
      setProductItems(primitiveItems);
    }
  };

  const filterPriceHandler = () => {
    setProductItems(
      filterByPrice(primitiveItems, filterValue[0], filterValue[1])
    );
  };

  // END PRODUCTS

  return (
    <section className="products">
      <div className={classes["main"]}>
        <div className={classes["spacer-1"]}></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-3">
              <div
                className={`${classes["aside-wrapper"]} ${
                  categoriesIsOpen ? classes["cate-open"] : ""
                }`}
              >
                {categoriesIsOpen && (
                  <Backdrop onClose={closeCateHandler} className="lower" />
                )}
                <div>
                  <button
                    className={classes["aside-open"]}
                    onClick={openCategoryHandler}
                  >
                    <i className="fa-solid fa-sliders"></i>
                  </button>
                </div>
                <div className={classes["close-wrapper"]}>
                  <button
                    className={classes["close-button"]}
                    onClick={closeCateHandler}
                  ></button>
                </div>
                <aside
                  className={classes.search}
                  style={{ backgroundImage: `url(${leaves_pattern})` }}
                >
                  <form>
                    <input
                      type="search"
                      placeholder="Search products"
                      className={classes["search-input"]}
                    ></input>
                    <button className={classes["search-btn"]}>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </form>
                </aside>
                <aside className={classes.categories}>
                  <div className={classes["categories-header"]}>
                    <i className="fa-solid fa-mug-saucer"></i>
                    <h3>PRODUCT CATEGORIES</h3>
                  </div>
                  {categoriesContent}
                </aside>
                <aside className={classes["price-filter"]}>
                  <div className={classes["categories-header"]}>
                    <i className="fa-solid fa-mug-saucer"></i>
                    <h3>FILTER BY PRICE</h3>
                  </div>
                  <div className={classes["filter-wrapper"]}>
                    <form>
                      <Box sx={filterStyle}>
                        <Slider
                          className={`${matches ? "responsiveMui" : ""}`}
                          getAriaLabel={() => "Price range"}
                          value={filterValue}
                          step={10}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          getAriaValueText={valueFilter}
                        />
                      </Box>
                      <div className={classes["filtered-value"]}>
                        Price:
                        <span>${filterValue[0]}</span>
                        <span> - </span>
                        <span>${filterValue[1]}</span>
                      </div>
                      <div className={classes["btn-group"]}>
                        <NormalButton onClick={filterPriceHandler}>
                          Filter
                        </NormalButton>
                      </div>
                    </form>
                  </div>
                </aside>
                <aside className={classes["product-tags"]}>
                  <div className={classes["categories-header"]}>
                    <i className="fa-solid fa-mug-saucer"></i>
                    <h3>PRODUCT TAGS</h3>
                  </div>
                  <div className={classes["tag-cloud"]}>{tagContent}</div>
                </aside>
              </div>
            </div>
            {/* PRODUCTS */}
            <div className="col-xl-9">
              <div className="row">
                <div className="col-xl-12">
                  <div className={classes["order"]}>
                    <p>
                      Showing {countProducts ? countProducts.from : 0}-
                      {countProducts ? countProducts.to : 0} of{" "}
                      {countProducts ? countProducts.count : 0} result
                    </p>
                    <form className={classes.ordering}>
                      <select
                        name="orderby"
                        className={classes["order-selection"]}
                        onChange={sortHandler}
                      >
                        <option value="menu_order" defaultValue="selected">
                          Default sorting
                        </option>
                        <option value="popularity">Sort by popularity</option>
                        <option value="rating">Sort by average rating</option>
                        <option value="date">Sort by latest</option>
                        <option value="price">
                          Sort by price: low to high
                        </option>
                        <option value="price-desc">
                          Sort by price: high to low
                        </option>
                      </select>
                    </form>
                  </div>
                </div>
                {content}
                <CustomPagination
                  products={productItems}
                  setData={setProductsHandler}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes["spacer-1"]}></div>
      </div>
    </section>
  );
};

export default Products;
