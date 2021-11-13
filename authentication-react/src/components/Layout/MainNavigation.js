import {Link} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import {Fragment, useContext} from "react";
import {AuthContext} from "../../store/auth-context";

const MainNavigation = () => {

    const authCtx = useContext(AuthContext);

    const logoutHandler = e => {
        e.preventDefault();

        authCtx.logout();
    }

    return (
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>React Auth</div>
            </Link>
            <nav>
                <ul>
                    {!authCtx.isLoggedIn &&
                    <li>
                        <Link to='/auth'>Login</Link>
                    </li>
                    }
                    {authCtx.isLoggedIn &&
                    <Fragment>
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    </Fragment>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;