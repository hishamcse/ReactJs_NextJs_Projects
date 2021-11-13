import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import {Fragment, useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import useFetch from "../../hooks/use-fetch";

const Cart = (props) => {

    const cartCtx = useContext(CartContext);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {ignored1, ignored2, sendRequest: addFood} = useFetch();

    const hasItems = cartCtx.items.length > 0;

    const removeItemHandler = id => {
        cartCtx.removeItem(id)
    }

    const addItemHandler = item => {
        cartCtx.addItem({
            ...item,
            amount: 1
        });
    }

    const showFormHandler = (e) => {
        e.preventDefault();
        setShowForm(true);
    }

    const hideFormHandler = () => {
        setShowForm(false);
    }

    const submitOrderHandler = async userData => {
        setIsSubmitting(true);
        await addFood({
            url: 'https://react-http-d4388-default-rtdb.firebaseio.com/orders.json',
            method: 'POST',
            body: {
                user: userData,
                cart: cartCtx.items
            },
            headers: {
                'Content-Type': 'application/json',
            }
        }, undefined);

        setIsSubmitting(false);
        setSubmitted(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => (
            <CartItem key={item.id} name={item.name} price={item.price}
                      amount={item.amount} onRemove={removeItemHandler.bind(null, item.id)}
                      onAdd={addItemHandler.bind(null, item)}/>
        ))}
    </ul>

    let cartContent = <Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>${cartCtx.totalAmount.toFixed(2)}</span>
        </div>

        {isSubmitting && !submitted && <p>Checking out the order...</p>}
        {!isSubmitting && submitted &&
        <div className={classes.actions}>
            <p>Successfully checked out</p>
            <button className={classes['button--alt']} onClick={props.onClick}>Close</button>
        </div>
        }

        {!isSubmitting && !submitted && showForm &&
        <Checkout onCancel={hideFormHandler} onConfirm={submitOrderHandler}/>}

        {!showForm &&
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClick}>Close</button>
            {hasItems &&
            <button className={classes.button} onClick={showFormHandler}>Order</button>}
        </div>
        }
    </Fragment>;

    return (
        <Modal onClick={props.onClick}>
            {cartContent}
        </Modal>
    );
}

export default Cart;