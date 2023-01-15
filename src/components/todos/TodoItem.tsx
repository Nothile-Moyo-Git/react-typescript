/**
 * TodoItem component, takes a todo item from the array of Todos from the todos component
 * Renders the todo on the page, and handles all the necessary logic required for it
 * 
 * @returns a list item containing the todo information and handlers for logic (<li>)
 */

import React from "react";
import TodoClass from "../models/todo";
import './TodoItem.scss';

const TodoItem : React.FC<{task : TodoClass}> = (props) => {

    const task = props?.task;

    return(
        <li className="todo-item">{task.text}</li>
    );
}

export default TodoItem;