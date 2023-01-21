/**
 * To do component, renders an unordered list of to-do's with context being the global state
 * Receives the todo list from the App component which queries the backend and also applies the changes to global state
 * 
 * @returns list of to do list items (<ul>)
 */
import React from "react";
import TodoItem from "./TodoItem";
import './Todos.scss';

interface Todo {
    id : string,
    task : string
}
interface ComponentProps {
    tasks : Todo[] | []
}

const Todos : React.FC<ComponentProps> = ({ tasks }) => {

    return(
        <ul className="todos">
            { 
                tasks.map((task : Todo) => {
                    return <TodoItem key={task.id} task={task}/>
                })
            }
        </ul>
    );
};

export default Todos;