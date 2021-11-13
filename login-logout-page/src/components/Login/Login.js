import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

// action is what we declare inside dispatch function
// reducer function returns new state
const emailReducer = (prevState, action) => {
    if (action.type === 'USER_INPUT') {
        return {
            value: action.val,
            isValid: action.val.includes('@')
        }
    }
    if (action.type === 'INPUT_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.includes('@')
        }
    }

    return {
        value: '',
        isValid: false
    }
}

const passwordReducer = (prevState, action) => {
    if (action.type === 'USER_PASSWORD') {
        return {
            value: action.val,
            isValid: action.val.trim().length > 6
        }
    }
    if (action.type === 'PASSWORD_BLUR') {
        return {
            value: prevState.value,
            isValid: prevState.value.trim().length > 6
        }
    }

    return {
        value: '',
        isValid: false
    }
}

const Login = () => {

    const authCtx = useContext(AuthContext);

    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: undefined
    }, undefined);

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: undefined
    }, undefined);

    // will call this function whenever enteredEmail and/or enteredPassword changed
    // what to add as dependencies -> see udemy lecture no 113
    // but in every keystroke, the effect function execution is unnecessary and inefficient
    // so, we will use cleanUp function to stop this function calling again and again
    // very effective for http request
    // effect function will be called at the very first time and after that before effect function, cleanup will be called
    useEffect(() => {
        const timer = setTimeout(() => {
            // console.log('effect function');
            setFormIsValid(emailState.isValid && passwordState.isValid);
        }, 500);

        // cleanUp function
        return () => {
            // console.log('cleanUp function')
            clearTimeout(timer);
        }
    }, [emailState.isValid, passwordState.isValid])

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const emailChangeHandler = (event) => {
        // setEnteredEmail(event.target.value)

        dispatchEmail({type: 'USER_INPUT', val: event.target.value})

        // setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
    };

    const passwordChangeHandler = (event) => {
        // setEnteredPassword(event.target.value);

        dispatchPassword({type: 'USER_PASSWORD', val: event.target.value})

        // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    };

    // use case of useReducer hook. this state update depends on another state. which is inefficient and error prone.
    // so, in this kind of cases where more than one state related, we will use useReducer
    const validateEmailHandler = () => {
        // setEmailIsValid(enteredEmail.includes('@'));

        dispatchEmail({type: 'INPUT_BLUR'})
    };

    const validatePasswordHandler = () => {
        // setPasswordIsValid(enteredPassword.trim().length > 6);

        dispatchPassword({type: 'PASSWORD_BLUR'})
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if(formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if(!emailState.isValid) {
            emailInputRef.current.focus()
        } else {
            passwordInputRef.current.focus()
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>

                <Input ref={emailInputRef} title="E-Mail" type="email" id="email" value={emailState.value} isValid={emailState.isValid}
                       onChange={emailChangeHandler} onBlur={validateEmailHandler}/>

                <Input ref={passwordInputRef} title="Password" type="password" id="password" value={passwordState.value} isValid={passwordState.isValid}
                       onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>

                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>

            </form>
        </Card>
    );
};

export default Login;