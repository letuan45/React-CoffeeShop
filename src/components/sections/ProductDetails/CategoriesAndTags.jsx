import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Details.module.css";
import {callAsync} from "../../../services/CallAsync";

const CategoriesAndTags = (props) => {
  const [categoriesItems, setCategoriesItems] = useState([]);
  const { categories } = props.item;
  const [tagsItems, setTagsItems] = useState([]);
  const { tags } = props.item;
  //Get Categories
  useEffect(() => {
    if (!categories || categories.length === 0) {
      return;
    }

    const categoriesItems = [...categories.split(",")];
    let urls = [];
    for (const category of categoriesItems) {
      urls.push(
        `https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Categories/${category}.json`
      );
    }

    callAsync(urls).then((data) => {
      setCategoriesItems(data);
    });
  }, [categories]);

  let categoriesContent = <span>No categories</span>;

  if (categoriesItems.length > 0) {
    categoriesContent = (
      <span>
        Categories:
        {categoriesItems.map((category, index) => {
          if (index === 0) {
            return (
              <Link to={`/product-category/${category.path}`} key={index}>
                &nbsp;{category.name}
              </Link>
            );
          }
          return (
            <Link to={`/product-category/${category.path}`} key={index}>
              <span>,</span> {category.name}
            </Link>
          );
        })}
      </span>
    );
  }

  //Get Tags
  useEffect(() => {
    if (!tags || tags.length === 0) {
      return;
    }

    const tagsItems = [...tags.split(",")];
    let urls = [];
    for (const tag of tagsItems) {
      urls.push(
        `https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Tags/${tag}.json`
      );
    }

    callAsync(urls).then((data) => {
      setTagsItems(data);
    });
  }, [tags]);

  let tagsContent = <span>No tags</span>;

  if (tagsItems.length > 0) {
    tagsContent = (
      <span>
        Tags:
        {tagsItems.map((tag, index) => {
          if (index === 0) {
            return (
              <Link to="#" key={index}>
                &nbsp;{tag.name}
              </Link>
            );
          }
          return (
            <Link to="#" key={index}>
              <span>,</span> {tag.name}
            </Link>
          );
        })}
      </span>
    );
  }

  return <div className={classes["product-meta"]}>
    {categoriesContent}
    {tagsContent}
  </div>;
};

export default CategoriesAndTags;
