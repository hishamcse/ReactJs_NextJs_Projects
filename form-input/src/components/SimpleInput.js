import useInput from "../hooks/use-input";

const SimpleInput = () => {

    const {
        value: nameInput,
        hasError: inputNameInValid,
        isValid: nameIsValid,
        changeHandler: nameChangeHandler,
        blurHandler: nameBlurHandler,
        reset: nameReset
    } = useInput(inp => inp.trim() !== '');

    const {
        value: emailInput,
        hasError: emailInValid,
        isValid: emailIsValid,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler,
        reset: emailReset
    } = useInput(inp => inp.includes('@'));

    // whole form validity & accordingly update button disabled state
    let formIsValid = false;

    if (nameIsValid && emailIsValid) {
        formIsValid = true;
    }

    // when form is submitted
    const submitHandler = (e) => {
        e.preventDefault();

        if (!nameIsValid) {
            return;
        }

        nameReset();
        emailReset();
    }

    const nameClass = !inputNameInValid ? 'form-control' : 'form-control invalid';
    const emailClass = !emailInValid ? 'form-control' : 'form-control invalid';

    return (
        <form onSubmit={submitHandler}>
            <div className={nameClass}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' onChange={nameChangeHandler} onBlur={nameBlurHandler} value={nameInput}/>
            </div>
            {inputNameInValid && <p className='error-text'>Name must not be empty</p>}

            <div className={emailClass}>
                <label htmlFor='email'>Your E-Mail</label>
                <input type='text' id='email' onChange={emailChangeHandler} onBlur={emailBlurHandler}
                       value={emailInput}/>
            </div>
            {emailInValid && <p className='error-text'>Email must not be empty</p>}
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;