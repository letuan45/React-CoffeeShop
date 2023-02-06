import { createSlice } from "@reduxjs/toolkit";

const innitialCart = {
  items: [],
  loadingItem: null,
  isLoadingOneItem: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: innitialCart,
  reducers: {
    //Loading cart
    setIsLoadingOneItemOn(state, action) {
      state.isLoadingOneItem = true;
      state.loadingItem = action.payload;
    },

    setIsLoadingOneItemOff(state) {
      state.isLoadingOneItem = false;
    },

    setLoadingItemToNull(state) {
      state.loadingItem = null;
    },

    //Cart replacement
    replaceCart(state, action) {
      state.items = action.payload;
    },

    //Add to cart an item, if item already exists, plus 1 more quantity
    //action.payload is an object
    addToCart(state, action) {
      const cartItems = state.items;
      const cartItemFounded = cartItems
        .filter((item) => item.id === action.payload.id)
        .pop();
      if (cartItemFounded) {
        cartItemFounded.quantity += action.payload.quantity;
      } else {
        cartItems.unshift(action.payload);
      }

      //Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
    },

    removeEntireItem(state, action) {
      const cartItems = state.items;
      state.items = cartItems.filter((item) => item.id !== action.payload.id);

      //Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    setNewQuantity(state, action) {
      const cartItems = state.items;
      const cartItemFounded = cartItems
        .filter((item) => item.id === action.payload.id)
        .pop();
      if (cartItemFounded) {
        cartItemFounded.quantity = action.payload.quantity;
      }
      //Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
    },

    clearCart(state) {
      state.items = [];
    }
  },
});

export default cartSlice;
