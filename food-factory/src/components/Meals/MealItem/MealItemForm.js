import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";
import {useRef, useState} from "react";

const MealItemForm = (props) => {

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const input = {
        id: 'amount_' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
    }

    const addItemHandler = (e) => {
        e.preventDefault();

        const enteredAmount = +amountInputRef.current.value;

        if(enteredAmount === undefined || enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    }

    return (
        <form className={classes.form} onSubmit={addItemHandler}>
            <Input ref={amountInputRef} label='Amount' input={input}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    )
}

export default MealItemForm;