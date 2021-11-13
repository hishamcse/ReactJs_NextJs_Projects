import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        showCart: uiSlice.reducer
    }
});

export default store;