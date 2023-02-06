import { createSlice } from "@reduxjs/toolkit";

const innitialModal = {
  authIsOpen: false,
  cartIsOpen: false,
  mobileMenuIsOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: innitialModal,
  reducers: {
    resetAllModal(state) {
      state.authIsOpen = false;
      state.cartIsOpen = false;
      state.mobileMenuIsOpen = false;
    },

    openAuth(state) {
      state.authIsOpen = true;
    },

    closeAuth(state) {
      state.authIsOpen = false;
    },

    openCart(state) {
      state.cartIsOpen = true;
    },

    closeCart(state) {
      state.cartIsOpen = false;
    },

    openMenu(state) {
      state.mobileMenuIsOpen = true;
    },

    closeMenu(state) {
      state.mobileMenuIsOpen = false;
    },
  },
});

export default modalSlice;
