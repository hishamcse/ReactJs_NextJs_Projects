import classes from './newsletter-registration.module.css';
import {useContext, useRef} from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {

    const emailInputRef = useRef();
    const notificationCtx = useContext(NotificationContext);

    function registrationHandler(event) {
        event.preventDefault();

        // fetch user input (state or refs)
        // optional: validate input
        // send valid data to API

        const email = emailInputRef.current.value;

        notificationCtx.showNotification({
            title: 'Signing up...',
            message: 'Registering newsletter',
            status: 'pending'
        })

        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email: email}),
            headers: {'Content-Type': 'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json()
            }

            return res.json().then(data => {
                throw new Error(data.message || 'Something went wrong')
            })
        })
            .then(data => {
                notificationCtx.showNotification({
                    title: 'Signed up',
                    message: 'Successfully registered',
                    status: 'success'
                })
            }).catch(err => {
            notificationCtx.showNotification({
                title: 'Failed',
                message: err.message || 'Something went wrong',
                status: 'error'
            })
        })
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        ref={emailInputRef}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
