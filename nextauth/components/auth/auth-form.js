import {useRef, useState} from 'react';
import classes from './auth-form.module.css';
import {getProviders, signIn} from "next-auth/client";
import {useRouter} from "next/router";

const createUser = async (email, password) => {

    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'}
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
}

function AuthForm() {

    const [isLogin, setIsLogin] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();

    const router = useRouter();

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    const submitAuthFormCredentials = async (e) => {
        e.preventDefault();

        if (!isLogin) {
            try {
                const result = await createUser(emailRef.current.value, passwordRef.current.value);
                console.log(result);
            } catch (err) {
                console.log(err)
            }
        } else {
            const result = await signIn('credentials', {
                redirect: false,
                email: emailRef.current.value,
                password: passwordRef.current.value
            });

            console.log(result);

            if (!result.error) {
                console.log('logged in successfully');
                await router.replace('/profile');
            }
        }
    }

    const submitAuthFormGoogle = async (e) => {
        e.preventDefault();

        const result = await signIn('google', {
            redirect: false
        });

        console.log(result);

        // if (!result.error) {
        //     console.log('logged in successfully');
        //     await router.replace('/profile');
        // }
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' ref={emailRef} required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' ref={passwordRef} required/>
                </div>
                <div className={classes.actions}>
                    <button onClick={submitAuthFormCredentials}>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>

                <div className={classes.actions}>
                    {isLogin && <button onClick={submitAuthFormGoogle}>Login with google</button>}
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
