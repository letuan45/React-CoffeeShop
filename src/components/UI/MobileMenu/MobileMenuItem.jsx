import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MobileMenuItem.module.css";

const MobileMenuItem = (props) => {
  const [isActive, setIsActive] = useState(false);

  const onExpanse = (event) => {
    event.preventDefault();

    setIsActive((prevState) => !prevState);
  };

  const subMenu = props.item.subMenu;

  if (subMenu) {
    return (
      <li
        className={`${classes["item-expanse"]} ${
          isActive ? classes["active"] : ""
        }`}
      >
        <div className={classes["item-header"]} onClick={onExpanse}>
          <div>{props.item.title}</div>
          <span className={classes["expanse"]}>
            <i className="fa-solid fa-angle-left"></i>
          </span>
        </div>
        {isActive && (
          <ul>
            {subMenu.map((subMenuItem, index) => (
              <li key={index} className={classes['submenu-item']}>
                <NavLink
                  to={subMenuItem.to}
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                >
                  - {subMenuItem.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  } else {
    return (
      <li className={classes.item}>
        <NavLink
          to={props.item.to}
          className={(navData) => (navData.isActive ? classes.active : "")}
        >
          {props.item.title}
        </NavLink>
      </li>
    );
  }
};

export default MobileMenuItem;
