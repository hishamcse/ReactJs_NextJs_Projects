import React from "react";
import Todo from "../models/todo";

export type TodoContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
}

export const TodosContext = React.createContext<TodoContextObj>({
        items: [],
        addTodo: () => {
        },
        removeTodo: (id: string) => {
        },
    }
);