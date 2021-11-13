import {useEffect, useState} from "react";

const useCounter = (willIncrement) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => willIncrement ? prevCounter + 1 : prevCounter - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return counter;
}

export default useCounter;