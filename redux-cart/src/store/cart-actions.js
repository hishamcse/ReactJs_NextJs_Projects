import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const fetchCartData = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://react-http-d4388-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error(`couldn't fetch data`);
            }

            const cartData = await response.json();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalItems: cartData.totalItems
            }));
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: `Fetching the cart data failed!!`
            }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        try {
            dispatch(uiActions.showNotification({
                status: 'Loading',
                title: 'Loading...',
                message: 'Sending the cart data!'
            }));

            const response = await fetch('https://react-http-d4388-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalItems: cart.totalItems
                })
            });

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            console.log(data)

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!!',
                message: 'Sent the cart data successfully!!'
            }))
        } catch (e) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: `Sending the cart data failed! ${e.message}`
            }))
        }
    };
}