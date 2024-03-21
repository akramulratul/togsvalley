import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// Load cart from local storage if available
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) return undefined;
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Failed to load cart from local storage:", e);
    return undefined;
  }
};

// const savedCartState = loadCartFromLocalStorage();

const initialState = {
  isCartOpen: false,
  cart: JSON.parse(localStorage.getItem("cart")) || [], // Load cart from local storage or default to an empty array
  items: [],
  deliveryFee: {
    address: "inside-dhaka",
    price: "60",
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.cart = []; // Resets the cart array to an empty array
      localStorage.removeItem("cart");
    },

    addToCart: (state, action) => {
      let existing = state.cart.some(
        (item) => item.id === action.payload.item.id
      );
      if (existing) {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.item.id) {
            item.count += action.payload.item.count;
          }
          return item;
        });
      } else {
        state.cart = [...state.cart, action.payload.item];
      }
      // Save updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    changeDeliveryAddress: (state, action) => {
      state.deliveryFee = { ...action.payload };
    },
  },
  // Use the prepare callback to handle logic outside of the reducer
  prepare: (item) => {
    const newItem = { ...item, id: item.id ?? Date.now() }; // Ensure item has an ID
    return { payload: { item: newItem } };
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  changeDeliveryAddress,
  clearCart,
} = cartSlice.actions;

// Save to local storage function
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.warn("Failed to save cart to local storage:", e);
  }
};

// Export a custom hook to use in your components
export const useCartSlice = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  // Run this effect on cart state change
  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  return { cart, dispatch };
};

export default cartSlice.reducer;
