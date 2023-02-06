import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import modalSlice from "./modal-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    cartItems: cartSlice.reducer,
    modalControls: modalSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;

export const modalActions = modalSlice.actions;
export const cartActions = cartSlice.actions;
export const authActions = authSlice.actions;
