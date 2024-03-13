import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
    deliveryFee: {
        address: 'inside-dhaka',
        price: '60'
    }
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },

        addToCart: (state, action) => {
            let existing = state.cart.some((item) => item.id === action.payload.item.id);
            if (existing) {
                state.cart = state.cart.map((item) => {
                        if (item.id === action.payload.item.id) {
                            item.count += action.payload.item.count;
                        }
                        return item;
                    }
                )
            } else {
                state.cart = [...state.cart, action.payload.item];
            }
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
            state.deliveryFee = {...action.payload};
        }
    },
});

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
    changeDeliveryAddress
} = cartSlice.actions;

export default cartSlice.reducer;
