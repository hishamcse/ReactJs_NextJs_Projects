import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";

const CartButton = () => {

    const dispatch = useDispatch();
    const numOfItems = useSelector(state => state.cart.totalItems);

    const cartShowHandler = (e) => {
        e.preventDefault();

        dispatch(uiActions.toggle());
    }

    return (
        <button className={classes.button} onClick={cartShowHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{numOfItems}</span>
        </button>
    );
};

export default CartButton;