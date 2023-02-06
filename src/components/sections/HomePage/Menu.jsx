import React, { useState, useCallback, useEffect } from "react";

import menuImage from "../../../assets/menu_parallax.jpg";
import menuBackground from "../../../assets/menu-bg.png";
import classes from "./Menu.module.css";
import SimpleButton from "../../UI/Button/SimpleButton";
import MenuList from "../../Menu/MenuList";
import GreenBlackButtonLg from "../../UI/Button/GreenBlackButtonLg";
import useHttp from "../../../hooks/use-http";

const filterByType = (menuList, typeName) => {
  return menuList.filter((item) => item.type === typeName);
};

const Menu = () => {
  const baseURL =
    "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/Menu.json";
  const [isInChocolate, setInChocolate] = useState(false);
  const [isInCoffee, setInCoffee] = useState(false);
  const [isInSweet, setInSweet] = useState(false);
  const [isInTea, setInTea] = useState(false);
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const {
    isLoading: menuIsLoading,
    error: menuError,
    fetchHandler: getMenu,
  } = useHttp();

  useEffect(() => {
    getMenu({ url: baseURL }, (data) => {
      let menuList = [];
      for (const index in data) {
        menuList.push({
          id: index,
          image: data[index].image,
          description: data[index].description,
          name: data[index].name,
          type: data[index].type,
          price: data[index].price,
          ingredient: data[index].ingredient,
        });
      }
      setMenu(menuList);
    });
  }, [getMenu]);

  let content;

  if (menuIsLoading) {
    content = <p>Loading...</p>;
  } else if (menuError) {
    content = <p>Error</p>;
  } else if (menu) {
    content = <MenuList menuList={filteredMenu} />;
  }
  
  const resetFilter = () => {
    setInChocolate(false);
    setInCoffee(false);
    setInSweet(false);
    setInTea(false);
  };

  const filterByChocolate = useCallback(() => {
    resetFilter();
    setInChocolate(true);

    setFilteredMenu(filterByType(menu, "chocolate")); 
  }, [menu]);

  const filterByCoffee = useCallback(() => {
    resetFilter();
    setInCoffee(true);

    setFilteredMenu(filterByType(menu, "coffee"));
  }, [menu]);

  const filterByBakery = useCallback(() => {
    resetFilter();
    setInSweet(true);

    setFilteredMenu(filterByType(menu, "bakery"));
  }, [menu]);

  const filterByTea = useCallback(() => {
    resetFilter();
    setInTea(true);

    setFilteredMenu(filterByType(menu, "tea"));
  }, [menu]);

  useEffect(() => {
    filterByChocolate();
  }, [filterByChocolate]);

  return (
    <section className="menu">
      <div
        style={{
          backgroundImage: `url(${menuImage})`,
        }}
        className={classes["menu-wrapper"]}
      >
        <div className="container">
          <div className="row">
            <div className={classes["section-title"]}>
              <h6>Kaffa Menu</h6>
              <h1>Tasty Products</h1>
            </div>
            <div className={classes["menu-container"]}>
              <div
                className={classes["menu-bg"]}
                style={{
                  backgroundImage: `url(${menuBackground})`,
                }}
              >
                <ul className={classes["menu-filters"]}>
                  <li className={classes["menu-filter-item"]}>
                    <SimpleButton
                      isActive={isInChocolate ? true : false}
                      onClick={filterByChocolate}
                    >
                      Chocolate
                    </SimpleButton>
                  </li>
                  <li className={classes["menu-filter-item"]}>
                    <SimpleButton
                      isActive={isInCoffee ? true : false}
                      onClick={filterByCoffee}
                    >
                      Coffee
                    </SimpleButton>
                  </li>
                  <li className={classes["menu-filter-item"]}>
                    <SimpleButton
                      isActive={isInSweet ? true : false}
                      onClick={filterByBakery}
                    >
                      Bakery
                    </SimpleButton>
                  </li>
                  <li className={classes["menu-filter-item"]}>
                    <SimpleButton
                      isActive={isInTea ? true : false}
                      onClick={filterByTea}
                    >
                      Tea
                    </SimpleButton>
                  </li>
                </ul>
                {content}
                <div className={classes["menu-list-btn"]}>
                  <GreenBlackButtonLg to="/products">
                    Read more
                  </GreenBlackButtonLg>
                </div>
                <div className={classes["menu-list-spacer"]}></div>
              </div>
            </div>
            <div className={classes["spacer"]}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
