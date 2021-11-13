import useInput from "../hooks/use-input";

const nameValidity = inp => inp.trim() !== '';
const emailValidity = inp => inp.includes('@');

const BasicForm = () => {

    const {
        value: firstNameInput,
        hasError: firstNameInValid,
        isValid: firstNameIsValid,
        changeHandler: firstNameChangeHandler,
        blurHandler: firstNameBlurHandler,
        reset: firstNameReset
    } = useInput(nameValidity);

    const {
        value: lastNameInput,
        hasError: lastNameInValid,
        isValid: lastNameIsValid,
        changeHandler: lastNameChangeHandler,
        blurHandler: lastNameBlurHandler,
        reset: lastNameReset
    } = useInput(nameValidity);

    const {
        value: emailInput,
        hasError: emailInValid,
        isValid: emailIsValid,
        changeHandler: emailChangeHandler,
        blurHandler: emailBlurHandler,
        reset: emailReset
    } = useInput(emailValidity);

    let formValid = false;

    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formValid = true;
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (!formValid) {
            return;
        }

        firstNameReset();
        lastNameReset();
        emailReset();
    }

    const firstNameClass = firstNameInValid ? 'form-control invalid' : 'form-control';
    const lastNameClass = lastNameInValid ? 'form-control invalid' : 'form-control';
    const emailClass = emailInValid ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={submitHandler}>
            <div className='control-group'>
                <div className={firstNameClass}>
                    <label htmlFor='name'>First Name</label>
                    <input type='text' id='name' value={firstNameInput} onChange={firstNameChangeHandler}
                           onBlur={firstNameBlurHandler}/>
                    {firstNameInValid && <p className='error-text'>Name must not be empty</p>}
                </div>

                <div className={lastNameClass}>
                    <label htmlFor='name'>Last Name</label>
                    <input type='text' id='name' value={lastNameInput} onChange={lastNameChangeHandler}
                           onBlur={lastNameBlurHandler}/>
                    {lastNameInValid && <p className='error-text'>Name must not be empty</p>}
                </div>

            </div>

            <div className={emailClass}>
                <label htmlFor='name'>E-Mail Address</label>
                <input type='text' id='name' value={emailInput} onChange={emailChangeHandler}
                       onBlur={emailBlurHandler}/>
                {emailInValid && <p className='error-text'>Please enter E-Mail correctly</p>}
            </div>

            <div className='form-actions'>
                <button disabled={!formValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;