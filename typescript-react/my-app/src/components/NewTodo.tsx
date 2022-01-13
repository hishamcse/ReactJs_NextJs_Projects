import React, {useContext, useRef} from "react";
import styles from './NewTodo.module.css';
import {TodosContext} from "../store/todos-context";

const NewTodo: React.FC = () => {

    const todoCtx = useContext(TodosContext);

    const inputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        const text = inputRef.current?.value;

        if(!text || text.trim().length === 0) {
           return;
        }

        todoCtx.addTodo(text);
    }

    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <label htmlFor="todo">Todo Text</label>
            <input type='text' id='todo' ref={inputRef}/>
            <button type='submit'>Add Todo</button>
        </form>
    )
}

export default NewTodo;