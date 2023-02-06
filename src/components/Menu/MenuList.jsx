import React from "react";
import MenuItem from "./MenuItem";
import classes from "./MenuList.module.css";

const MenuList = (props) => {
  let content = (
    <p className={classes["no-item"]}>
      We still have no item for this type of dish...
    </p>
  );

  if (props.menuList && props.menuList.length) {
    content = props.menuList.map((item) => <MenuItem key={item.id} item={item} />);
  }

  return <ul className={classes["item-list"]}>{content}</ul>;
};

export default MenuList;
