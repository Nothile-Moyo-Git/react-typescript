/**
 * To do context. Houses the todo list, and also contains functionality to update the todo list based on query result
 * We have the "formatData" method which creates a todo item from the result of our request to the backend
 * This context is shared amongst multiple components in order to prevent too much binding
 * It also means that we re-use less code overall
 * Union types are frequently to guard against empty responses and initialisation of arrays which has to be empty since the API request hasn't been performed.
 * 
 * We have an interface we use and the type is an array of Todo class instances
 * 
 * @returns TodoContext : ReactContext
 * @returns 
 */

import React, { useState, ReactNode } from "react";

// Todo interface, showcases the structure of a todo item in the list. 
interface Todo {
    id: string,
    task: string
  };

// Allowing an explicit type definition for children
interface ComponentProps {
    children : ReactNode
    value : Todo[] | []
}

// We're an index signature here 
interface FirebaseResponse{
    [key : string] : string
}

// Format for our context. Note: Your value that you pass through the provider will use this interface so it must match
interface Todos {
    todos : Todo[] | []
    format : (todos : FirebaseResponse) => void
}

export const TodoContext = React.createContext<Todos | null>(null);

export const TodosContextProvider = ({ children, value } : ComponentProps) => {

    // Create our todo global state, we set it to type Todos or never[] for empty arrays
    const [todoItems, setTodoItems] = useState<Todo[] | []>([]);

    // Since our firebase reponse object doesn't use an id as a property but as an identifier, we do this to extract it into an id we can reference.
    // We also use this for generating keys in lists
    const formatTodos = (todos : FirebaseResponse) => {

        // Create guarded array
        let formattedTodos : Todo[] = [];

        // If our response isn't null (empty array), we extract the keys by mapping the object using an index signature to extract the identifier
        if (todos){ 
            const keys = Object.keys(todos);
  
            keys.forEach((key : string) => {
              formattedTodos.push({id : key, task : todos[key]});
            });
        }
        
        setTodoItems(formattedTodos);

    }

    return (
        <TodoContext.Provider value={{todos : todoItems, format : formatTodos}}>
            {children}
        </TodoContext.Provider>
    );
}

export default TodosContextProvider;