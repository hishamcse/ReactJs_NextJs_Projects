import classes from './CartItem.module.css';
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart-slice";

const CartItem = (props) => {
    const {id, title, quantity, totalPrice, price} = props.item;

    const dispatch = useDispatch();

    const increaseItem = (e) => {
        e.preventDefault();

        dispatch(cartActions.addItem({
            id, title, quantity, totalPrice, price
        }));
    }

    const decreaseItem = (e) => {
        e.preventDefault();

        dispatch(cartActions.removeItem(id));
    }

    return (
        <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${totalPrice.toFixed(2)}{' '}
                    <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={decreaseItem}>-</button>
                    <button onClick={increaseItem}>+</button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;