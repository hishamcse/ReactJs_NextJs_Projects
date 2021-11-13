import classes from './HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon";
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartContext);
    const [isAnimated, setIsAnimated] = useState(false);

    const {items} = cartCtx;
    const numberOfCartItems = items.reduce((prevVal, curItem) => prevVal + curItem.amount, 0)
    const btnClasses = `${classes.button} ${isAnimated ? classes.bump : ''}`

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setIsAnimated(true);

        const timer = setTimeout(() => {
            setIsAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;