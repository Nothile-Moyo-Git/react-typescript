/**
 * To do component, renders an unordered list of to-do's with context being the global state
 * 
 * @returns list of to do list items
 */
import React, { ReactNode } from "react";

interface Todo {
    id : string,
    task : string
}
interface ComponentProps {
    tasks : Todo[]
}

const Todos : React.FC<ComponentProps> = ({ tasks }) => {

    return(
        <ul>
            { 
                tasks.map((task : Todo, index : number ) => {
                    return <li key={index}>{task.task}</li>
                })
            }
        </ul>
    );
};

export default Todos;