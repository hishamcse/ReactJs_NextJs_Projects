import classes from './profile-form.module.css';
import {useEffect, useRef, useState} from "react";
import {getSession} from "next-auth/client";
import Image from "next/image";

const updatePassword = async (oldPassword, newPassword) => {
    try {
        const response = await fetch('/api/user/change-password', {
            method: 'PATCH',
            body: JSON.stringify({oldPassword, newPassword}),
            headers: {'Content-Type': 'application/json'}
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (err) {
        return err.message;
    }
}

function ProfileForm() {

    const [loggedUser, setLoggedUser] = useState({});
    const [imgSrc, setImageSrc] = useState('');
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();

    useEffect(() => {
        getSession().then(session => {
            setLoggedUser(session.user);
            setImageSrc(session.user.image.split('=')[0])
        });
    }, [])

    const changePasswordHandler = async (e) => {
        e.preventDefault();

        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;

        if (!oldPassword || oldPassword.trim().length < 7 || !newPassword || newPassword.trim().length < 7) {
            console.log('inputs not valid');
            return;
        }

        const result = await updatePassword(oldPassword, newPassword);

        console.log(result);
    }

    return (
        <form className={classes.form} onSubmit={changePasswordHandler}>
            {imgSrc !== '' && imgSrc !== undefined && <div className={classes.control}>
                <Image loader={() => imgSrc} src={imgSrc} alt={loggedUser.name} width={200} height={200}
                       referrerPolicy="no-referrer" quality={100} className={classes.image}/>
            </div>
            }
            <div className={classes.control}>
                <label htmlFor='your-name'>Name</label>
                <input type='text' id='your-name' defaultValue={loggedUser.name} disabled/>
            </div>
            <div className={classes.control}>
                <label htmlFor='your-email'>Email</label>
                <input type='email' id='your-email' defaultValue={loggedUser.email} disabled/>
            </div>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' ref={newPasswordRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='old-password'>Old Password</label>
                <input type='password' id='old-password' ref={oldPasswordRef}/>
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
