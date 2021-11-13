import classes from './Checkout.module.css';
import useInput from "../../hooks/use-input";

const validity = inp => inp.trim() !== '';
const postalValidity = inp => inp.trim().length === 4;

const Checkout = (props) => {

    const {
        value: nameInput,
        hasError: nameInValid,
        isValid: nameValid,
        changeHandler: nameChangeHandler,
        blurHandler: nameBlurHandler,
        reset: nameReset
    } = useInput(validity);

    const {
        value: streetInput,
        hasError: streetInValid,
        isValid: streetValid,
        changeHandler: streetChangeHandler,
        blurHandler: streetBlurHandler,
        reset: streetReset
    } = useInput(validity);

    const {
        value: postalInput,
        hasError: postalInValid,
        isValid: postalValid,
        changeHandler: postalChangeHandler,
        blurHandler: postalBlurHandler,
        reset: postalReset
    } = useInput(postalValidity);

    const {
        value: cityInput,
        hasError: cityInValid,
        isValid: cityValid,
        changeHandler: cityChangeHandler,
        blurHandler: cityBlurHandler,
        reset: cityReset
    } = useInput(validity);

    let formValid = false;

    if (nameValid && streetValid && postalValid && cityValid) {
        formValid = true;
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        if (!formValid) {
            return;
        }

        props.onConfirm({
            name: nameInput,
            street: streetInput,
            postalCode: postalInput,
            city: cityInput
        })

        nameReset();
        streetReset();
        postalReset();
        cityReset();
    };

    const nameClass = nameInValid ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const streetClass = streetInValid ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const postalClass = postalInValid ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    const cityClass = cityInValid ? `${classes.control} ${classes.invalid}` : `${classes.control}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameClass}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' value={nameInput} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
            </div>
            {nameInValid && <p className='error-text'>Name must not be empty</p>}

            <div className={streetClass}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' value={streetInput} onChange={streetChangeHandler}
                       onBlur={streetBlurHandler}/>
            </div>
            {streetInValid && <p className='error-text'>Street must not be empty</p>}

            <div className={postalClass}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' value={postalInput} onChange={postalChangeHandler}
                       onBlur={postalBlurHandler}/>
            </div>
            {postalInValid && <p className='error-text'>Please correctly enter postal code(4 digit)</p>}

            <div className={cityClass}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' value={cityInput} onChange={cityChangeHandler} onBlur={cityBlurHandler}/>
            </div>
            {cityInValid && <p className='error-text'>City must not be empty</p>}

            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit} disabled={!formValid}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;