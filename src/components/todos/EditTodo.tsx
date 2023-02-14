/**
 * Edit todo component
 * Currently houses a form which performs a PUT request to an endpoint in firebase
 * We use the id of the task to represent the id key in the database
 * We receive the relevant props from Todos
 * 
 * @returns EditTodo : JSX
*/

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './EditTodo.scss';
import { useParams } from "react-router-dom";
import { TodoContext } from '../context/todo-context';
import queryDB from "../../backend/queryDB";
import { BsCloudUpload } from "react-icons/bs";

interface ParamTypes {
    id : string
}

interface Todo{
    id : string,
    task : string
}

const EditTodo = () => {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    // Create an instance of the history object 
    const history = useHistory();

    // Get the slug from the URL
    const slug = useParams<ParamTypes>();

    // Get the post ID dynamically. This will be used to filter the array
    const id = slug.id;

    // Get the todos from our context and filter the current item we're working it. 
    // We'll initialise the edit to do text to this to make it simpler to edit
    const todoContextInstance = React.useContext(TodoContext);

    // Set tasks for filtering
    const tasks : Todo[] | undefined = todoContextInstance?.todos;

    const currentTask = tasks?.filter((task : Todo) => {
        return task.id === id;
    });

    const [task, setTask] = React.useState<string>("");

    // Upodate our input string
    const updateTaskHandler = (event : React.ChangeEvent<{ value : string }>) => {

        event.preventDefault();

        setTask(event.target.value);
    }

    // Perform an api request to firebase, we'll be performing a PUT request here using the ID from the browser as the object key in firebase
    const submitFormHandler = async (event : React.FormEvent) => {

        event.preventDefault();

        // Update the resource in firebase
        const response = await queryDB("PUT", task, id);

        // Update the list of our todo items
        todoContextInstance?.format(response);

        // Set is submitted to true so we show our modal
        setIsSubmitted(true);

        // Redirect to the home page.
        console.log("Success");

    };
 
    useEffect(() => {

        if ( currentTask && currentTask.length > 0 ) {
            setTask(currentTask[0].task);
        }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[todoContextInstance]);

    return (
        <section className="edit-todo">

            {
                isSubmitted &&
                <span className="edit-todo__modal" data-testid="edit-todo-modal">
                    <BsCloudUpload/>
                    Success, Go to the home page to view your changes!
                </span>
            }

            <form className="edit-todo__form" onSubmit={submitFormHandler} data-testid="edit-todo-form">
                <label id="taskLabel" htmlFor="task" className="edit-todo__label">Edit your task</label>
                <input
                    type="text"
                    name="task"
                    value={task}
                    onChange={updateTaskHandler}
                    aria-labelledby="taskLabel"
                    aria-required
                    className="edit-todo__input"
                    data-testid="edit-todo-input"
                />
                <button>Update To do</button>
            </form>

        </section>
    );
};

export default React.memo(EditTodo);

