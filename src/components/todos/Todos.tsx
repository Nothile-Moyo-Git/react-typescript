/**
 * To do component, renders an unordered list of to-do's with context being the global state
 * 
 * @returns list of to do list items
 */
import React from "react";
import TodoClass from "../models/todo";

interface Todo {
    id : string,
    task : string
}
interface ComponentProps {
    tasks : TodoClass[]
}

const Todos : React.FC<ComponentProps> = ({ tasks }) => {

    return(
        <ul>
            { 
                tasks.map((task : TodoClass) => {
                    return <li key={task.id}>{task.text}</li>
                })
            }
        </ul>
    );
};

export default Todos;