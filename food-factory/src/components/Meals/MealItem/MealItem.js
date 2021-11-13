import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {

    const cartCtx = useContext(CartContext);

    const addItemHandler = (enteredAmount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: enteredAmount
        });
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>${props.price.toFixed(2)}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addItemHandler} />
            </div>
        </li>
    )
}

export default MealItem;