/**
 * TodoItem component, takes a todo item from the array of Todos from the todos component
 * Renders the todo on the page, and handles all the necessary logic required for it.
 * We're using parallax tilt cards which can be found here: https://www.npmjs.com/package/react-parallax-tilt
 * 
 * @returns TodoItem : PureComponent
 */

import React from 'react';
import './TodoItem.scss';
import queryDB from "../../backend/queryDB";
import Tilt from "react-parallax-tilt";
import { Link } from 'react-router-dom';
import { TodoContext } from '../context/todo-context';

interface ComponentProps {
    id : string,
    key : string,
    task : string,
    position : number
};

const TodoItem = ({id, task, position} : ComponentProps) => {

    // Initialize the context of the app
    const TodoContextInstance = React.useContext(TodoContext);

    // Delete the current todo item and then update the todos in the list and trigger a re-render for them
    const deleteTodoHandler = async ( event : React.FormEvent) => {

        // Prevent the page from reloading
        event.preventDefault();

        // Delete the todo from firebase
        const todos = await queryDB("DELETE", "", id); 

        // Update the todos in our context
        TodoContextInstance?.format(todos);

        // show a popup to inform the user that the todo has been deleted
        alert("Todo successfully deleted");

    };

    return(
        <li>
            <Tilt 
                className="todo-item"
                style={{ animationDelay : `${position / 2}s` }}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                glareEnable={true}
                glarePosition="all"
                glareMaxOpacity={0.8}
                glareBorderRadius={"90"}
                glareColor={"#861657"}
            >
                <p className="todo-item__task" data-testid="test-item-text">{task}</p>
                <div className="todo-item__buttons">
                    <Link to={`edit/${id}`} className="todo-item__button">Edit</Link>
                    <button onClick={deleteTodoHandler} className="todo-item__button">Delete</button>
                </div>
                
            </Tilt>
        </li>
    );

}

export default React.memo(TodoItem);