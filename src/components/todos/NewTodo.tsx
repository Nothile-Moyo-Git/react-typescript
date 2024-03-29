/**
 * New Todo component
 * Houses a form which performs a post request to my firebase endpoint
 * It uses form validation and also outputs information on a successful request
 * 
 * @returns NewTodo : PureComponent
 */

import "./NewTodo.scss";
import queryDB from "../../backend/queryDB";
import React, { useState, useContext } from "react";
import { TodoContext } from "../context/todo-context";
import { BsCloudUpload } from "react-icons/bs";

const NewTodo = () => {

    // Creating our history so we can navigate to the tasks page upon successful submission
    const todoContextInstance = useContext(TodoContext);

    // declaring states, we need to keep track of the current input and the submission status of the form
    const [todoText, setTodoText] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isInputValid, setIsInputValid] = useState<boolean>(true);

    // Validate form inputs
    const validateInput = (input : string) => {
        return(input.length >= 2);
    }

    // Submit form and perform query to backend
    const submitHandler = async (event : any) => {
        
        event.preventDefault();

        // Set form as valid to now enable form validation
        setIsSubmitted(true);

        // Create an object and a dynamic interface for our inputs
        // The properties in the objects are the names we use for our form elements
        const target = event.target as typeof event.target & {
            task: { value : string }
        }

        // validate input
        const isValid = validateInput(target.task.value);
        setIsInputValid(isValid);

        // If our inputs are valid, the form is valid. We only have one entry here so we make this part simpler

        if (isValid === true) {

            // Submit the new task and retrieve the updated todos and then go back to the home page
            const todos = await queryDB("POST", todoText);

            todoContextInstance?.format(todos);

        }
        
    };

    const updateInput = (event : React.FormEvent<HTMLInputElement>) => {

        event.preventDefault();

        // Create the element reference since value doesn't exist on EventTarget but does on HTMLInputElement
        const element = event.target as HTMLInputElement;

        // Update our input field
        setTodoText(element.value);

        // If our form has been submitted, then validate the input
        isSubmitted === true && setIsInputValid( validateInput(element.value) );

    };


    return(

        <section className="new-todo">
 
            { 
                isInputValid && isSubmitted &&
                <span className="new-todo__modal" data-testid="new-todo-modal">
                    <BsCloudUpload/>
                    Success, Visit the home page to see your new To do Item 
                </span>
            }
  
            <form className="new-todo__form" onSubmit={submitHandler} data-testid="new-todo-form">

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
                    data-testid="new-todo-input"
                    maxLength={100}
                />

                <button data-testid="new-todo-button" className={isInputValid ? "new-todo__submit" : "new-todo__submit new-todo__submit--error"} disabled={!isInputValid}>Submit</button>

            </form>

        </section>
    );
};

export default NewTodo;