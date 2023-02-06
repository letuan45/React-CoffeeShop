import React from "react";

import classes from "./BlogItem.module.css";
import { Link } from "react-router-dom";

const getFormattedDate = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return day + "/" + month + "/" + year;
};

const BlogItem = (props) => {
    const itemClasses = `col-xl-3 col-md-6 col-xs-12 ${classes["item-col"]}`
  return (
    <div className={itemClasses}>
      <article id={props.item.id} className={classes["item-article"]}>
        <Link to={props.item.link} className={classes["item-image-link"]}>
          <img src={props.item.image} alt={props.item.title}></img>
          <span className={classes["item-type"]}>{props.item.type}</span>
        </Link>
        <div className={classes["item-wrapper"]}>
          <ul className={classes["list-social"]}>
            <li className={classes["item-social"]}>
              <i className="fa-solid fa-calendar-days"></i>
              <span>{getFormattedDate(props.item.date)}</span>
            </li>
            <li className={classes["item-social"]}>
              <i className="fa-solid fa-comment-dots"></i>
              <span>{props.item.numberOfComments}</span>
            </li>
            <li className={classes["item-social"]}>
              <i className="fa-solid fa-eye"></i>
              <span>{props.item.views}</span>
            </li>
          </ul>
          <Link to={props.item.link} className={classes["item-title"]}>
            {props.item.title}
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogItem;
