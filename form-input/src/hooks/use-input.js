import {useReducer} from "react";

const initialState = {
    value: '',
    isTouched: false
}

const inputReducer = (prevState, action) => {
    if (action.type === 'CHANGE') {
        return {value: action.value, isTouched: prevState.isTouched}
    }
    if (action.type === 'BLUR') {
        return {value: prevState.value, isTouched: true}
    }
    return initialState;
}

const useInput = (validateFunc) => {

    const [inputState, dispatch] = useReducer(inputReducer, initialState, undefined);

    // const [inputVal, setInputVal] = useState('');
    // const [isTouched, setIsTouched] = useState(false);

    const inputIsValid = validateFunc(inputState.value);
    const inputInValid = !inputIsValid && inputState.isTouched;

    // handles in every key stroke
    const changeHandler = (e) => {
        // setInputVal(e.target.value);
        dispatch({
            type: 'CHANGE',
            value: e.target.value
        })
    }

    // handle when lost focus
    const blurHandler = (_) => {
        // setIsTouched(true);
        dispatch({
            type: 'BLUR'
        })
    }

    // resetting while submitting
    const reset = () => {
        // setInputVal('')
        // setIsTouched(false)
        dispatch({
            type: 'RESET'
        })
    }

    return {
        value: inputState.value,
        hasError: inputInValid,
        isValid: inputIsValid,
        changeHandler,
        blurHandler,
        reset
    }
}

export default useInput;