import React from "react";
import { Link } from "react-router-dom";

import bg from "../../../assets/paper_bg.jpg";

import classes from "./Sponcors.module.css";

const sponcors = [
  {
    id: "01",
    image: "sp1.png",
    link: "#",
  },
  {
    id: "02",
    image: "sp2.png",
    link: "#",
  },
  {
    id: "03",
    image: "sp3.png",
    link: "#",
  },
  {
    id: "04",
    image: "sp4.png",
    link: "#",
  },
  {
    id: "05",
    image: "sp5.png",
    link: "#",
  },
  {
    id: "06",
    image: "sp6.png",
    link: "#",
  },
];

const wrapperClasses = `col-lg-2 col-md-4 col-sm-6 ${classes.item}`

const Sponcor = () => {
  const content = sponcors.map((item) => (
    <div className={wrapperClasses} key={item.id}>
      <Link to={item.link} className={classes.sponcor}>
        <img
          src={require(`../../../assets/sponcors/${item.image}`)}
          alt={item.id}
        ></img>
      </Link>
    </div>
  ));

  return (
    <section className="sponcor">
      <div style={{ backgroundImage: `url(${bg})` }}>
        <div style={{ backgroundColor: "rgba(21, 21, 21, 0.85)", padding: "20px 0" }}>
          <div className="container">
            <div className="row">{content}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponcor;
