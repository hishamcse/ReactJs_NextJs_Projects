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

    const inputIsValid = validateFunc(inputState.value);
    const inputInValid = !inputIsValid && inputState.isTouched;

    // handles in every key stroke
    const changeHandler = (e) => {
        dispatch({
            type: 'CHANGE',
            value: e.target.value
        })
    }

    // handle when lost focus
    const blurHandler = (_) => {
        dispatch({
            type: 'BLUR'
        })
    }

    // resetting while submitting
    const reset = () => {
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