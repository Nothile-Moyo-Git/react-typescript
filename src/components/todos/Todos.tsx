/**
 * To do component, renders an unordered list of to-do's with context being the global state
 * 
 * @returns list of to do list items
 */
import React, { ReactNode } from "react";
interface ComponentProps {
    children: ReactNode;
    tasks : string[]
}

const Todos = ({ children , tasks } : ComponentProps) => {

    return(
        <ul>
            <li>Learn React</li>
            <li>Learn TypeScript</li>
        </ul>
    );
};

export default Todos;