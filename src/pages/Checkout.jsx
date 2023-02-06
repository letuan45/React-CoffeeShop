import React from "react";
import Backgound from "../components/Background/Backgound";
import CheckoutForm from "../components/sections/Checkout/CheckoutForm";

const Checkout = () => {
  return (
    <React.Fragment>
      <Backgound
        title="Checkout"
        backgroundType={2}
        checkOutBreakcumbs={true}
      />
      <CheckoutForm/>
    </React.Fragment>
  );
};

export default Checkout;
