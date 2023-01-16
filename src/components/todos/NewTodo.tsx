/**
 * New Todo component
 * Houses a form which performs a post request to my firebase endpoint
 * It uses form validation and also outputs information on a successful request
 */

import "./NewTodo.scss";
import React, { useState } from "react";

const NewTodo : React.FC = () => {

    // text state
    const [todoText, setTodoText] = useState<string>("");

    // Submit form and perform query to backend
    const submitHandler = (event : React.SyntheticEvent) => {
        
        event.preventDefault();

        // Create an object and a dynamic interface for our inputs
        // The properties in the objects are the names we use for our form elements
        const target = event.target as typeof event.target & {
            task: { value : string }
        }

        console.log(target?.task.value);
    };

    // Validate form inputs
    const validateInput = (event : React.FormEvent<HTMLInputElement>) => {

        event.preventDefault();

        // Create the element reference since value doesn't exist on EventTarget but does on HTMLInputElement
        const element = event.target as HTMLInputElement;

        // Update our input field
        setTodoText(element.value);

        console.log(element.value);
    }

    return(
        <form className="new-todo" onSubmit={submitHandler}>

            <label id="taskLabel" htmlFor="task" className="new-todo__label">Task to do</label>
                
            <input
                name="task"
                type="text"
                value={todoText}
                onChange={validateInput}
                placeholder="Please enter some task text!"
                className="new-todo__input"
                aria-labelledby="taskLabel"
                required
                aria-required
            />

            <button className="new-todo__submit">Submit</button>

        </form>
    );
};

export default NewTodo;