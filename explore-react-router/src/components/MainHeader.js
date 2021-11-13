import {Link, NavLink} from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        {/*<Link to='/welcome'>Welcome</Link>*/}
                        <NavLink to='/welcome' activeClassName={classes.active}>Welcome</NavLink>
                    </li>
                    <li>
                        {/*<Link to='/products'>Products</Link>*/}
                        <NavLink to='/products' activeClassName={classes.active}>Products</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader;