import React from "react";
import classes from "./NotFound.module.css";
import logo from "../assets/glass.png";

const NotFound = () => {
  return (
    <section className={classes.wrapper}>
      <div className="container">
        <div className={classes.head}>
          <div className={classes.number}>4</div>
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={classes.number}>4</div>
        </div>
        <div className={classes.content}>
          <h1>Sorry! I haven't coded this page yet!<br/> Please comback later</h1>
          <i>From Le Tuan with love.</i>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
