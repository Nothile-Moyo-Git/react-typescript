/**
 * New Todo component
 * Houses a form which performs a post request to my firebase endpoint
 * It uses form validation and also outputs information on a successful request
 */

import "./NewTodo.scss";
import React, { useEffect, useState } from "react";

const NewTodo : React.FC = () => {

    // declaring states, we need to keep track of the current input and the submission status of the form
    const [todoText, setTodoText] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isInputValid, setIsInputValid] = useState<boolean>(true);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    // Validate form inputs
    const validateInput = (input : string) => {
        setIsInputValid(input.length > 2);
    }

    // Submit form and perform query to backend
    const submitHandler = (event : React.SyntheticEvent) => {
        
        event.preventDefault();

        // Set form as valid to now enable form validation
        setIsSubmitted(true);

        // Create an object and a dynamic interface for our inputs
        // The properties in the objects are the names we use for our form elements
        const target = event.target as typeof event.target & {
            task: { value : string }
        }

        // validate input
        validateInput(target.task.value);

        // If our inputs are valid, the form is valid. We only have one entry here so we make this part simpler
        setIsFormValid(isInputValid);

        isFormValid === true && console.log("Form is valid");

        console.log(isInputValid);
        console.log(isFormValid);
        console.log(target?.task.value);
    };

    const updateInput = (event : React.FormEvent<HTMLInputElement>) => {

        event.preventDefault();

        // Create the element reference since value doesn't exist on EventTarget but does on HTMLInputElement
        const element = event.target as HTMLInputElement;

        // Update our input field
        setTodoText(element.value);

        // If our form has been submitted, then validate the input
        isSubmitted === true && validateInput(element.value);

    };

    useEffect(() => {},[]);

    return(
        <form className="new-todo" onSubmit={submitHandler}>

            <label id="taskLabel" htmlFor="task" className="new-todo__label">{isInputValid ? "Add Task*" : "Error: Please enter more than 2 characters" }</label>
                
            <input
                name="task"
                type="text"
                value={todoText}
                onChange={updateInput}
                placeholder="Please enter the task you need to add to the list..."
                className={isInputValid ? "new-todo__input" : "new-todo__input new-todo__input--error"}
                aria-labelledby="taskLabel"
                aria-required
            />

            <button className={isInputValid ? "new-todo__submit" : "new-todo__submit new-todo__submit--error"} disabled={!isInputValid}>Submit</button>

        </form>
    );
};

export default NewTodo;