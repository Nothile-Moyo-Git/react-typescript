/**
 * Edit todo component
 * Currently houses a form which performs a PUT request to an endpoint in firebase
 * We use the id of the task to represent the id key in the database
 * We receive the relevant props from Todos
 * 
 * @returns EditTodo : JSX
*/

import React from 'react';
import './EditTodo.scss';
import { useParams } from "react-router-dom";

interface ParamTypes {
    id : string
}

const EditTodo = () => {

    // We're using taskRef here instead of using state to reduce the performance impact
    const taskRef = React.useRef<HTMLInputElement>(null);

    // Get the slug from the URL
    const slug = useParams<ParamTypes>();

    // Get the post ID dynamically
    const id = slug.id;

    // Perform an api request to firebase, we'll be performing a PUT request here using the ID from the browser as the object key in firebase
    const submitFormHandler = (event : React.FormEvent) => {

        event.preventDefault();



    }

    return (
        <form className="edit-todo" onSubmit={submitFormHandler}>
            <label id="taskLabel" htmlFor="task" className="edit-todo__label">Edit your task</label>
            <input
                type="text"
                name="task"
                ref={taskRef}
                aria-labelledby="taskLabel"
                aria-required
                className="edit-todo__input"
            />
            <button>Update Task</button>
        </form>
    );
};

export default EditTodo;

