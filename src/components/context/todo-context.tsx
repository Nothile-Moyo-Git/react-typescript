/**
 * To do context. Houses the todo list, and also contains functionality to update the todo list based on query result
 * We have the "formatData" method which creates a todo item from the result of our request to the backend
 * This context is shared amongst multiple components in order to prevent too much binding
 * It also means that we re-use less code overall
 * 
 * We have an interface we use and the type is an array of Todo class instances
 */

import React, { useState } from "react";
import TodoClass from "../models/todo";
import { ReactNode } from "react";

// Allowing an explicit type definition for children
interface ComponentProps {
    children : ReactNode
}

// We're an index signature here 
interface FirebaseResponse{
    [key : string] : string
}

// Use the class model we defined as our interface
interface Todos {
    todos : TodoClass[] | []
    format : (todos : FirebaseResponse) => void
}

export const TodoContext = React.createContext<Todos | null>(null);

export const TodosContextProvider = ({ children } : ComponentProps) => {

    // Create our todo global state, we set it to type Todos or never[] for empty arrays
    const [todoItems, setTodoItems] = useState<TodoClass[] | []>([]);

    const formatTodos = (todos : FirebaseResponse) => {
        console.log("Formatting");
        console.log(todos);
    }

    return (
        <TodoContext.Provider value={{todos : todoItems, format : formatTodos}}>
            {children}
        </TodoContext.Provider>
    );
}

export default TodosContextProvider;