import classes from './ProfileForm.module.css';
import {useContext, useRef, useState} from "react";
import {sendRequest} from "../../utils/Utilities";
import {AuthContext} from "../../store/auth-context";
import {useHistory} from "react-router-dom";

const ProfileForm = () => {

    const history = useHistory();

    const newPasswordRef = useRef();
    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();

        const newPassword = newPasswordRef.current.value;

        const dataObj = {
            idToken: authCtx.token,
            password: newPassword,
            returnSecureToken: false
        }

        setIsLoading(true);

        sendRequest('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCwmAdR0NTZRkAGsviWWu4pIq9zAHgUgVo', dataObj)
            .then(_ => {
                history.replace('/');
            }).catch(e => {
            alert(e);
        }).finally(_ => {
            setIsLoading(false);
        })
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' minLength='7' ref={newPasswordRef}/>
            </div>
            <div className={classes.action}>
                {!isLoading && <button>Change Password</button>}
                {isLoading && <p>Loading...</p>}
            </div>
        </form>
    );
}

export default ProfileForm;