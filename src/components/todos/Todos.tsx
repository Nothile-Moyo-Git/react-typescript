/**
 * To do component, renders an unordered list of to-do's with context being the global state
 * Receives the todo list from the App component which queries the backend and also applies the changes to global state
 * 
 * @returns list of to do list items (<ul>)
 */

import React, { ReactNode } from "react";
import TodoItem from "./TodoItem";
import './Todos.scss';

interface Todo {
    id : string,
    task : string
}
interface ComponentProps {
    tasks : Todo[] | [], 
    children : ReactNode
}

const Todos = ({ tasks, children } : ComponentProps) => {

    // Delete component handler. We pass this to the child component 

    return(
        <ul className="todos">
            { 
                tasks.map((task : Todo, index : number) => {
                    return <TodoItem key={task.id} id={task.id} task={task.task} position={index}/>
                })
            }
        </ul>
    );
};

export default React.memo(Todos);