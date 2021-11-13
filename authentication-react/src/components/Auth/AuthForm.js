import {useContext, useRef, useState} from 'react';

import classes from './AuthForm.module.css';
import {sendRequest} from "../../utils/Utilities";
import {AuthContext} from "../../store/auth-context";
import {useHistory} from "react-router-dom";

const AuthForm = () => {

    const history = useHistory();

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        const dataObj = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
        }

        setIsLoading(true);

        if (!isLogin) {
            sendRequest('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwmAdR0NTZRkAGsviWWu4pIq9zAHgUgVo', dataObj)
                .then(data => {
                    console.log(data)
                }).catch(e => {
                alert(e)
            }).finally(_ => {
                setIsLoading(false);
            });
        } else {
            sendRequest('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwmAdR0NTZRkAGsviWWu4pIq9zAHgUgVo', dataObj)
                .then(data => {
                    const time = new Date(new Date().getTime() + (+data.expiresIn * 1000));
                    authCtx.login(data.idToken, time.toISOString());
                    history.replace('/');
                }).catch(e => {
                alert(e);
            }).finally(_ => {
                setIsLoading(false);
            });
        }
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' ref={emailRef} required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' ref={passwordRef} required/>
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>Loading...</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;