import {useState} from "react";
import Output from "./Output";

const Greeting = () => {

    const [change, setChange] = useState(false);

    const changeHandler = () => {
        setChange(true);
    }

    return (
        <div>
            <h2>Hello World!</h2>
            {!change && <Output>Hey you no change</Output>}
            {change && <Output>changed!!</Output> }
            <button onClick={changeHandler}>Click to change</button>
        </div>
    )
}

export default Greeting;