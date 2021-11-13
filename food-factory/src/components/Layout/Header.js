import {Fragment} from "react";
import classes from "./Header.module.css";
import MealImg from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onClick}>Cart</HeaderCartButton>
            </header>
            <div className={classes['main-image']}>
                <img src={MealImg} alt="A table of delicious foods!!"/>
            </div>
        </Fragment>
    )
}

export default Header;