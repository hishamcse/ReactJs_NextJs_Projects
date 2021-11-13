import classes from "./AvailableMeals.module.css";
import MealItem from "../MealItem/MealItem";
import Card from "../../UI/Card/Card";
import useFetch from "../../../hooks/use-fetch";
import {useEffect, useState} from "react";

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);

    const loadMeals = (data) => {
        const loadedMeals = [];

        for (const mealKey in data) {
            loadedMeals.push({
                id: mealKey,
                name: data[mealKey].name,
                description: data[mealKey].description,
                price: data[mealKey].price
            });
        }

        setMeals(loadedMeals);
    }

    const {isLoading, error, sendRequest: fetchMeals} = useFetch();

    useEffect(() => {
        (async () => {
            await fetchMeals({url: 'https://react-http-d4388-default-rtdb.firebaseio.com/meals.json'}, loadMeals)
        })()
    }, [fetchMeals]);

    let mealList = <h2>No meals found. Start adding some!</h2>;

    if (meals.length > 0) {
        mealList = (
            <ul>
                {meals.map(meal => (
                        <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description}
                                  price={meal.price}/>
                    )
                )}
            </ul>
        );
    }

    let content = mealList;

    if (error) {
        content = <p className={classes.error}>Failed to fetch data!!!</p>;
    }

    if (isLoading) {
        content = <p className={classes.loading}>Loading meals...</p>;
    }

    return (
        <Card className={classes.meals}>
            {content}
        </Card>
    )
}

export default AvailableMeals;