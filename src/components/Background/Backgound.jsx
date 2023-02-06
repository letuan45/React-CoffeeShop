import React from "react";
import classes from "./Background.module.css";
import { Link } from "react-router-dom";

import bg from "../../assets/shop-bg.jpg";
import bg2 from "../../assets/menu_parallax.jpg";

const Backgound = (props) => {
  const background = props.backgroundType === 1 ? bg : bg2;
  let breakcumbs = [
    {
      title: "Products",
      link: "/products",
    },
  ];

  if (props.cartBreakcumbs) {
    breakcumbs = [
      {
        title: "Cart",
        link: "/cart",
      },
    ];
  }

  if (props.checkOutBreakcumbs) {
    breakcumbs = [
      {
        title: "Checkout",
        link: "/checkout",
      },
    ];
  }

  if (props.breakcumbAddition) {
    breakcumbs.push(props.breakcumbAddition);
  }

  const breakcumbsContent = breakcumbs.map((item, index) => {
    if (index === breakcumbs.length - 1) {
      return (
        <li key={index}>
          <span className={classes["page-on"]}>{item.title}</span>
        </li>
      );
    } else {
      return (
        <React.Fragment key={index}>
          <li>
            <Link to={item.link}>{item.title}</Link>
          </li>
          <li>
            <span className={classes.flash}></span>
          </li>
        </React.Fragment>
      );
    }
  });

  return (
    <section className="background">
      <div
        className={classes.container}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className={classes["backdrop"]}></div>
        <div className={classes["inner-container"]}>
          <div className="container">
            <div className={classes["header-wrapper"]}>
              <h1 className={classes.header}>{props.title}</h1>
              <ul className={classes["breakcumbs"]}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <span className={classes.flash}></span>
                </li>
                {breakcumbsContent}
                {/* <li>
                  <span className={classes["page-on"]}>Products</span>
                </li> */}
              </ul>
              <span className={classes.tag}>Premium Coffee Market</span>
              <ul className={classes["tag-2"]}>
                <li>
                  <Link to="#">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fa-brands fa-youtube"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Backgound;
