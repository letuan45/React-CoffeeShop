import React from 'react';
import Backgound from "../components/Background/Backgound";
import BigCart from '../components/sections/CartPage/BigCart';

const Cart = () => {
    return <React.Fragment>
    <Backgound title="Cart" backgroundType={2} cartBreakcumbs={true}/>
    <BigCart/>
  </React.Fragment>;
}

export default Cart