import React from "react";

import classes from "./CoffeeMachine.module.css";
import BlackWhiteButtonLg from "../../UI/Button/BlackWhiteButtonLg";
import leavesPattern from "../../../assets/leaves_pattern.png";
import blackMachine from "../../../assets/black-machine.png";
import blackLabel from "../../../assets/black-label.png";

const CoffeeMachine = () => {
  const containerClasses = `container ${classes["container-res"]}`

  return (
    <section className="coffee-machine">
      <div className={containerClasses}>
        <div
          className={classes.container}
          style={{ backgroundImage: `url(${leavesPattern})` }}
        >
          <div className="row" style={{width: "100%", margin: "0", justifyContent: "center"}}>
            <div
              className="col-xl-6 col-lg-12 row justify-content-center align-items-center"
              style={{ height: "100%", padding: "0" }}
            >
              <div className={classes["section-title"]}>
                <div className={classes["main-title"]}>
                  <h2>
                    <span>Coffee</span>
                    <br />
                    <span>Machines</span>
                  </h2>
                </div>
              </div>
              <div className={classes["title-desc"]}>
                <p>
                  When your coffee craving beckons, it takes a lot to say no.
                  Heading to the cafe every single time isn't always possible,
                  though. Here at Online, we offer a wide range of coffee
                  machines, catering to everyone from the instant coffee convert
                  to the hardcore brew enthusiast.
                </p>
              </div>
              <div className={classes["button-group"]}>
                <BlackWhiteButtonLg to="/about-us">
                  Read more
                </BlackWhiteButtonLg>
              </div>
            </div>
            <div className={classes["spacer-1"]}></div>
            <div className="col-xl-6 col-lg-12 p-0">
              <div className={classes["image-element"]}>
                <img src={blackMachine} alt="coffee machine"/>
                <div
                  className={classes["discount"]}
                  style={{ backgroundImage: `url(${blackLabel})` }}
                >
                  <h3> -50% </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeMachine;
