import React, {useState} from "react";
import Todo from "../models/todo";
import {TodoContextObj, TodosContext} from "./todos-context";

const TodosContextProvider: React.FC = (props) => {
    const [todos,setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (text:string) => {
        setTodos((prevTodos) => {
            return prevTodos.concat(new Todo(text));
        })
    }

    const removeTodoHandler = (id: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== id);
        })
    }

    const contextValue: TodoContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler,
    };

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    );
};

export default TodosContextProvider;