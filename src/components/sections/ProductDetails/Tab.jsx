import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Tab.module.css";

const Tab = (props) => {
  const [currentTab, setCurrentTab] = useState(0);

  const changeTabHandler = (event) => {
    event.preventDefault();

    setCurrentTab(+event.target.id);
  };

  return (
    <div>
      <ul className={classes.wrapper}>
        {props.tabItems.map((tabItem) => (
          <li className={classes["tab-item"]} key={tabItem.id}>
            <Link
              to={`tabs/${tabItem.title}`}
              id={tabItem.id}
              onClick={changeTabHandler}
              className={`${currentTab === tabItem.id ? classes.active : ""}`}
            >
              {tabItem.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className={classes.content}>
        {props.tabItems.map((tabItem, index) => {
          if (currentTab === tabItem.id) {
            return <div key={tabItem.id}>{tabItem.description}</div>;
          }
          return "";
        })}
      </div>
    </div>
  );
};

export default Tab;
