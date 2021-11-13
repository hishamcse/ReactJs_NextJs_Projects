import {createSlice} from "@reduxjs/toolkit";

const initCartState = {items: [], totalItems: 0, changed: false};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initCartState,
    reducers: {
        replaceCart(state, action) {
            state.totalItems = action.payload.totalItems;
            state.items = action.payload.items;
        },
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: +1,
                    totalPrice: newItem.price
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price
            }
            state.totalItems++;
            state.changed = true;
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
            state.totalItems--;
            state.changed = true;
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;