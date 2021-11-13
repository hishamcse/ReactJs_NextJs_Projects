import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (prevState, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount;

        let updatedItems;
        const existingId = prevState.items.findIndex(item => item.id === action.item.id);
        const existingItem = prevState.items[existingId]

        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            }
            updatedItems = [...prevState.items];
            updatedItems[existingId] = updatedItem;
        } else {
            updatedItems = prevState.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE') {
        const existingId = prevState.items.findIndex((item) => item.id === action.id);
        const existingItem = prevState.items[existingId];
        const updatedTotalAmount = prevState.totalAmount - existingItem.price;

        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = prevState.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...prevState.items];
            updatedItems[existingId] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    return defaultCartState;
}

const CartProvider = props => {

    const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCartState, undefined);

    const addToCart = item => {
        dispatchCartState({type: 'ADD', item: item})
    }

    const removeFromCart = id => {
        dispatchCartState({type: 'REMOVE', id: id})
    }

    const clearCart = () => {
        dispatchCartState({type: 'CLEAR'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addToCart,
        removeItem: removeFromCart,
        clearCart
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;