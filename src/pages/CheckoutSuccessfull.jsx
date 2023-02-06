import React from "react";
import Backgound from "../components/Background/Backgound";
import CheckoutSuccess from "../components/sections/Checkout/CheckoutSuccess";

const CheckoutSuccessfull = () => {
  return (
    <React.Fragment>
      <Backgound
        title="Checkout successfull"
        backgroundType={2}
        checkOutBreakcumbs={true}
      />
      <CheckoutSuccess/>
    </React.Fragment>
  );
};

export default CheckoutSuccessfull;
